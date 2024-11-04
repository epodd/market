import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()

export const config = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  apiVersion: "2010-12-01",
  region: "eu-west-2",
}

AWS.config.update(config);

export const s3 = new AWS.S3();
