
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: 'dxmpq2u6j',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});
const uploadImage = async (images) => {
    let cloudinaryImages = images.map((image) => {
        const item = cloudinary.uploader.upload(image, {
            folder: 'MEUBLUX'
        })
        return item
    })
    cloudinaryImages = await Promise.all(cloudinaryImages)
    cloudinaryImages = cloudinaryImages.map(item => {
        return item.secure_url
    })
    return cloudinaryImages
}

export default uploadImage