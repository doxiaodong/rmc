const shell = require('shelljs');

const $BRANCH = process.env.BRANCH;

try {
  shell.exec('git config --global user.name "circle-bot"');
  shell.exec('git config --global user.email "duxiaodong@darlin.me"');

  shell.exec('git rev-parse --abbrev-ref HEAD');

  if ($BRANCH === 'alpha') {
    shell.exec('npm run pub:alpha');
    shell.echo('Publish alpha success!!');
  } else {
    shell.exec('npm run pub');
    shell.echo('Publish success!!');
  }
} catch (error) {
  console.error('Publish error', error);
  process.exit(1);
}
