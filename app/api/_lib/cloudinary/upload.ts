'use server';

import { v2 } from 'cloudinary';

export const uploadPictureToCloudinary = async (
    pic: FormDataEntryValue,
    options: {
        timeout: number; // timeout: duration allowed for uploading a pic,
        public_id: string; // public_id: has to be a timestamp,
        folder: string; // folder: folder in which the image will be stored,
        invalidate?: boolean; // invalidate and overwrite, when present and set to true, will replace the pic saved in the db by the new one to be uploaded if the public_id is the same.
        overwrite?: boolean;
    }
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
        .catch((e) => {
            console.log('image upload failed');
            console.log(e);
            return e;
        });

    console.log('pic upload end');

    return response;
};
