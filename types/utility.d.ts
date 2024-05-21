type ValuesOf<T> = T[keyof T];

type NonEmptyArray<T> = [T, ...T[]];

export type { ValuesOf, NonEmptyArray };
