'use client';

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";

import { getGroupPhotos } from "@/app/firebase/groupUtils";
import { GroupPhoto } from "@/app/firebase/types";

import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/features/imageUpload";
import { UploadCloud, LogOut } from "lucide-react";
import Image from "next/image";

interface GroupDashboardProps {
  params: { groupId: string };
}

export default function GroupDashboard({ params }: GroupDashboardProps) {
  const [user, authLoading] = useAuthState(auth);
  const router = useRouter();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [photos, setPhotos] = useState<GroupPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const groupId = params.groupId;

  const loadPhotos = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const groupPhotos = await getGroupPhotos(groupId, user.uid);
      setPhotos(groupPhotos as GroupPhoto[]);
    } catch {
      setError("Failed to load group photos.");
    } finally {
      setLoading(false);
    }
  }, [groupId, user]);

  const handleUploadComplete = () => {
    setIsUploadModalOpen(false);
    loadPhotos();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📸 Group Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2" type="button">
            <LogOut size={16} /> Logout
          </Button>
        </div>

        {isUploadModalOpen ? (
          <div className="w-full max-w-md mx-auto p-4 bg-gray-50 rounded-lg mb-6">
            <ImageUpload 
              groupId={groupId}
              userId={user.uid}
              onUploadComplete={handleUploadComplete}
            />
            <Button 
              variant="outline" 
              onClick={() => setIsUploadModalOpen(false)}
              className="w-full"
              type="button"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-md mx-auto mb-6">
            <Button 
              onClick={() => setIsUploadModalOpen(true)} 
              className="flex items-center gap-2"
              type="button"
            >
              <UploadCloud size={16} /> Upload Group Photo
            </Button>
          </div>
        )}

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        {loading ? (
          <div className="text-center text-gray-600">Loading photos...</div>
        ) : (
          <>
            {photos.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                No photos uploaded yet. Be the first to share!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative aspect-square group">
                    <Image
                      src={photo.storageUrl}
                      alt={photo.fileName}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <a
                        href={photo.storageUrl}
                        download={photo.fileName}
                        className="bg-white text-black px-4 py-2 rounded-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}