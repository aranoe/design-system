import { BrandOption } from '@/types/BrandOption';
import { PlatformOption } from '@/types/PlatformOption';
import { Platform } from 'style-dictionary';

export interface ConfigParams {
  brand: BrandOption; // | "potential-future-brand"
  platform: PlatformOption;
  categories: string[];
  components: string[];
  prefix: string;
}

export type PlatformConfig = Record<string, (config: ConfigParams) => Platform>;
