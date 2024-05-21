type ValuesOf<T> = T[keyof T];

type NonEmptyArray<T> = [T, ...T[]];

// https://stackoverflow.com/questions/74310043/how-to-change-the-name-of-a-type-key-selected-using-pick
type PickAndRename<T, PropMap extends Partial<Record<keyof T, string>>> = {
  [K in keyof PropMap as K extends keyof T
    ? PropMap[K] extends string
      ? PropMap[K]
      : never
    : never]: K extends keyof T ? T[K] : never;
};

export type { NonEmptyArray, ValuesOf, PickAndRename };
