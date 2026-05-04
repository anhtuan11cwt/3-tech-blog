import { type NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { uploadImage } from "../../services/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Chưa xác thực" }, { status: 401 });
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const file = formData.get("coverImage") as File;

    if (!title || !content || !file) {
      return NextResponse.json(
        { error: "Tất cả các trường đều bắt buộc" },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Tệp phải là hình ảnh" },
        { status: 400 },
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Kích thước ảnh không được vượt quá 5MB" },
        { status: 400 },
      );
    }

    if (title.length < 5) {
      return NextResponse.json(
        { error: "Tiêu đề phải có ít nhất 5 ký tự" },
        { status: 400 },
      );
    }

    const { secure_url, public_id } = await uploadImage(file);

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
        coverImagePublicId: public_id,
        coverImageUrl: secure_url,
        excerpt: excerpt || "",
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
