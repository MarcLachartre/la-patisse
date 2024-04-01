'use server';

import { UploadApiOptions, v2 } from 'cloudinary';

export const uploadPictureToCloudinary = async (
    pic: FormDataEntryValue,
    options: UploadApiOptions
) => {
    console.log('pic upload start');

    v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const file = pic as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const base64File = Buffer.from(buffer).toString('base64');
    const fileMimeType = file.type;

    const response = await v2.uploader
        .upload(`data:${fileMimeType};base64,${base64File}`, options)
        .then((r) => {
            r.success = true;
            return r;
        })
        .catch((e) => {
            console.log('image upload failed');
            console.log(e);
            return e;
        });

    console.log('pic upload end');

    return response;
};
