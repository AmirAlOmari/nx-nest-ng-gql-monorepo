const { execSync } = require('child_process');

function getCommitSBetweenRevs(olderRev, newerRev) {
  const outputRaw = execSync(
    `git rev-list ${olderRev}..${newerRev}`
  ).toString();
  const splitted = outputRaw.split('\n');
  splitted.pop();

  const commits = splitted;

  return { commits };
}

module.exports = { getCommitSBetweenRevs };
