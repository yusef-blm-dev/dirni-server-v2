import { v2 as cloudinary } from "cloudinary";
import asyncHandler from "express-async-handler";
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const cldUpload = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  };
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};

export const addImage = asyncHandler(async (req, res) => {
  const { data, mimetype } = req.files.image;

  const base64String = Buffer.from(data).toString("base64");
  const widthPrefix = `data:${mimetype};base64,${base64String}`;
  const imageUrl = await cldUpload(widthPrefix);

  res.status(200).json({ imageUrl });
});
