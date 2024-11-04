import { useMemo } from "react";
import s3 from "src/services/s3";
import { v4 } from "uuid";

export const useS3 = () => {
  return useMemo(() => {
    return {
      upload: async (files: File[]) => {
        try {
          let urls: string[] = [];
          if (!files || !files?.length) {
            throw new Error("Not files!");
          }
          for (let file of files) {
            await s3
              .uploadFile(file, v4())
              .then((res) => urls.push(res.location));
          }
          return urls;
        } catch (e: any) {
          throw new Error(e);
        }
      },
      getList: async () => {
        try {
          return s3.listFiles().then(({ data }) => data.Contents.json());
        } catch (e: any) {
          throw new Error(e);
        }
      },

      deleteImage: async (path: string) => {
        try {
          return s3.deleteFile(path).then((res) => res);
        } catch (e: any) {
          throw new Error(e);
        }
      },
    };
  }, []);
};
