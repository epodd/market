import ReactS3Client from "react-aws-s3-typescript";

const bucketConfig = {
  bucketName: String(process.env.REACT_APP_S3_BUCKET_NAME),
  albumName: "photos",
  region: "eu-west-2",
  accessKeyId: String(process.env.REACT_APP_S3_BUCKET_ACCESS_KEY_ID),
  secretAccessKey: String(process.env.REACT_APP_S3_BUCKET_SECRET_ACCESS_KEY),
};

const s3 = new ReactS3Client(bucketConfig);

export default s3;
