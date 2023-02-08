export type TFormatPhoneNumber = (phone: string) => string | null;

export const formatPhoneNumber: TFormatPhoneNumber = (phone) => {
  if (!phone) {
    return null;
  }

  const phoneNumber = phone.replace(/[^\d]/g, "");

  if (phoneNumber.length < 4) {
    return phoneNumber;
  }

  if (phoneNumber.length < 7) {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
  }

  return `+7 ${phoneNumber.slice(1, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(
    7,
    9,
  )} ${phoneNumber.slice(9, 11)}`;
};
