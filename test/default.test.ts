import * as cdk from 'aws-cdk-lib';
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
  const t = cdk.assertions.Template.fromStack(stack);
  expect(t).toMatchSnapshot();
  // we should have a function
  t.resourceCountIs('AWS::Lambda::Function', 1);
});

test('create a default api service', () => {
  // GIVEN
  // WHEN
  new HelloRestApiService(stack, 'Service');
  // match snapshot
  const t = cdk.assertions.Template.fromStack(stack);
  expect(t).toMatchSnapshot();
  // we should have a api service
  t.resourceCountIs('AWS::ApiGateway::RestApi', 1);
});