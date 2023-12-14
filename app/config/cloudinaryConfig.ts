const cloudinaryConfig = () => {
  cloudinary.config({
    // cloud_name: process.env.CLOUD_NAME,
    // api_key: process.env.CLOUD_APIKEY,
    // api_secret: process.env.CLOUD_APISECRET,

    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_APIKEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_APISECRET,
  });
};

export default cloudinaryConfig;
