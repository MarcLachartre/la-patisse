// // Require the cloudinary library
// import { v2 as cloudinary } from 'cloudinary';

// // Return "https" URLs by setting secure: true
// cloudinary.config({
//     secure: true
// });

// // Log the configuration
// console.log(cloudinary.config());

// export const uploadImage = async (imagePath) => {

//     // Use the uploaded file's name as the asset's public ID and 
//     // allow overwriting the asset with new versions
//     const options = {
//         use_filename: true,
//         unique_filename: false,
//         overwrite: true,
//     };

//     try {
//         // Upload the image
//         const result = await cloudinary.uploader.upload(imagePath, options);
//         console.log(result);
//         return result.public_id;
//     } catch (error) {
//         console.error(error);
//     }
// };
