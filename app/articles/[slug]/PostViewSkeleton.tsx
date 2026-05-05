import ContainerLayout from "../../layouts/ContainerLayout";

export default function PostViewSkeleton() {
  return (
    <ContainerLayout>
      <article className="max-w-3xl mx-auto text-text animate-pulse">
        {/* Back link skeleton */}
        <div className="h-6 bg-gray-800 rounded w-48 mb-8" />

        {/* Cover image skeleton */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 mb-10 rounded-2xl overflow-hidden bg-gray-800" />

        {/* Title skeleton */}
        <div className="space-y-4 mb-8">
          <div className="h-12 bg-gray-800 rounded w-3/4" />

          {/* Author info skeleton */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-800 rounded-full" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-32" />
              <div className="h-4 bg-gray-800 rounded w-24" />
            </div>
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="flex gap-4 mb-8">
          <div className="h-10 bg-gray-800 rounded w-24" />
          <div className="h-10 bg-gray-800 rounded w-20" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-800 rounded" />
          <div className="h-4 bg-gray-800 rounded" />
          <div className="h-4 bg-gray-800 rounded w-5/6" />
          <div className="h-4 bg-gray-800 rounded" />
          <div className="h-4 bg-gray-800 rounded w-4/5" />
          <div className="h-4 bg-gray-800 rounded" />
          <div className="h-4 bg-gray-800 rounded w-3/4" />
        </div>

        {/* Divider skeleton */}
        <div className="h-px bg-gray-800 my-10" />

        {/* Back link skeleton */}
        <div className="h-6 bg-gray-800 rounded w-48" />
      </article>
    </ContainerLayout>
  );
}
