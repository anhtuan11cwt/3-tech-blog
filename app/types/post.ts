export interface Post {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
  coverImageUrl: string;
  createdAt: Date;
  excerpt: string;
  id: string;
  slug: string;
  title: string;
}
