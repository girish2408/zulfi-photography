import Link from "next/link";

export function SiteFooter() {
    return (
        <footer className="py-12 px-6 md:px-12 border-t border-white/10 bg-black text-white/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-sm tracking-widest">
                    © {new Date().getFullYear()} ZULFI PHOTOGRAPHY
                </div>

                <div className="flex gap-6 text-sm uppercase tracking-widest">
                    <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                    <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                    <Link href="#" className="hover:text-white transition-colors">Email</Link>
                </div>
            </div>
        </footer>
    );
}
