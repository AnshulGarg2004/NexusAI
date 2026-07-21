import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import { s3Client } from "../config/s3.js"
import { GetObjectCommand } from "@aws-sdk/client-s3"

export const getFromS3 = async (fileName, expiresIn=600) => {
    const url = await getSignedUrl(s3Client, new GetObjectCommand({
        Bucket : process.env.BUCKET_NAME,
        Key : fileName
    }), expiresIn);

    console.log("url nahi aayega: ", url);
    
    return url;
}