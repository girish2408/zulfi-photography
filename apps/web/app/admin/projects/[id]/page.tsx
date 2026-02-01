import prisma from "@repo/db";
import { ProjectForm } from "@/components/project-form";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: { id },
        include: { images: true, category: true }
    });

    if (!project) {
        notFound();
    }

    const initialData = {
        ...project,
        coverImage: project.coverImage || undefined,
        description: project.description || undefined,
        category: project.category?.name || "Weddings",
        images: project.images.sort((a, b) => a.order - b.order).map(i => i.url)
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-serif mb-8">Edit Project</h1>
            <ProjectForm initialData={initialData} isEditing />
        </div>
    );
}
