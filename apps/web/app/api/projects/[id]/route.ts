import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@repo/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const data = await request.json();

    // Upsert Category
    const category = await prisma.category.upsert({
        where: { name: data.category },
        update: {},
        create: { 
            name: data.category,
            slug: data.category.toLowerCase().replace(/ /g, '-')
        }
    });

    // Update Project
    // Simplify: Delete all images and recreate (easier for reordering in MVP)
    // Or smarter: update existing. For now, delete/create is safest for order sync.
    
    await prisma.projectImage.deleteMany({ where: { projectId: id } });

    const project = await prisma.project.update({
        where: { id },
        data: {
            title: data.title,
            slug: data.slug,
            description: data.description,
            coverImage: data.coverImage,
            featured: data.featured,
            categoryId: category.id,
            images: {
                create: data.images.map((url: string, index: number) => ({
                    url,
                    order: index
                }))
            }
        }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
