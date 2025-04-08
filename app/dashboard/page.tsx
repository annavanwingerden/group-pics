"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/features/imageUpload";
import { UploadCloud, LogOut, Image as ImageIcon } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function Dashboard() {
    const [user, authLoading] = useAuthState(auth);
    const router = useRouter();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const handleUploadComplete = () => {
        setIsUploadModalOpen(false);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.replace("/sign-in");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">📸 Photo Dashboard</h1>
                    <Button 
                        onClick={handleLogout} 
                        variant="outline" 
                        className="flex items-center gap-2"
                        type="button"
                    >
                        <LogOut size={16} /> Logout
                    </Button>
                </div>

                <div className="mt-6 flex flex-col items-center gap-4">
                    {isUploadModalOpen ? (
                        <div className="w-full max-w-md p-4 bg-gray-50 rounded-lg">
                            <ImageUpload 
                                onUploadComplete={handleUploadComplete}
                                className="mb-4"
                                userId={user.uid}
                                groupId=""
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
                        <div className="flex flex-col gap-4 w-full max-w-md">
                            <Button 
                                onClick={() => setIsUploadModalOpen(true)} 
                                className="flex items-center gap-2"
                                type="button"
                            >
                                <UploadCloud size={16} /> Upload New Photo
                            </Button>
                            <Button 
                                onClick={() => router.push('/gallery')} 
                                className="flex items-center gap-2"
                                type="button"
                            >
                                <ImageIcon size={16} /> View Your Gallery
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}