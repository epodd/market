export const actionCreator =
  <P>(type: number) =>
  (payload: P) => ({ type: type, payload: payload });
