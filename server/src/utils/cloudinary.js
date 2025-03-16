import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("local file path missing");
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });
        console.log("file uploaded successfully", response?.secure_url);
        return response?.secure_url;
    } catch (error) {
        throw new Error(
            `Error while uploading file on cloudinary. ${error.message}`
        );
    }finally{
        fs.unlinkSync(localFilePath);
    }
};

const deleteFromCloudinary = async (URL) => {
    try {
        if (!URL) {
            throw new Error("URL is missing");
        }
        console.log(URL);
        const publicId= URL.split("/").pop().split(".")[0]
        const resourceType = URL.split("/")[4];
        const res = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType
        })
        console.log("file deleted successfully"); 
        return res; //{ result: 'ok' }
    } catch (error) {
        console.log(error.message);
        throw new Error(
            `Error while uploading file on cloudinary. ${error.message}`
        );
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };
