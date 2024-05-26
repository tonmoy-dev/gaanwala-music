export const createJSONResponse = (
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
