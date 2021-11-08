# cdk-simple-serverless

Tiny serverless constructs wih all optional construct properties to keep it as simple as possible for demo out-of-the-box.

## HelloFunction

AWS Lambda function that returns `"Hello CDK!"` only.

```ts
import { HelloFunction } from 'cdk-simple-serverless'

new HelloFunction(stack, 'Function')
```

## HelloRestApiService

Amazon API Gateway REST API service that returns `"Hello CDK!"` only in the HTTP response.

```ts
import { HelloRestApiService } from 'cdk-simple-serverless'

new HelloRestApiService(stack, 'Service')
```


