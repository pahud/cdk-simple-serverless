const { AwsCdkConstructLibrary, DevEnvironmentDockerImage, Gitpod, JsonFile } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  author: 'Pahud Hsieh',
  authorAddress: 'pahudnet@gmail.com',
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  name: 'cdk-simple-serverless',
  repositoryUrl: 'https://github.com/pahud/cdk-simple-serverless.git',
  cdkDependencies: [
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/core',
  ],
  devDeps: [
    'aws-cdk',
    'ts-node',
    'esbuild',
  ],
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['pahud'],
  },
});

const gitpodPrebuild = project.addTask('gitpod:prebuild', {
  description: 'Prebuild setup for Gitpod',
});
// install and compile only, do not test or package.
gitpodPrebuild.exec('yarn install --frozen-lockfile --check-files');
gitpodPrebuild.exec('npx projen compile');

let gitpod = new Gitpod(project, {
  dockerImage: DevEnvironmentDockerImage.fromImage('public.ecr.aws/pahudnet/gitpod-workspace:latest'),
  prebuilds: {
    addCheck: true,
    addBadge: true,
    addLabel: true,
    branches: true,
    pullRequests: true,
    pullRequestsFromForks: true,
  },
});

gitpod.addCustomTask({
  init: 'yarn gitpod:prebuild',
  // always upgrade after init
  command: 'npx projen upgrade',
});

gitpod.addVscodeExtensions(
  // 'dbaeumer.vscode-eslint',
  'https://github.com/microsoft/vscode-eslint/releases/download/release%2F2.2.20-Insider/vscode-eslint-2.2.0.vsix',
  'ms-azuretools.vscode-docker',
);

project.package.addField('resolutions', {
  'pac-resolver': '^5.0.0',
});

new JsonFile(project, 'cdk.json', {
  obj: {
    app: 'npx ts-node --prefer-ts-exts src/integ.default.ts',
  },
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log', 'dependabot.yml'];
project.npmignore.exclude(...common_exclude, 'images', 'docs', 'website');
project.gitignore.exclude(...common_exclude);

project.synth();