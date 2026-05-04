import cloudinary from "../lib/cloudinary";

export const uploadImage = async (file: File) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "tech-blog" }, (error, result) => {
            if (error || !result) {
              return reject(error);
            }

            resolve({
              public_id: result.public_id,
              secure_url: result.secure_url,
            });
          })
          .end(buffer);
      },
    );
  } catch {
    throw new Error("Tải ảnh lên thất bại");
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch {
    throw new Error("Xóa ảnh thất bại");
  }
};
