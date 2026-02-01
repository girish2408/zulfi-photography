"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ProjectGallery({ images }: { images: string[] }) {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {images.map((src, i) => (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    key={i}
                    className="break-inside-avoid"
                >
                    <Image
                        src={src}
                        alt={`Project image ${i + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                    />
                </motion.div>
            ))}
        </div>
    );
}
