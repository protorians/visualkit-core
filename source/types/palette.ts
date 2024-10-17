import {IFeatureKit} from "./feature";

/**
 * Palette
 * @description Set of 5 slots to define the appearance of the application.
 * It starts from slot one (1) to slot five (5).
 * @property id Palette ID
 * @property one `Primary` color
 * @property two Variant of the `Primary` color or not
 * @property three Use as a `Secondary` color if the "two" slot is used as a variation of the `primary` color.
 * Or use as the `tertiary` color
 * @property four Use as a variation of slot "three" if slot "three" is used as the "secondary" color.
 * Or use as the quaternary color
 * @property five Treat yourself
 */
export type IPalette = {
  id: string;
} & IPaletteSlots;

/**
 * Palette slots
 */
export type IPaletteSlots = {
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
}

export interface IPaletteKit extends IFeatureKit {
}