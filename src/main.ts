import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { DefaultHandlerFunction, DefaultHandlerFunctionProps } from '.';

export interface HelloFunctionProps extends DefaultHandlerFunctionProps {}

export class HelloFunction extends cdk.Construct {
  readonly handler: lambda.Function;
  constructor(scope: cdk.Construct, id: string, props: HelloFunctionProps = {}) {
    super(scope, id);
    this.handler = new DefaultHandlerFunction(this, 'DefaultFunc', props);
  }
}

export class HelloRestApiService extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    new apigateway.LambdaRestApi(this, 'API', {
      handler: new HelloFunction(this, 'Func').handler,
    });
  }
}