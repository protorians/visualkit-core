import {IStyleKit, IStyleProps} from "./style";

export type IStyleSheetDeclarations = {
  [Selector: string]: Partial<IStyleProps> | IStyleKit;
}