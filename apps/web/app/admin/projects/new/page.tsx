import { ProjectForm } from "@/components/project-form";

export default function NewProjectPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-serif mb-8">New Project</h1>
            <ProjectForm />
        </div>
    );
}
