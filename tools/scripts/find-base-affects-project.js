const { findBaseAffectsByProject } = require('./lib/find-base-affects-project');

function run(newerRev, project) {
  const {
    baseAffects,
    baseAffectsIndex,
    gitError,
    nxError,
  } = findBaseAffectsByProject(project, newerRev);

  if (process.env.LINKEDOUT_DEBUG) {
    console.log(
      JSON.stringify(
        {
          baseAffects,
          baseAffectsIndex,
          gitError,
          nxError,
        },
        0,
        2
      )
    );
  }

  if (gitError || nxError) {
    console.error('gitError:', gitError);
    console.error('nxError:', nxError);

    return (process.exitCode = 1);
  }

  const result = baseAffects;

  console.log(result || '');
}

// ---

const args = process.argv.slice(2);
const { LINKEDOUT_NEWER_REV = 'HEAD', LINKEDOUT_PROJECT = 'api' } = process.env;

const [newerRev = LINKEDOUT_NEWER_REV, project = LINKEDOUT_PROJECT] = args;
run(newerRev, project);
