import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@repo/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    
    // 1. Find or create category
    const category = await prisma.category.upsert({
        where: { name: data.category },
        update: {},
        create: { 
            name: data.category,
            slug: data.category.toLowerCase().replace(/ /g, '-')
        }
    });

    // 2. Create Project
    const project = await prisma.project.create({
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
      return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
