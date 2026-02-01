import prisma from "@repo/db";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const [projectCount, leadCount] = await Promise.all([
        prisma.project.count(),
        prisma.lead.count({ where: { status: "NEW" } }),
    ]);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-serif">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-800">
                    <h3 className="text-neutral-500 text-sm uppercase tracking-widest">Total Projects</h3>
                    <p className="text-4xl font-serif mt-2">{projectCount}</p>
                </div>

                <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-800">
                    <h3 className="text-neutral-500 text-sm uppercase tracking-widest">New Inquiries</h3>
                    <p className="text-4xl font-serif mt-2">{leadCount}</p>
                </div>

                <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <Link href="/admin/projects/new" className="px-6 py-3 bg-white text-black font-medium text-sm rounded hover:bg-neutral-200 transition-colors">
                        + New Project
                    </Link>
                </div>
            </div>
        </div>
    );
}
