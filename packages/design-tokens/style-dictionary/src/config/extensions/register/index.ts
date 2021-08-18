import { registerFormats } from "@/config/extensions/register/registerFormats";
import { registerTransformGroups } from "@/config/extensions/register/registerTransformGroups";
import { registerTransforms } from "@/config/extensions/register/registerTransforms";

// register global style dictionary config
export const registerGlobalConfig = () => {
  registerTransforms();
  registerTransformGroups();
  registerFormats();
};
