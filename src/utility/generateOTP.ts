export default function generateOTP() {
  const randomNumber: number = Math.random();
  const otp: string = Math.floor(randomNumber * 1000000)
    .toString()
    .padStart(6, "0");
  return otp;
}
