"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Invalid credentials");
            setLoading(false);
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8 p-10 border border-white/10 bg-neutral-900/50 backdrop-blur-sm shadow-2xl rounded-2xl"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-serif font-bold tracking-tight">Admin Portal</h2>
                    <p className="mt-2 text-sm text-neutral-400">Sign in to manage your portfolio</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="relative block w-full rounded-md border-0 bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-white sm:text-sm sm:leading-6 px-4 py-3"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full rounded-md border-0 bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-white sm:text-sm sm:leading-6 px-4 py-3"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative flex w-full justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-black hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50 transition-all"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
