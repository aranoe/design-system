import { Unit } from '@/types/transform/Unit';

export const transformUnitValue = (value: string | number, unit: Unit) => {
  switch (unit) {
    case "%":
      return value + unit;
    case "hex":
      return value;
    case "px":
      return value + unit;
    default:
      return value;
  }
};
