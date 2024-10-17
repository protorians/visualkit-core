
export type IConstructCallbackResponse<T extends (HTMLElement | undefined)> = (target?: T) => T[];

export type IConstructCallback<T extends (HTMLElement | undefined)> = (target?: HTMLElement) => IConstructCallbackResponse<T>

