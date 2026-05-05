"use server";

import { prisma } from "../lib/prisma";

export async function getPost(slug: string) {
  try {
    if (!slug) {
      return null;
    }

    const post = await prisma.post.findUnique({
      select: {
        author: {
          select: {
            id: true,
            image: true,
            name: true,
          },
        },
        content: true,
        coverImageUrl: true,
        createdAt: true,
        id: true,
        slug: true,
        title: true,
      },
      where: { slug },
    });

    if (!post) return null;

    return post;
  } catch {
    return null;
  }
}
