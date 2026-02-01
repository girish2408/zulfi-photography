"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FEATURED_PROJECTS } from "@/config/site-content";
import { cn } from "@/lib/utils";

export function ProjectGrid() {
    const [filter, setFilter] = useState("All");

    // Dynamically generate categories from the project data
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(FEATURED_PROJECTS.map(p => p.category)));
        return ["All", ...uniqueCategories];
    }, []);

    const filteredProjects = filter === "All"
        ? FEATURED_PROJECTS
        : FEATURED_PROJECTS.filter(p => p.category === filter);

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 px-6 md:px-12 pb-24 transition-colors duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <div>
                    <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tighter">Portfolio</h1>
                    <p className="text-muted-foreground mt-4 max-w-sm font-light tracking-wide uppercase text-sm">
                        Selected works from 2024-2025.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 md:gap-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={cn(
                                "text-sm uppercase tracking-widest transition-all duration-300 border-b",
                                filter === cat
                                    ? "text-foreground border-foreground"
                                    : "text-muted-foreground border-transparent hover:text-foreground"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            key={project.id}
                            className="group relative aspect-[3/4] overflow-hidden bg-muted cursor-pointer"
                        >
                            <Link href={`/work/${project.slug}`}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <span className="text-xs uppercase tracking-[0.2em] text-white/80 block mb-3 font-light">{project.category}</span>
                                        <h3 className="text-3xl font-serif italic text-white">{project.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
