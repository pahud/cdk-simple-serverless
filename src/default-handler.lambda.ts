exports.handler = async () => {
  let response = {
    statusCode: 200,
    body: 'Hello CDK!\r\n',
  };
  console.log(response);
  return response;
};