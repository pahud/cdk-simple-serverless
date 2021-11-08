import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import { HelloFunction, HelloRestApiService } from '../lib';

let app: cdk.App;
let stack: cdk.Stack;

beforeEach(() => {
  app = new cdk.App();
  stack = new cdk.Stack(app, 'demo-stack');
});

test('create a default hello function', () => {
  // GIVEN
  // WHEN
  new HelloFunction(stack, 'Func');
  // match snapshot
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  // we should have a function
  expect(stack).toHaveResource('AWS::Lambda::Function');
});

test('create a default api service', () => {
  // GIVEN
  // WHEN
  new HelloRestApiService(stack, 'Service');
  // match snapshot
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  // we should have a api service
  expect(stack).toHaveResource('AWS::ApiGateway::RestApi');
});