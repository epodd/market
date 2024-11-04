import { s3 } from "../../s3/s3";
import { v4 } from 'uuid'

class s3Service {
  async uploadFile(file) {
    const { createReadStream } = await file;
    const fileStream = createReadStream();
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: v4(),
      Body: fileStream,
    };
    const result = await s3.upload(uploadParams).promise();
    
    return { key: result.Key, location: result.Location };
  }

  async getFile(key) {
    const params = { Bucket: `${process.env.S3_BUCKET_NAME}`, Key: key };
    return s3.getSignedUrl("getObject", params);
  }
}

export default new s3Service();
