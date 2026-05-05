# Post API – Tài liệu Postman

**Base URL**: `http://localhost:3000`  
**Prefix**: `/api/post`

---

## 1. Tạo bài viết mới

- **Method**: POST
- **URL**: `http://localhost:3000/api/post`
- **Authorization**: Có (yêu cầu đăng nhập)
- **Headers**:
  - `Cookie: better-auth.session_token={SESSION_TOKEN}` (cookie từ đăng nhập BetterAuth)
- **Body** (form-data):

| Key | Type | Mô tả |
|-----|------|-------|
| `title` | text | Tiêu đề bài viết (tối thiểu 5 ký tự) |
| `excerpt` | text | Tóm tắt nội dung bài viết |
| `content` | text | Nội dung đầy đủ |
| `coverImage` | file | Ảnh bìa (jpg, png, webp, tối đa 5MB) |

- **Response**:
  - 201 (thành công):

```json
{
  "message": "Tạo bài viết thành công",
  "post": {
    "id": "post_abc123",
    "title": "Bài viết mới",
    "slug": "bai-viet-moi",
    "excerpt": "Tóm tắt nội dung bài viết",
    "content": "Nội dung đầy đủ của bài viết...",
    "coverImageUrl": "https://res.cloudinary.com/deef71c3q/image/upload/v1/tech-blog/abc123.jpg",
    "coverImagePublicId": "tech-blog/abc123",
    "authorId": "user_xyz789",
    "createdAt": "2026-05-04T12:00:00.000Z",
    "updatedAt": "2026-05-04T12:00:00.000Z"
  }
}
```

  - 401 (chưa đăng nhập):

```json
{
  "error": "Chưa xác thực"
}
```

  - 400 (thiếu trường bắt buộc):

```json
{
  "error": "Tất cả các trường đều bắt buộc"
}
```

  - 400 (file không phải hình ảnh):

```json
{
  "error": "Tệp phải là hình ảnh"
}
```

  - 400 (file quá lớn):

```json
{
  "error": "Kích thước ảnh không được vượt quá 5MB"
}
```

  - 400 (tiêu đề quá ngắn):

```json
{
  "error": "Tiêu đề phải có ít nhất 5 ký tự"
}
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Lỗi máy chủ nội bộ"
}
```

---

## 2. Trường dữ liệu (Field Descriptions)

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `title` | text | Có | Tiêu đề bài viết (tối thiểu 5 ký tự) |
| `excerpt` | text | Không | Tóm tắt ngắn gọn nội dung bài viết |
| `content` | text | Có | Nội dung đầy đủ của bài viết |
| `coverImage` | file | Có | Ảnh bìa (jpg, png, webp, tối đa 5MB) |

---

## 3. Xử lý Slug Trùng Lặp

Nếu bài viết có tiêu đề trùng với bài viết đã tồn tại, hệ thống sẽ tự động thêm suffix:

- Lần 1: `bai-viet-moi`
- Lần 2: `bai-viet-moi-1`
- Lần 3: `bai-viet-moi-2`
- ...

---

## 4. Upload Ảnh lên Cloudinary

Khi gửi request, ảnh `coverImage` sẽ được:
1. Validate (kiểm tra loại file và kích thước)
2. Upload lên Cloudinary (folder: `tech-blog`)
3. Lưu `secure_url` và `public_id` vào database

ảnh bìa có thể được tối ưu tự động bởi Cloudinary CDN.

---

## 5. Xóa Ảnh

Khi bài viết bị xóa, `coverImagePublicId` được dùng để xóa ảnh khỏi Cloudinary thông qua API xóa bài viết.

---

## 6. Lấy danh sách bài viết mới nhất

- **Method**: GET
- **URL**: `http://localhost:3000/api/post/recent`
- **Authorization**: Không (public API)
- **Response**:

  - 200 (thành công):

```json
[
  {
    "id": "post_abc123",
    "title": "Bài viết mới nhất 1",
    "slug": "bai-viet-moi-nhat-1",
    "excerpt": "Tóm tắt nội dung bài viết 1",
    "coverImageUrl": "https://res.cloudinary.com/deef71c3q/image/upload/v1/tech-blog/abc123.jpg",
    "createdAt": "2026-05-04T12:00:00.000Z",
    "author": {
      "id": "user_xyz789",
      "name": "Nguyễn Văn A",
      "image": "https://res.cloudinary.com/deef71c3q/image/upload/v1/tech-blog/avatar.jpg"
    }
  },
  {
    "id": "post_def456",
    "title": "Bài viết mới nhất 2",
    "slug": "bai-viet-moi-nhat-2",
    "excerpt": "Tóm tắt nội dung bài viết 2",
    "coverImageUrl": "https://res.cloudinary.com/deef71c3q/image/upload/v1/tech-blog/def456.jpg",
    "createdAt": "2026-05-03T10:00:00.000Z",
    "author": {
      "id": "user_xyz789",
      "name": "Nguyễn Văn A",
      "image": null
    }
  }
]
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Lỗi khi lấy bài viết"
}
```

