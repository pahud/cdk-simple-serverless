import {
  aws_apigateway as apigateway,
  aws_lambda as lambda,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DefaultHandlerFunction, DefaultHandlerFunctionProps } from '.';

export interface HelloFunctionProps extends DefaultHandlerFunctionProps {}

export class HelloFunction extends Construct {
  readonly handler: lambda.Function;
  constructor(scope: Construct, id: string, props: HelloFunctionProps = {}) {
    super(scope, id);
    this.handler = new DefaultHandlerFunction(this, 'DefaultFunc', props);
  }
}

export class HelloRestApiService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new apigateway.LambdaRestApi(this, 'API', {
      handler: new HelloFunction(this, 'Func').handler,
    });
  }
}