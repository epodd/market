export const setProp = <T, K>(defaultValue: T, nameProps: K) => {
  return (props: any): T | K => props[nameProps] || defaultValue;
};