### Giải thích

- **Sắp xếp**: Bài viết mới nhất lên đầu (`createdAt` giảm dần)
- **Giới hạn**: Tối đa 6 bài viết
- **Select fields**: Chỉ lấy các trường cần thiết để tối ưu hiệu suất
- **Include author**: Lấy thông tin tác giả (id, name, image)

---

## 7. Lấy danh sách bài viết (Cursor Pagination)

- **Method**: GET
- **URL**: `http://localhost:3000/api/post`
- **Authorization**: Không (public API)
- **Query Parameters**:

| Param | Type | Mô tả | Mặc định |
|-------|------|--------|----------|
| `cursor` | string | ID của bài viết cuối cùng để lấy tiếp | `null` (lấy từ đầu) |
| `limit` | number | Số lượng bài viết mỗi trang | `6` |

- **Response**:

  - 200 (thành công):

```json
{
  "posts": [
    {
      "id": "post_abc123",
      "title": "Bài viết 1",
      "slug": "bai-viet-1",
      "excerpt": "Tóm tắt nội dung bài viết 1",
      "coverImageUrl": "https://res.cloudinary.com/deef71c3q/image/upload/v1/tech-blog/abc123.jpg",
      "createdAt": "2026-05-04T12:00:00.000Z",
      "author": {
        "name": "Nguyễn Văn A",
        "image": "https://res.cloudinary.com/deef71c3q/image/upload/v1/tech-blog/avatar.jpg"
      }
    },
    {
      "id": "post_def456",
      "title": "Bài viết 2",
      "slug": "bai-viet-2",
      "excerpt": "Tóm tắt nội dung bài viết 2",
      "coverImageUrl": "https://res.cloudinary.com/deef71c3q/image/upload/v1/tech-blog/def456.jpg",
      "createdAt": "2026-05-03T10:00:00.000Z",
      "author": {
        "name": "Nguyễn Văn A",
        "image": null
      }
    }
  ],
  "nextCursor": "post_def456",
  "hasMore": true
}
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Lỗi khi lấy danh sách bài viết"
}
```

### Cách hoạt động của Cursor Pagination

1. **Lần 1** - Gọi API không có cursor:
   ```
   GET /api/post?limit=6
   ```
   → Trả về 6 bài viết + `nextCursor` = ID của bài viết cuối + `hasMore: true`

2. **Lần 2** - Gọi API với cursor từ lần 1:
   ```
   GET /api/post?cursor=post_def456&limit=6
   ```
   → Lấy 6 bài viết tiếp theo bắt đầu sau bài có ID `post_def456`

3. **Khi hết dữ liệu**:
   → `hasMore: false`, `nextCursor: null`

### Giải thích

- **Sắp xếp**: Bài viết mới nhất lên đầu (`createdAt` giảm dần)
- **Cursor**: Sử dụng ID của bài viết làm điểm mốc (không dùng offset)
- **Take + 1**: Lấy dư 1 bài để kiểm tra còn dữ liệu hay không
- **Skip**: Bỏ qua chính cursor đó để không bị trùng lặp
- **Ưu điểm**: Hiệu suất cao hơn offset pagination khi dữ liệu lớn

---

## 8. Lấy bài viết theo ID (Chỉnh sửa)

- **Method**: GET
- **URL**: `http://localhost:3000/api/post/{postId}`
- **Authorization**: Có (yêu cầu đăng nhập)
- **Headers**:
  - `Cookie: better-auth.session_token={SESSION_TOKEN}`

- **Response**:

  - 200 (thành công):

```json
{
  "title": "Bài viết cần chỉnh sửa",
  "excerpt": "Tóm tắt nội dung bài viết",
  "content": "Nội dung đầy đủ của bài viết...",
  "coverImageUrl": "https://res.cloudinary.com/deef71c3q/image/upload/v1/tech-blog/abc123.jpg",
  "coverImagePublicId": "tech-blog/abc123",
  "slug": "bai-viet-can-chinh-sua"
}
```

  - 401 (chưa đăng nhập):

```json
{
  "error": "Chưa xác thực"
}
```

  - 404 (không tìm thấy bài viết):

```json
{
  "error": "Không tìm thấy bài viết"
}
```

  - 403 (không có quyền chỉnh sửa):

```json
{
  "error": "Không có quyền chỉnh sửa"
}
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Lỗi khi lấy bài viết"
}
```

### Giải thích

- Chỉ author của bài viết mới có quyền lấy dữ liệu để chỉnh sửa
- Trả về đầy đủ thông tin: title, excerpt, content, coverImageUrl, coverImagePublicId, slug
- Dùng để populate form chỉnh sửa

---

## 9. Cập nhật bài viết

