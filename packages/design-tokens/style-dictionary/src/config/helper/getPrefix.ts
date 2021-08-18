import { Platform } from "style-dictionary";

export const getPrefix = (platform: Platform | undefined): string => {
  if (!platform) return "";
  return platform && platform.prefix ? platform.prefix + "-" : "";
};
