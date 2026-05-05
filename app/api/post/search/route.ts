import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("q")?.trim() || "";
    const limit = Number.parseInt(searchParams.get("limit") || "5", 10);

    if (!query) {
      return NextResponse.json([]);
    }

    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        coverImageUrl: true,
        createdAt: true,
        excerpt: true,
        id: true,
        slug: true,
        title: true,
      },
      take: limit,
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            excerpt: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("[TIM_KIEM_BAI_VIET]", error);
    return NextResponse.json(
      { error: "Lỗi khi tìm kiếm bài viết" },
      { status: 500 },
    );
  }
}
