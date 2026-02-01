"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";

import { FEATURED_PROJECTS } from "@/config/site-content";

export function FeaturedProjects() {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-background relative z-10 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-serif font-medium tracking-tight">Selected Works</h2>
                </motion.div>
                <Link href="/work" className="group relative text-sm uppercase tracking-[0.2em] font-light">
                    <span className="relative z-10">View All Projects</span>
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-foreground origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
            </div>

            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
                    {FEATURED_PROJECTS.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`${i % 2 === 1 ? 'md:mt-32' : ''}`}
                        >
                            <Link href={`/work/${project.slug}`} className="group block">
                                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 mb-6">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-2xl md:text-3xl font-serif">{project.title}</h3>
                                        <span className="text-xs uppercase tracking-widest text-muted-foreground/0 -translate-x-4 group-hover:text-muted-foreground group-hover:translate-x-0 transition-all duration-300">
                                            {project.year || "2025"}
                                        </span>
                                    </div>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{project.category}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