- **Method**: PATCH
- **URL**: `http://localhost:3000/api/post/{postId}`
- **Authorization**: Có (yêu cầu đăng nhập)
- **Headers**:
  - `Cookie: better-auth.session_token={SESSION_TOKEN}`
- **Body** (form-data):

| Key | Type | Mô tả |
|-----|------|-------|
| `title` | text | Tiêu đề bài viết (bắt buộc) |
| `excerpt` | text | Tóm tắt nội dung bài viết |
| `content` | text | Nội dung đầy đủ (bắt buộc) |
| `coverImage` | file | Ảnh bìa mới (tùy chọn, jpg, png, webp, tối đa 5MB) |

- **Response**:

  - 200 (thành công):

```json
{
  "message": "Cập nhật bài viết thành công",
  "post": {
    "id": "post_abc123",
    "title": "Bài viết đã cập nhật",
    "slug": "bai-viet-da-cap-nhat",
    "excerpt": "Tóm tắt nội dung bài viết",
    "content": "Nội dung đầy đủ của bài viết...",
    "coverImageUrl": "https://res.cloudinary.com/deef71c3q/image/upload/v1/tech-blog/new123.jpg",
    "coverImagePublicId": "tech-blog/new123",
    "authorId": "user_xyz789",
    "createdAt": "2026-05-04T12:00:00.000Z",
    "updatedAt": "2026-05-05T14:30:00.000Z"
  }
}
```

  - 401 (chưa đăng nhập):

```json
{
  "error": "Chưa xác thực"
}
```

  - 404 (không tìm thấy bài viết):

```json
{
  "error": "Không tìm thấy bài viết"
}
```

  - 403 (không có quyền chỉnh sửa):

```json
{
  "error": "Không có quyền chỉnh sửa"
}
```

  - 400 (thiếu trường bắt buộc):

```json
{
  "error": "Tiêu đề và nội dung là bắt buộc"
}
```

  - 400 (file không phải hình ảnh):

```json
{
  "error": "Tệp phải là hình ảnh"
}
```

  - 400 (file quá lớn):

```json
{
  "error": "Kích thước ảnh không được vượt quá 5MB"
}
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Lỗi khi cập nhật bài viết"
}
```

### Luồng xử lý

1. **Kiểm tra quyền sở hữu**: Chỉ author mới được cập nhật
2. **Xử lý Slug**: Nếu title thay đổi → tạo slug mới, kiểm tra trùng lặp
3. **Xử lý Ảnh**:
   - Nếu có ảnh mới → upload lên Cloudinary → xóa ảnh cũ
   - Nếu không có ảnh mới → giữ nguyên ảnh cũ
4. **Cập nhật Database**: Lưu tất cả thay đổi vào Prisma

### Xử lý Slug khi chỉnh sửa

- Nếu title không đổi → giữ nguyên slug cũ
- Nếu title thay đổi → tạo slug mới từ title mới
- Nếu slug mới trùng với bài khác → thêm suffix `-1`, `-2`, ...

---

## 10. Xóa bài viết

- **Method**: DELETE
- **URL**: `http://localhost:3000/api/post/{postId}`
- **Authorization**: Có (yêu cầu đăng nhập)
- **Headers**:
  - `Cookie: better-auth.session_token={SESSION_TOKEN}`

- **Response**:

  - 200 (thành công):

```json
{
  "success": true
}
```

  - 401 (chưa đăng nhập):

```json
{
  "error": "Chưa xác thực"
}
```

  - 404 (không tìm thấy bài viết):

```json
{
  "error": "Không tìm thấy bài viết"
}
```

  - 403 (không có quyền xóa):

```json
{
  "error": "Không có quyền xóa"
}
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Lỗi khi xóa bài viết"
}
```

### Luồng xử lý

1. **Kiểm tra quyền sở hữu**: Chỉ author mới được xóa bài viết
2. **Xóa ảnh trên Cloudinary**: Xóa ảnh bìa trước khi xóa bài viết (tránh orphan image)
3. **Xóa trong Database**: Xóa bản ghi bài viết khỏi PostgreSQL

### Lưu ý quan trọng

- **Thứ tự xóa**: Luôn xóa ảnh trên Cloudinary TRƯỚC KHI xóa database để tránh mất public_id
- **Xóa ảnh**: Nếu bài viết có ảnh bìa, sẽ gọi deleteImage(coverImagePublicId) để giải phóng dung lượng Cloudinary

---

## Ghi chú chung

- **Authentication**: Sử dụng BetterAuth session cookie hoặc header `Authorization`.
- **Upload Ảnh**: Server upload trực tiếp lên Cloudinary (bảo mật API secret).
- **Slug**: Tự động tạo từ tiêu đề, loại bỏ ký tự đặc biệt, chuyển sang chữ thường.
- **Slug Duplicate**: Hệ thống tự động thêm số suffix nếu trùng.
- **Validation**: Server luôn kiểm tra các trường bắt buộc và file upload, không tin client.