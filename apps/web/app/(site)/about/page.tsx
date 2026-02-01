import Image from "next/image";
import { ABOUT_CONTENT } from "@/config/site-content";

export default function AboutPage() {
    return (
        <div className="bg-background text-foreground min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
                    <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                        <Image
                            src={ABOUT_CONTENT.image}
                            alt="Photographer Portrait"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-6xl font-serif">
                            Hi, I'm {ABOUT_CONTENT.name.split(' ')[0]}.
                        </h1>
                        {ABOUT_CONTENT.bio.map((paragraph, index) => (
                            <p key={index} className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                                {paragraph}
                            </p>
                        ))}

                        <div className="pt-8 border-t border-border">
                            <h3 className="text-sm uppercase tracking-widest text-foreground mb-6">Services</h3>
                            <ul className="grid grid-cols-2 gap-4 text-muted-foreground">
                                {ABOUT_CONTENT.services.map((service) => (
                                    <li key={service} className="flex items-center gap-2">{service}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-8">
                            <img src="/signature.png" alt="" className="h-12 opacity-50 invert dark:invert-0" />
                            {/* Placeholder for signature if needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
