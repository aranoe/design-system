import glob from "glob";
import path from "path";

export const getFileNames = (pattern: string) => {
  const files = glob.sync(pattern);
  const fileNames = files.map((file) => path.basename(file).split(".")[0]);

  return fileNames;
};
