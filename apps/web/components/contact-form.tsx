"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { motion } from "framer-motion";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    eventDate: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setStatus("submitting");

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Form Data:", data);
        setStatus("success");
        reset();

        setTimeout(() => setStatus("idle"), 5000);
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 border border-green-500/20 bg-green-500/10 text-center rounded-lg"
            >
                <h3 className="text-2xl font-serif text-green-400 mb-2">Message Sent</h3>
                <p className="text-neutral-400">Thank you for reaching out. I'll get back to you shortly.</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm uppercase tracking-widest border-b border-green-400 text-green-400 pb-1"
                >
                    Send Another
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm uppercase tracking-widest text-neutral-500">Name</label>
                    <input
                        {...register("name")}
                        id="name"
                        className="w-full bg-transparent border-b border-neutral-700 py-3 text-white focus:outline-none focus:border-white transition-colors"
                        placeholder="Your Name"
                    />
                    {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm uppercase tracking-widest text-neutral-500">Email</label>
                    <input
                        {...register("email")}
                        id="email"
                        type="email"
                        className="w-full bg-transparent border-b border-neutral-700 py-3 text-white focus:outline-none focus:border-white transition-colors"
                        placeholder="your@email.com"
                    />
                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="eventDate" className="text-sm uppercase tracking-widest text-neutral-500">Event Date (Optional)</label>
                <input
                    {...register("eventDate")}
                    id="eventDate"
                    type="date"
                    className="w-full bg-transparent border-b border-neutral-700 py-3 text-white focus:outline-none focus:border-white transition-colors"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm uppercase tracking-widest text-neutral-500">Message</label>
                <textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    className="w-full bg-transparent border-b border-neutral-700 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder="Tell me about your project..."
                />
                {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
            </div>

            <button
                type="submit"
                disabled={status === "submitting"}
                className="px-10 py-4 bg-white text-black font-medium uppercase tracking-widest hover:bg-neutral-200 transition-colors disabled:opacity-50 w-full md:w-auto"
            >
                {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
}
