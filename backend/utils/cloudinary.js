import { v2 as cloudinary} from "cloudinary";
import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log(process.env.CLOUDINARY_API_KEY);

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Use an absolute path to avoid deployment issues
        const absolutePath = path.resolve(localFilePath);

        if (!fs.existsSync(absolutePath)) {
            console.error(`File not found: ${absolutePath}`);
            return null;
        }

        const response = await cloudinary.uploader.upload(absolutePath, {
            resource_type: "auto",
            secure: true
        });

        fs.unlinkSync(absolutePath);
        return response;

    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export {uploadOnCloudinary}