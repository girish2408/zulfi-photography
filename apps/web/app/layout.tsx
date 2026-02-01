import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
    title: "Zulfi Photographer",
    description: "Premium Photography Portfolio",
};

import { Providers } from "./providers";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={clsx(inter.variable, playfair.variable, "font-sans bg-background text-foreground antialiased")}>
                <Providers>
                    <div className="bg-noise" />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
