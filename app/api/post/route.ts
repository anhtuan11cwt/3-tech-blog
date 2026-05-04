import { type NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Chưa xác thực" }, { status: 401 });
    }

    const body = await req.json();
    const { title, excerpt, content, coverImage, coverImagePublicId } = body;

    if (!title || !excerpt || !content || !coverImage) {
      return NextResponse.json(
        { error: "Tất cả các trường đều bắt buộc" },
        { status: 400 },
      );
    }

    if (title.length < 5) {
      return NextResponse.json(
        { error: "Tiêu đề phải có ít nhất 5 ký tự" },
        { status: 400 },
      );
    }

    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newPost = await prisma.post.create({
      data: {
        authorId: session.user.id,
        content,
        coverImagePublicId: coverImagePublicId || null,
        coverImageUrl: coverImage,
        excerpt,
        slug,
        title,
      },
    });

    return NextResponse.json(
      { message: "Tạo bài viết thành công", post: newPost },
      { status: 201 },
    );
  } catch (error) {
    console.error("Lỗi POST /api/post:", error);

    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
