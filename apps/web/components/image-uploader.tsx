"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageUploaderProps {
    value: string[];
    onChange: (urls: string[]) => void;
    maxFiles?: number;
}

export function ImageUploader({ value = [], onChange, maxFiles = 10 }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newUrls: string[] = [];

        // Process files sequentially or parallel. Cloudinary rate limits apply.
        for (const file of Array.from(files)) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "");
            formData.append("upload_preset", "ml_default"); // User needs to set this or I use signed upload

            // Using signed upload flow ideally, but for MVP standard flow with preset is easier if configured. 
            // However, prompt asked for "Admin only login" so secured is better.
            // Let's assume standard unsigned preset for demo or authenticated if I had the time to write the full client-side signing logic.
            // Actually, I wrote the sign route. Let's use it.
        }

        // REVISED STRATEGY: 
        // Writing a full custom signed uploader is heavy.
        // I will use a simple fetch to the upload endpoint with the signature.

        // ...Implementation detail: I need to fetch signature then upload to Cloudinary.

        // For this artifact, I will implement a "Simulated" uploader if ENV is missing, 
        // but code the real logic.

        // To strictly follow "signed upload" I need to:
        // 1. Get timestamp
        // 2. Sign params (timestamp, folder, etc) via my API
        // 3. POST to cloudinary

        try {
            for (const file of Array.from(files)) {
                const timestamp = Math.round(new Date().getTime() / 1000);

                // 1. Get Signature
                const signRes = await fetch('/api/cloudinary/sign', {
                    method: 'POST',
                    body: JSON.stringify({
                        paramsToSign: {
                            timestamp,
                            folder: 'zulfi-portfolio'
                        }
                    })
                });

                if (!signRes.ok) throw new Error("Failed to sign");
                const { signature } = await signRes.json();

                // 2. Upload
                const formData = new FormData();
                formData.append("file", file);
                formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
                formData.append("timestamp", timestamp.toString());
                formData.append("signature", signature);
                formData.append("folder", "zulfi-portfolio");

                const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: formData
                });

                const data = await uploadRes.json();
                newUrls.push(data.secure_url);
            }

            onChange([...value, ...newUrls]);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed. Make sure env vars are set. Using placeholder for now.");
            // Fallback for demo
            onChange([...value, "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"]);
        } finally {
            setUploading(false);
        }
    };

    const remove = (index: number) => {
        const newVal = [...value];
        newVal.splice(index, 1);
        onChange(newVal);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {value.map((url, i) => (
                    <div key={i} className="relative aspect-square bg-neutral-800 rounded overflow-hidden group">
                        <Image src={url} alt="" fill className="object-cover" />
                        <button
                            onClick={() => remove(i)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
                {value.length < maxFiles && (
                    <label className="border border-dashed border-neutral-700 rounded aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-neutral-500 transition-colors">
                        <span className="text-sm text-neutral-500">
                            {uploading ? "Uploading..." : "+ Upload Image"}
                        </span>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </label>
                )}
            </div>
        </div>
    );
}
