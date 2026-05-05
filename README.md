# Tech Blog

Nền tảng blog công nghệ hiện đại, full-stack sử dụng Next.js 16, React 19 và các công nghệ tiên tiến. Được xây dựng với kiến trúc App Router, hỗ trợ SSR, Streaming, và cursor-based pagination.

## Tính năng chính

- **SSR & Streaming**: Server-side rendering với React Suspense và streaming data
- **Cursor-based Pagination**: Phân trang hiệu quả cho danh sách bài viết
- **Xác thực người dùng**: Đăng nhập/đăng ký bằng email/password qua BetterAuth
- **Tìm kiếm real-time**: Tìm kiếm bài viết với debounce và React Query
- **Quản lý bài viết**: Tạo, đọc, cập nhật, xóa bài viết (CRUD) với kiểm soát quyền tác giả
- **Rich Text Editor**: JoditEditor cho nội dung bài viết với định dạng HTML
- **Upload ảnh**: Tích hợp Cloudinary cho ảnh bìa bài viết
- **Responsive Design**: Giao diện đáp ứng trên mọi thiết bị với Tailwind CSS
- **Dark Theme**: Giao diện tối hiện đại với hiệu ứng glassmorphism

## Stack công nghệ

### Frontend
- **Next.js 16** - Framework full-stack với App Router
- **React 19** - UI library với Server Actions và hook `use()`
- **Tailwind CSS v4** - Utility-first CSS framework
- **TanStack React Query** - Data fetching, caching, và infinite scroll
- **Zustand** - State management cho modal system
- **Jodit React** - Rich text editor
- **React Hot Toast** - Thông báo toast

### Backend
- **Next.js API Routes** - REST API endpoints
- **BetterAuth** - Authentication library với Prisma adapter
- **Prisma ORM** - Type-safe database operations
- **PostgreSQL** - Relational database

### Services
- **Cloudinary** - Image upload và hosting
- **Vercel** - Deployment platform

## Cấu trúc dự án

```
tech-blog/
├── app/
│   ├── api/                  # API Routes
│   │   ├── auth/[...all]/    # BetterAuth handler
│   │   └── post/             # Post API (GET, POST, PATCH, DELETE)
│   │       ├── [postId]/
│   │       ├── recent/
│   │       └── search/
│   ├── articles/             # Articles pages
│   │   ├── page.tsx          # Articles list với pagination
│   │   └── [slug]/           # Single post view
│   ├── about/                # About page
│   ├── write/                # Create & Edit post
│   │   └── edit/[postId]/
│   ├── components/           # React components
│   │   ├── general/          # Navbar, Footer, Logo
│   │   ├── home/             # RecentPost
│   │   ├── modals/           # SignIn, Search, Modal
│   │   └── skeleton/         # Loading skeletons
│   ├── hooks/                # Custom hooks
│   │   ├── useDebounce.ts
│   │   └── useInfinitePosts.ts
│   ├── lib/                  # Core libraries
│   │   ├── auth.ts           # BetterAuth config
│   │   ├── auth-client.ts    # Client auth utils
│   │   ├── cloudinary.ts     # Cloudinary config
│   │   └── prisma.ts         # Prisma singleton
│   ├── providers/            # React providers
│   │   └── QueryProvider.tsx
│   ├── server-actions/         # Server Actions
│   │   └── getPost.ts
│   ├── services/             # API services
│   │   ├── cloudinary.ts     # Image upload/delete
│   │   └── post.ts           # Post API calls
│   ├── store/                # Zustand stores
│   │   └── useModalStore.ts
│   ├── types/                # TypeScript types
│   │   └── post.ts
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
└── next.config.ts            # Next.js config
```

## Database Schema

### Models

**User**
- `id`: String (CUID, PK)
- `email`: String (unique)
- `name`: String?
- `image`: String?
- Relations: `posts`, `accounts`, `sessions`

**Post**
- `id`: String (CUID, PK)
- `title`: String
- `slug`: String (unique)
- `content`: String (HTML)
- `excerpt`: String
- `coverImageUrl`: String?
- `coverImagePublicId`: String?
- `authorId`: String (FK → User)
- `createdAt`, `updatedAt`: DateTime

**Account, Session, Verification** - BetterAuth models cho authentication

## API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/post` | Lấy danh sách bài viết (cursor pagination) |
| POST | `/api/post` | Tạo bài viết mới (yêu cầu auth) |
| GET | `/api/post/recent` | Lấy 6 bài viết mới nhất |
| GET | `/api/post/search?q={query}` | Tìm kiếm bài viết |
| GET | `/api/post/[postId]` | Lấy chi tiết bài viết (yêu cầu auth, chỉ tác giả) |
| PATCH | `/api/post/[postId]` | Cập nhật bài viết (yêu cầu auth) |
| DELETE | `/api/post/[postId]` | Xóa bài viết (yêu cầu auth) |
| ALL | `/api/auth/[...all]` | BetterAuth endpoints |

