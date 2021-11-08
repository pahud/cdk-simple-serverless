import * as cdk from '@aws-cdk/core';
import { HelloFunction, HelloRestApiService } from '.';

const app = new cdk.App();

const env = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};

const stack = new cdk.Stack(app, 'serverless-simple-demo-stack', { env });

new HelloFunction(stack, 'HelloFunc');
new HelloRestApiService(stack, 'HelloRestApiService');