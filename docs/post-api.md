# Post API – Tài liệu Postman

**Base URL**: `http://localhost:3000`  
**Prefix**: `/api/post`

---

## 1. Tạo bài viết mới

- **Method**: POST
- **URL**: `http://localhost:3000/api/post`
- **Authorization**: Có (yêu cầu đăng nhập)
- **Headers**:
  - `Content-Type: application/json`
  - `Cookie: better-auth.session_token={SESSION_TOKEN}` (cookie từ đăng nhập BetterAuth)
- **Body** (raw JSON):

```json
{
  "title": "Bài viết mới",
  "excerpt": "Tóm tắt nội dung bài viết",
  "content": "Nội dung đầy đủ của bài viết...",
  "coverImage": "https://res.cloudinary.com/.../image.jpg",
  "coverImagePublicId": "abc123xyz"
}
```

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
    "coverImageUrl": "https://res.cloudinary.com/.../image.jpg",
    "coverImagePublicId": "abc123xyz",
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
| `title` | string | Có | Tiêu đề bài viết (tối thiểu 5 ký tự) |
| `excerpt` | string | Có | Tóm tắt ngắn gọn nội dung bài viết |
| `content` | string | Có | Nội dung đầy đủ của bài viết (Markdown hoặc HTML) |
| `coverImage` | string | Có | URL ảnh bìa từ Cloudinary |
| `coverImagePublicId` | string | Không | Public ID của ảnh trên Cloudinary (dùng để xóa sau) |

---

## 3. Xử lý Slug Trùng Lặp

Nếu bài viết có tiêu đề trùng với bài viết đã tồn tại, hệ thống sẽ tự động thêm suffix:

- Lần 1: `bai-viet-moi`
- Lần 2: `bai-viet-moi-1`
- Lần 3: `bai-viet-moi-2`
- ...

---

## 4. Cách Lấy Session Token

Sau khi đăng nhập qua BetterAuth (xem [User API](#)), cookie `better-auth.session-token` sẽ được tự động lưu. Gửi request kèm cookie này.

Hoặc sử dụng header `Authorization` với session token:

```bash
curl -X POST http://localhost:3000/api/post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {SESSION_TOKEN}" \
  -d '{"title": "...", "excerpt": "...", "content": "...", "coverImage": "..."}'
```

---

## Ghi chú chung

- **Authentication**: Sử dụng BetterAuth session cookie hoặc header `Authorization`.
- **Slug**: Tự động tạo từ tiêu đề, loại bỏ ký tự đặc biệt, chuyển sang chữ thường.
- **Slug Duplicate**: Hệ thống tự động thêm số suffix nếu trùng.
- **Validation**: Server luôn kiểm tra các trường bắt buộc, không tin client.