export const deepClone = (state) => {
  return JSON.parse(JSON.stringify(state))
};
