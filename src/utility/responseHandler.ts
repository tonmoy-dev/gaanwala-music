export const responseHandler = (
  isSuccess: boolean,
  message: string,
  statusCode: number
) => {
  return Response.json(
    {
      success: isSuccess,
      message: message,
    },
    {
      status: statusCode,
    }
  );
};
