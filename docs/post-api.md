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

## Ghi chú chung

- **Authentication**: Sử dụng BetterAuth session cookie hoặc header `Authorization`.
- **Upload Ảnh**: Server upload trực tiếp lên Cloudinary (bảo mật API secret).
- **Slug**: Tự động tạo từ tiêu đề, loại bỏ ký tự đặc biệt, chuyển sang chữ thường.
- **Slug Duplicate**: Hệ thống tự động thêm số suffix nếu trùng.
- **Validation**: Server luôn kiểm tra các trường bắt buộc và file upload, không tin client.