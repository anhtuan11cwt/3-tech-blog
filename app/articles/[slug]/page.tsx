import { Suspense } from "react";
import { getPost } from "../../server-actions/getPost";
import BlogView from "./BlogView";
import PostViewSkeleton from "./PostViewSkeleton";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const postPromise = getPost(slug);

  return (
    <Suspense fallback={<PostViewSkeleton />}>
      <BlogView postPromise={postPromise} />
    </Suspense>
  );
}
