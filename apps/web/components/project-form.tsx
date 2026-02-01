"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/image-uploader";

const projectSchema = z.object({
    title: z.string().min(2),
    slug: z.string().min(2),
    category: z.string().min(1),
    description: z.string().optional(),
    featured: z.boolean(),
    coverImage: z.string().min(1, "Cover image is required"),
    images: z.array(z.string()),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const CATEGORIES = ["Weddings", "Commercial", "Travel", "Portraits", "Events"];

export function ProjectForm({
    initialData,
    isEditing = false
}: {
    initialData?: Partial<ProjectFormData>,
    isEditing?: boolean
}) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            category: initialData?.category || CATEGORIES[0],
            description: initialData?.description || "",
            featured: initialData?.featured || false,
            coverImage: initialData?.coverImage || "",
            images: initialData?.images || [],
        },
    });

    const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
        setSaving(true);
        try {
            const res = await fetch(isEditing ? `/api/projects/${(initialData as any).id}` : '/api/projects', {
                method: isEditing ? 'PATCH' : 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!res.ok) throw new Error("Failed to save");

            router.refresh();
            router.push("/admin/projects");
        } catch (error) {
            console.error(error);
            alert("Failed to save project");
        } finally {
            setSaving(false);
        }
    };

    // Auto-generate slug from title
    const title = watch("title");
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue("title", e.target.value);
        if (!isEditing) {
            setValue("slug", e.target.value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Title</label>
                        <input
                            {...register("title")}
                            onChange={handleTitleChange}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-white"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Slug</label>
                        <input
                            {...register("slug")}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-white"
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Category</label>
                        <select
                            {...register("category")}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-white"
                        >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                        <input
                            type="checkbox"
                            id="featured"
                            {...register("featured")}
                            className="w-4 h-4 rounded bg-neutral-900 border-neutral-800"
                        />
                        <label htmlFor="featured" className="text-sm text-neutral-400">Featured on Home Page</label>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Cover Image</label>
                    <Controller
                        control={control}
                        name="coverImage"
                        render={({ field }) => (
                            <ImageUploader
                                value={field.value ? [field.value] : []}
                                onChange={(urls) => field.onChange(urls[0])}
                                maxFiles={1}
                            />
                        )}
                    />
                    {errors.coverImage && <p className="text-red-500 text-xs mt-1">{errors.coverImage.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Description</label>
                <textarea
                    {...register("description")}
                    rows={5}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-white"
                />
            </div>

            <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Gallery Images</label>
                <Controller
                    control={control}
                    name="images"
                    render={({ field }) => (
                        <ImageUploader
                            value={field.value}
                            onChange={field.onChange}
                            maxFiles={20}
                        />
                    )}
                />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-neutral-800">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 text-neutral-400 hover:text-white"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-2 bg-white text-black font-medium rounded hover:bg-neutral-200 disabled:opacity-50"
                >
                    {saving ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
                </button>
            </div>
        </form>
    );
}
