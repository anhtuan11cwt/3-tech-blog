const skeletonItems = [1, 2, 3, 4, 5, 6];

export default function PostCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletonItems.map((item) => (
        <article
          className="animate-pulse rounded-xl overflow-hidden border border-white/10 bg-white/5"
          key={`skeleton-${item}`}
        >
          <div className="relative overflow-hidden">
            <div className="w-full h-48 bg-white/10" />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="p-4 space-y-2">
            <div className="h-3 bg-white/10 rounded w-1/3" />

            <div className="h-5 bg-white/10 rounded w-3/4" />

            <div className="h-3 bg-white/10 rounded w-full" />
            <div className="h-3 bg-white/10 rounded w-2/3" />

            <div className="h-4 bg-white/10 rounded w-1/4 mt-4" />
          </div>
        </article>
      ))}
    </div>
  );
}
