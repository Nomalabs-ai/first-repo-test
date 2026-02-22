exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: `
      <!DOCTYPE html>
      <html>
        <head><title>Hello World</title></head>
        <body>
          <h1>Hello, World!</h1>
          <p>Running on AWS Lambda 🚀</p>
        </body>
      </html>
    `
  };
};
