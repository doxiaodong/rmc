const shell = require('shelljs');

const $CIRCLE_TAG = process.env.CIRCLE_TAG;

// CIRCLE_TAG rmc-pull-to-refresh@2.0.0 or rmc-pull-to-refresh@2.0.0-beta.1

try {
  const module = $CIRCLE_TAG.match(
    /\S+(?=@\d+(\.\d+){2}(-(alpha|beta)(\.\d+)?)?$)/,
  )[0];
  const version = $CIRCLE_TAG.match(
    /(?<=@)\d+(\.\d+){2}(-(alpha|beta)(\.\d+)?)?$/,
  )[0];

  console.log(module, version);

  shell.cd(`packages/${module}`);
  shell.pwd();

  shell.exec(`npm version ${version}`);
  shell.exec('git status');
  shell.exec('git add -A');
  shell.exec(`git commit -am"${$CIRCLE_TAG} [skip ci]"`);
  shell.exec('git status');

  if (/beta/.test(version)) {
    shell.exec(`npm publish --tag beta`);
  } else if (/alpha/.test(version)) {
    shell.exec(`npm publish --tag alpha`);
  } else {
    shell.exec('npm publish');
  }

  shell.cd('../../');
  shell.pwd();

  shell.echo('Publish success!!');
} catch (error) {
  console.error('Publish error', error);
  process.exit(1);
}
