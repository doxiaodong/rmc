const shell = require('shelljs');

const $CIRCLE_TAG = process.env.CIRCLE_TAG;

// CIRCLE_TAG release: rmc-pull-to-refresh@2.0.0 or release: rmc-pull-to-refresh@2.0.0-beta.1

try {
  const module = $CIRCLE_TAG.match(/(?<=release: *?)\S+(?=@\d\.\d\.\d)/)[0];
  const version = $CIRCLE_TAG.match(/(?<=@)\d\.\d\.\d\S*/)[0];

  shell.cd(`packages/${module}`);
  shell.exec('pwd');
  shell.exec(`npm version ${version}`);
  shell.exec('git status');
  shell.exec('git add -A');
  shell.exec(`git commit -am"${$CIRCLE_TAG} [skip ci]"`);

  if (/beta/.test(version)) {
    shell.exec('npm run pub:beta');
  } else {
    shell.exec('npm run pub');
  }

  shell.echo('Publish success!!');
} catch (error) {
  process.exit(1);
}
