

export type TKeysOf<T> = T extends T ? keyof T: never;

export type TMapper<Value extends Object> = {
  [K in keyof Value]: Value;
}