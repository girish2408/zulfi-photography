"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import { HERO_CONTENT } from "@/config/site-content";

const HERO_IMAGES = HERO_CONTENT.images;

export function HeroSection() {
    const [index, setIndex] = useState(0);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-background">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={HERO_IMAGES[index]}
                        alt="Hero Image"
                        fill
                        className="object-cover animate-ken-burns"
                        priority
                    />
                    {/* Gradient overlay for text readability, but lighter for creative feel */}
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
                </motion.div>
            </AnimatePresence>

            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-white tracking-tighter uppercase leading-none mix-blend-overlay drop-shadow-lg">
                        {HERO_CONTENT.title}
                    </h1>
                    <p className="mt-6 text-sm md:text-base text-white/90 tracking-[0.3em] font-light uppercase mix-blend-difference">
                        {HERO_CONTENT.subtitle}
                    </p>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-white/20">
                    <motion.div
                        className="w-full bg-white"
                        initial={{ height: "0%" }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
