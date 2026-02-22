# first-repo-test

A simple Hello World Node.js app deployed as an AWS Lambda function behind API Gateway.

## Live URL

https://djncqu43o8.execute-api.us-east-2.amazonaws.com/

## Deploy

```bash
zip function.zip index.js
aws lambda update-function-code --function-name hello-world-node --zip-file fileb://function.zip
```
