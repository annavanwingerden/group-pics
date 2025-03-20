"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, Image, LogOut } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import {signOut} from "firebase/auth"

export default function Dashboard() {
    const [user] = useAuthState(auth);
    const router = useRouter()
    const userSession = sessionStorage.getItem('user')
;    if (!user || !userSession) {
        router.push("/sign-up")
    }

  const [photos, setPhotos] = useState<string[]>([
    "/photo1.jpg",
    "/photo2.jpg",
    "/photo3.jpg",
  ]);

  const handleUpload = () => {
    alert("Upload functionality to be implemented");
  };

  const handleLogout = () => {
    signOut(auth);
    sessionStorage.removeItem('user');
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📸 Photo Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut size={16} /> Logout
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-40 object-cover" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button onClick={handleUpload} className="flex items-center gap-2">
            <UploadCloud size={16} /> Upload New Photo
          </Button>
        </div>
      </div>
    </div>
  );
}
