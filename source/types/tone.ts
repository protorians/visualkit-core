import {IFeatureKit} from "./feature";

/**
 * Tone
 * @description Color set that directs the tone of your app's interface
 * @property id Tone ID
 * @property text Text color
 * @property tint General color of your interface. It indicates for example if the interface is in dark mode, light mode...
 * @property untint Dark variant of the `tint` tone intended to be used below `tint`
 * @property error Error color
 * @property warning Warning color
 * @property success Success color
 */
export type ITone = {
  id: string;
  scheme: IToneScheme;
} & IToneSlots;

/**
 * Tone slots
 */
export type IToneSlots = {
  text: string;
  tint: string;
  untint: string;
  error: string;
  warning: string;
  success: string;
  black: string;
  white: string;
}

export type IToneScheme = 'light' | 'dark'

export interface IToneKit extends IFeatureKit {
}