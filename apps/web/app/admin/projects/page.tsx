import prisma from "@repo/db";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        include: { category: true },
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif">Projects</h1>
                <Link
                    href="/admin/projects/new"
                    className="px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-neutral-200"
                >
                    Create Project
                </Link>
            </div>

            <div className="border border-neutral-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm text-neutral-400">
                    <thead className="bg-neutral-900 text-neutral-200 uppercase tracking-widest text-xs">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-neutral-900/50 transition-colors">
                                <td className="px-6 py-4">
                                    {project.coverImage && (
                                        <div className="relative w-12 h-12 rounded overflow-hidden">
                                            <Image src={project.coverImage} alt="" fill className="object-cover" />
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-medium text-white">{project.title}</td>
                                <td className="px-6 py-4">{project.category?.name || "Uncategorized"}</td>
                                <td className="px-6 py-4">
                                    {project.featured ? (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-400/10 text-yellow-400">Featured</span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-400">Standard</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right space-x-4">
                                    <Link href={`/admin/projects/${project.id}`} className="hover:text-white">Edit</Link>
                                    <button className="text-red-500 hover:text-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                                    No projects found. Create your first one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
