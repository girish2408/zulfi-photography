import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
    return (
        <div className="bg-background text-foreground min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-serif mb-6">Get in Touch</h1>
                        <p className="text-muted-foreground text-lg font-light">
                            Available for weddings and commissions worldwide.
                        </p>
                    </div>

                    <ContactForm />

                    <div className="mt-24 pt-12 border-t border-border grid md:grid-cols-2 gap-8 text-center md:text-left">
                        <div>
                            <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Email</h4>
                            <a href="mailto:hello@zulfi.com" className="text-xl hover:text-muted-foreground/80 transition-colors">hello@zulfi.com</a>
                        </div>
                        <div>
                            <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Social</h4>
                            <div className="space-x-4">
                                <a href="#" className="hover:text-muted-foreground/80 transition-colors">Instagram</a>
                                <a href="#" className="hover:text-muted-foreground/80 transition-colors">Twitter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
