import { prisma } from "../../lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany();

  return Response.json({
    data: posts,
    success: true,
  });
}
