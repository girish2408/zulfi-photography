import prisma from "@repo/db";

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-serif">Inquiries</h1>

            <div className="border border-neutral-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm text-neutral-400">
                    <thead className="bg-neutral-900 text-neutral-200 uppercase tracking-widest text-xs">
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Event Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-neutral-900/50 transition-colors">
                                <td className="px-6 py-4">{new Date(lead.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                                <td className="px-6 py-4">{lead.email}</td>
                                <td className="px-6 py-4">{lead.eventDate ? new Date(lead.eventDate).toLocaleDateString() : "-"}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${lead.status === "NEW" ? "bg-blue-500/10 text-blue-400" : "bg-neutral-800"
                                        }`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-white hover:underline">View</button>
                                </td>
                            </tr>
                        ))}
                        {leads.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                                    No inquiries yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
