export const objectLength = <T extends Record<PropertyKey, unknown>>(
  obj: T,
) => {
  return Object.keys(obj).length;
};
