export const isEmailValid = (value: string) => {
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  return regex.test(value);
};
export const isphonenumbervalid = () => {
  return true;
};
