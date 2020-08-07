'use strict';

const customConfig = {
  tagPrefix: '',
  releaseCommitMessageFormat: 'chore(release): {{currentTag}} :tada:',
  types: [
    { type: 'feat', section: 'Features' },
    { type: 'fix', section: 'Bug Fixes' },
    { type: 'docs', section: 'Docs' },
    { type: 'style', section: 'Style' },
    { type: 'refactor', section: 'Refactor' },
    { type: 'perf', section: 'Perf' },
    { type: 'test', section: 'Tests' },
    { type: 'build', section: 'Build' },
    { type: 'ci', section: 'CI/CD' },
    { type: 'chore', section: 'Others' },
    { type: 'revert', section: 'Reverts' },
  ],
};

module.exports = customConfig;
