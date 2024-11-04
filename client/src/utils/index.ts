export const findArrayInObject = (obj: Object | undefined): any => {
  if (!obj) return [];
  let arr = null;
  for (let key in obj) {
    if (Array.isArray(obj[key as keyof typeof obj]) && !arr) {
      arr = obj[key as keyof typeof obj];
    }
  }

  return arr || [];
};
