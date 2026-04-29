export const getData = (res, fallback = []) => {
  return res?.data?.data ?? fallback;
};