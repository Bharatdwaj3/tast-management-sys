import multer from 'multer';
import cloudinary from "./cloudinary.service.js";
import CloudinaryStorage from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpeg", "png", "jpg", "mpv", "mp4"],
    resource_type: 'auto',
  },
});

export default multer({ storage });