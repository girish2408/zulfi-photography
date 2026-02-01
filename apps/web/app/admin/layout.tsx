import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-neutral-950 text-neutral-200">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-8 hidden md:flex">
                <Link href="/admin" className="text-xl font-serif font-bold text-white">
                    ZULFI ADMIN
                </Link>

                <nav className="flex flex-col gap-4">
                    <NavLink href="/admin">Dashboard</NavLink>
                    <NavLink href="/admin/projects">Projects</NavLink>
                    <NavLink href="/admin/categories">Categories</NavLink>
                    <NavLink href="/admin/leads">Inquiries</NavLink>
                    <NavLink href="/admin/settings">Settings</NavLink>
                </nav>

                <div className="mt-auto">
                    <Link href="/" target="_blank" className="text-sm text-neutral-500 hover:text-white">
                        View Live Site ↗
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="text-sm font-medium hover:text-white text-neutral-400 transition-colors">
            {children}
        </Link>
    );
}
