import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        author: {
          select: {
            id: true,
            image: true,
            name: true,
          },
        },
        coverImageUrl: true,
        createdAt: true,
        excerpt: true,
        id: true,
        slug: true,
        title: true,
      },
      take: 6,
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("[LAY_BAI_VIET_MOI_NHAT]", error);
    return NextResponse.json(
      { error: "Lỗi khi lấy bài viết" },
      { status: 500 },
    );
  }
}
