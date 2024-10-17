import {SizeKit} from "../constants";

export type ISizePx = `${number}px`;
export type ISizeCm = `${number}cm`;
export type ISizeMm = `${number}mm`;
export type ISizeQ = `${number}Q`;
export type ISizeIn = `${number}in`;
export type ISizePc = `${number}pc`;
export type ISizePt = `${number}pt`;
export type ISizeCh = `${number}ch`;
export type ISizeEx = `${number}ex`;
export type ISizeEm = `${number}em`;
export type ISizeRem = `${number}rem`;
export type ISizeVw = `${number}vw`;
export type ISizeVh = `${number}vh`;
export type ISizeVMin = `${number}vmin`;
export type ISizeVMax = `${number}vmax`;
export type ISizePercent = `${number}%`;


export type ISizeKeys = keyof typeof SizeKit

/**
 * Available size
 */
export type ISizeValues = number
  | ISizePx
  | ISizeCm
  | ISizeMm
  | ISizeQ
  | ISizeIn
  | ISizePc
  | ISizePt
  | ISizeCh
  | ISizeEx
  | ISizeEm
  | ISizeRem
  | ISizeVw
  | ISizeVh
  | ISizeVMin
  | ISizeVMax
  | ISizePercent
  ;

/**
 * Available sizes collection
 */
export type ISize = {
  [K in ISizeKeys]: ISizeValues;
}

/**
 * Define your custom sizes collection
 */
export type ICustomSize = {
  [K: string]: ISizeValues;
}
