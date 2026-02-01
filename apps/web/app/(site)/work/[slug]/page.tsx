import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ProjectGallery } from "@/components/project-gallery";
import { SiteFooter } from "@/components/site-footer";

// Placeholder data fetcher
function getProject(slug: string) {
    // Simulate DB fetch
    const projects = [
        {
            slug: "smith-wedding",
            title: "The Smith Wedding",
            category: "Weddings",
            description: "A beautiful ceremony in the heart of Napa Valley. Capturing the intimate moments and grand celebrations of love.",
            coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=2071&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
            ]
        },
        {
            slug: "urban-fashion",
            title: "Urban Fashion",
            category: "Commercial",
            description: "Edgy, high-contrast street style photography for the new summer collection.",
            coverImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop",
            ]
        }
    ];
    return projects.find((p) => p.slug === slug);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="bg-white text-black min-h-screen">
            {/* Hero */}
            <div className="relative h-[70vh] w-full">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-6 md:p-12">
                    <div className="text-white max-w-4xl">
                        <span className="text-xs uppercase tracking-widest block mb-4">{project.category}</span>
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-6">{project.title}</h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
                <div className="grid md:grid-cols-3 gap-12 mb-24">
                    <div className="md:col-span-1">
                        <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">The Story</h2>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-xl md:text-2xl font-serif leading-relaxed text-neutral-800">
                            {project.description}
                        </p>
                    </div>
                </div>

                <ProjectGallery images={project.images} />

                {/* Navigation */}
                <div className="mt-32 pt-12 border-t border-neutral-200 flex justify-between">
                    <Link href="/work" className="text-xs uppercase tracking-widest hover:text-neutral-500 transition-colors">
                        ← Back to Index
                    </Link>
                    <div className="flex gap-8">
                        <Link href="#" className="text-xs uppercase tracking-widest hover:text-neutral-500 transition-colors">
                            Next Project →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
