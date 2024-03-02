import { v2 as cloudinary } from "cloudinary";
import { Options } from "multer-storage-cloudinary";
import streamifier from "streamifier";
import { Service } from "typedi";

import { CLOUDINARY, APP_NAME } from "../config";
import { CustomError } from "../utils/response/custom-error/customError";

declare interface cloudinaryOptions extends Options {
  params: {
    folder: string;
  };
}

cloudinary.config({
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
  secure: true,
});

export const multerOpts: cloudinaryOptions = {
  cloudinary: cloudinary,
  params: {
    folder: "dlcf-members",
  },
};


export const uploadBuffer = async (buffer: Buffer, folder: string) =>{
    // This was implemented this way because cloudinary's upload function does not return errors in a user friendly way
    return await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ folder: `${APP_NAME}/${folder}` }, (error, result) => {
        if (error) {
          reject(new CustomError(500, "Raw", "an error uploading the file", error.message));
        } else {
          resolve(result);
        }
      });

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  }

export const uploadBase64 = async (base64: string, folder: string) => {
    // This was implemented this way because cloudinary's upload function does not return errors in a user friendly way
    return await new Promise((resolve, reject) => {
      // convert base64 string to buffer
      const base64String = base64.split(";base64,").pop();
      const buffer = Buffer.from(base64String, "base64");

      const uploadStream = cloudinary.uploader.upload_stream({ folder: `${APP_NAME}/${folder}` }, (error, result) => {
        if (error) {
          reject(new CustomError(500, "Raw", "an error uploading the file", error.message));
        } else {
          resolve(result?.url);
        }
      });
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  }

  export const uploadFile = async (file: Express.Multer.File, folder: string) => {
    // This was implemented this way because cloudinary's upload function does not return errors in a user friendly way
    return await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ folder: `${APP_NAME}/${folder}` }, (error, result) => {
        if (error) {
          reject(new CustomError(500, "Raw", "an error uploading the file", error.message));
        } else {
          resolve(result?.url);
        }
      });

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

export const deleteUrl = async (url: string) => {
    if (!url.includes("cloudinary")) return false;

    const publicId = getPublicId(url);
    const { result } = await cloudinary.uploader.destroy(publicId);

    return result === "ok" ? true : false;
  }

const getPublicId = (url: string) => {
    const id = url.split(APP_NAME)[1].split(".")[0];
    return APP_NAME + id;
  }

