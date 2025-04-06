"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

interface ImageItem {
    url: string;
    key: string;
    lastModified?: Date;
}

export default function Gallery() {
    const [user, authLoading] = useAuthState(auth);
    const router = useRouter();
    const [photos, setPhotos] = useState<ImageItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace("/sign-in");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!user) return;
        
        const fetchImages = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/images');
                if (!response.ok) {
                    throw new Error('Failed to fetch images');
                }
                const data = await response.json();
                console.log('Received images data:', data);
                setPhotos(data.images || []);
            } catch (err) {
                setError('Failed to load images');
                console.error('Error fetching images:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, [user]);

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
                    <h1 className="text-2xl font-bold text-gray-800">📸 Your Gallery</h1>
                    <div className="flex gap-4">
                        <Button 
                            onClick={() => router.push('/dashboard')}
                            variant="outline"
                            type="button"
                        >
                            Back to Dashboard
                        </Button>
                        <Button 
                            onClick={handleLogout} 
                            variant="outline" 
                            className="flex items-center gap-2"
                            type="button"
                        >
                            <LogOut size={16} /> Logout
                        </Button>
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-center mb-4">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="text-center py-8">Loading images...</div>
                ) : photos.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No images uploaded yet
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {photos.map((photo, index) => (
                            <Card key={photo.key} className="overflow-hidden">
                                <CardContent className="p-0 relative h-40">
                                    <div className="w-full h-full relative">
                                        <img
                                            src={photo.url}
                                            alt={`Photo ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                console.error('Error loading image:', photo.url);
                                                e.currentTarget.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 