## Chi tiết triển khai

### 1. Khởi tạo dự án
- Tạo project với `pnpm create next-app@latest`
- Cấu hình: TypeScript, ESLint, Tailwind CSS, App Router
- Không sử dụng `src/` directory

### 2. Font và màu sắc
- Font Poppins từ `next/font/google`
- CSS variables trong `globals.css`:
  - `--color-primary`: #6366f1 (indigo)
  - `--color-background`: #0f172a (dark blue)
  - `--color-text`: #e2e8f0

### 3. Navbar và Navigation
- Fixed navbar với backdrop-blur effect
- Mobile slide menu từ phải
- Search và SignIn modals qua Zustand store
- Conditional rendering Login/Logout dựa trên session

### 4. Homepage
- Hero section với grid 2 cột
- Suspense boundary cho `RecentPost` component
- Skeleton loading với `PostCardSkeleton`

### 5. RecentPost Component
- Client component sử dụng `useEffect` để fetch data
- Fetch từ `/api/post/recent`
- Grid responsive: 1 → 2 → 3 cột
- Hiển thị ảnh cover, tiêu đề, excerpt, ngày tạo

### 6. Articles Page (Cursor Pagination)
- Client component với `useInfinitePosts` hook
- TanStack React Query `useInfiniteQuery`
- "Load more" button tự động ẩn khi hết dữ liệu
- Skeleton loading khi fetch thêm

### 7. Post View Page
- Server Component nhận `params` (Next.js 15+ pattern)
- Server Action `getPost` trả về Promise
- Client component `BlogView` sử dụng React 19 `use()` hook để unwrap Promise
- Suspense với `PostViewSkeleton` fallback
- Hiển thị author avatar, tên, ngày tạo
- Chỉ tác giả mới thấy nút Edit/Delete

### 8. Write Page
- JoditEditor với dynamic import (ssr: false)
- Dark theme config cho editor
- Form upload ảnh với preview
- Axios POST đến `/api/post`

### 9. Edit Page
- Dynamic route `/write/edit/[postId]`
- Fetch bài viết hiện tại khi mount
- Populate form data
- Skeleton loading khi fetching
- Axios PATCH đến `/api/post/[postId]`

### 10. Authentication (BetterAuth)
- Email/password authentication
- Prisma adapter cho PostgreSQL
- API route handler tại `/api/auth/[...all]`
- SignIn modal hỗ trợ cả đăng nhập và đăng ký
- Session qua `authClient.useSession()`

### 11. Search Modal
- Input với autoFocus
- Debounce 400ms qua `useDebounce` hook
- React Query `useQuery` với `enabled` flag
- Kết quả hiển thị ngay lập tức

### 12. Cloudinary Integration
- Upload ảnh qua `upload_stream`
- Lưu `secure_url` và `public_id`
- Xóa ảnh cũ khi cập nhật bài viết
- Xóa ảnh khi xóa bài viết

### 13. Validation
- Kiểm tra file type (image/*)
- Giới hạn file size (5MB)
- Tiêu đề tối thiểu 5 ký tự
- Slug unique với suffix counter

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# BetterAuth
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## Scripts

```bash
# Development
pnpm dev

# Build (với Prisma generate)
pnpm build

# Linting
pnpm lint          # ESLint
pnpm lint2         # Biome lint
pnpm check         # Biome check
pnpm format        # Biome format
```

## Triển khai lên Vercel

1. **Push code lên GitHub**
   ```bash
   git add .
   git commit -m "initial commit"
   git push origin main
   ```

2. **Import project trên Vercel**
   - Chọn framework: Next.js
   - Thêm tất cả environment variables

3. **Cập nhật environment variables cho production**
   - `BETTER_AUTH_URL` → production URL
   - `NEXT_PUBLIC_BASE_URL` → production URL

4. **Redeploy**

## Lưu ý quan trọng

- Next.js 16 sử dụng Tailwind CSS v4 với cú pháp `@import "tailwindcss"`
- Prisma schema không cần `url = env("DATABASE_URL")` khi dùng Prisma Data Platform
- React 19 `use()` hook chỉ dùng trong Client Components để unwrap Promises từ Server Actions
- Server Actions phải có directive `"use server"`
- Client Components phải có directive `"use client"` khi dùng hooks

## License

MIT
