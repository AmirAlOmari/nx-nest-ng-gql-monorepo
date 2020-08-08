const { getCommitSBetweenRevs } = require('./lib/get-commits-between-revs');
const { findBaseAffectsByProject } = require('./lib/find-base-affects-project');
const {
  fetchExistingDockerTagsForProject,
} = require('./lib/fetch-existing-docker-tags-for-project');

async function run(newerRev, project) {
  const {
    baseAffects,
    baseAffectsIndex,
    gitError,
    nxError,
  } = findBaseAffectsByProject(project, newerRev);
  let commitToReTag = '';

  if (gitError || nxError) {
    console.error('gitError:', gitError);
    console.error('nxError:', nxError);

    return (process.exitCode = 1);
  }

  if (baseAffects) {
    const { commits } = getCommitSBetweenRevs(
      `HEAD~${baseAffectsIndex + 1}`,
      newerRev
    );
    const { commitTags } = await fetchExistingDockerTagsForProject(project);

    const mappedCommits = commits.map((commit) => commit.slice(0, 7));

    if (process.env.LINKEDOUT_DEBUG) {
      console.log(
        JSON.stringify(
          {
            baseAffects,
            baseAffectsIndex,
            'commits.length': commits.length,
            // commits,
            mappedCommits,
          },
          0,
          2
        )
      );
    }

    const commitTag = commitTags.find((commitTag) =>
      mappedCommits.some((commit) => commitTag.includes(commit))
    );

    if (commitTag) {
      commitToReTag = commitTag;
    }
  }

  const result = commitToReTag;

  console.log(result || '');
}

// ---

const args = process.argv.slice(2);
const {
  LINKEDOUT_NEWER_REV = 'HEAD',
  LINKEDOUT_PROJECT = 'api',
  LINKEDOUT_GITLAB_USERNAME,
  LINKEDOUT_GITLAB_PASSWORD,
} = process.env;

if (!LINKEDOUT_GITLAB_USERNAME || !LINKEDOUT_GITLAB_PASSWORD) {
  console.error(
    'There is no ${LINKEDOUT_GITLAB_USERNAME} or ${LINKEDOUT_GITLAB_PASSWORD}'
  );

  return (process.exitCode = 1);
}

const [newerRev = LINKEDOUT_NEWER_REV, project = LINKEDOUT_PROJECT] = args;

try {
  run(newerRev, project);
} catch (error) {
  console.error(error);
}
