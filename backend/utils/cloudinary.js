import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
  cloud_name: process.env.CLOUD_NAME,
});

export const uploadMedia = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return uploadResponse;
  } catch (error) {
    console.log(error);
  }
};

// Delete media from cloudinary

export const deleteMedia = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
};

// export const deleteVideo = async (publicId) => {
//   try {
//     await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const uploadPdf = async (file) => {
//   try {
//     const uploadResponse = await cloudinary.uploader.upload(file, {
//       resource_type: "raw", // Important for PDFs
//       folder: "pdfs", // Optional: you can organize files under a folder
//     });
//     return uploadResponse;
//   } catch (error) {
//     console.log(error);
//   }
// };
