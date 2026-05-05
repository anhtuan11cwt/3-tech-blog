import { type NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { deleteImage, uploadImage } from "../../../services/cloudinary";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const { postId } = await params;

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Chưa xác thực" }, { status: 401 });
    }

    const post = await prisma.post.findUnique({
      select: {
        authorId: true,
        content: true,
        coverImagePublicId: true,
        coverImageUrl: true,
        excerpt: true,
        slug: true,
        title: true,
      },
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Không tìm thấy bài viết" },
        { status: 404 },
      );
    }

    if (post.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Không có quyền chỉnh sửa" },
        { status: 403 },
      );
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json(
      { error: "Lỗi khi lấy bài viết" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const { postId } = await params;

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
    const file = formData.get("coverImage") as File | null;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Tiêu đề và nội dung là bắt buộc" },
        { status: 400 },
      );
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Không tìm thấy bài viết" },
        { status: 404 },
      );
    }

    if (existingPost.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Không có quyền chỉnh sửa" },
        { status: 403 },
      );
    }

    let newSlug = existingPost.slug;
    let newCoverImageUrl = existingPost.coverImageUrl;
    let newCoverImagePublicId = existingPost.coverImagePublicId;

    if (title !== existingPost.title) {
      const baseSlug = slugify(title, { lower: true, strict: true });
      let slug = baseSlug;
      let counter = 1;

      while (
        await prisma.post.findUnique({
          where: { slug },
        })
      ) {
        if (existingPost.slug === slug) break;
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      newSlug = slug;
    }

    if (file && file.size > 0) {
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

      const { secure_url, public_id } = await uploadImage(file);

      if (existingPost.coverImagePublicId) {
        try {
          await deleteImage(existingPost.coverImagePublicId);
        } catch {}
      }

      newCoverImageUrl = secure_url;
      newCoverImagePublicId = public_id;
    }

    const updatedPost = await prisma.post.update({
      data: {
        content,
        coverImagePublicId: newCoverImagePublicId,
        coverImageUrl: newCoverImageUrl,
        excerpt: excerpt || "",
        slug: newSlug,
        title,
      },
      where: { id: postId },
    });

    return NextResponse.json({
      message: "Cập nhật bài viết thành công",
      post: updatedPost,
    });
  } catch {
    return NextResponse.json(
      { error: "Lỗi khi cập nhật bài viết" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const { postId } = await params;

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Chưa xác thực" }, { status: 401 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Không tìm thấy bài viết" },
        { status: 404 },
      );
    }

    if (post.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Không có quyền xóa" },
        { status: 403 },
      );
    }

    if (post.coverImagePublicId) {
      try {
        await deleteImage(post.coverImagePublicId);
      } catch {}
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Lỗi khi xóa bài viết" },
      { status: 500 },
    );
  }
}
