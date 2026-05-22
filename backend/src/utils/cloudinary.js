import { v2 as coludinary } from 'cloudinary'
coludinary.config({
    cloud_name:process.env.CLOUD_NAME,
    secure:true,
    api_key:process.env.API_KEY_CLOUDINARY,
    api_secret:process.env.API_SECRET_CLOUDINARY
})