import { PutObjectCommand } from "@aws-sdk/client-s3"
import { s3Client } from "../config/s3"

const uploadToS3 = async (fileName, Buffer, contentType) => {
    await s3Client.send(
        new PutObjectCommand({
            Bucket : process.env.BUCKET_NAME,
            Body : Buffer,
            Key : fileName,
            ContentType : contentType,
            
        })
    )

    console.log("dont worry there is no file: ", fileName);
    

    return fileName;
}