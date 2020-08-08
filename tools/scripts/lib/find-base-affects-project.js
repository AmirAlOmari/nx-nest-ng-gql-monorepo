const { execSync } = require('child_process');

function getAffectedProjectsByBase(base, head = 'HEAD') {
  const outputRaw = execSync(
    `yarn run --silent nx print-affected --select projects --head ${head} --base ${base}`
  ).toString();
  const splitted = outputRaw
    .replace(/\n/g, '')
    .split(', ')
    .filter((e) => e);
  const projects = splitted;

  return { projects };
}

function doesBaseAffectProject(base, head, project) {
  const { projects } = getAffectedProjectsByBase(base, head);
  const doesBaseAffectProject = projects.includes(project);

  return doesBaseAffectProject;
}

function findBaseAffectsByCommitsAndProject(commits, project) {
  const baseAffectsIndex = commits.findIndex((commit) =>
    doesBaseAffectProject(commit, 'HEAD', project)
  );
  const baseAffects =
    baseAffectsIndex !== -1 ? commits[baseAffectsIndex] : undefined;

  return { baseAffectsIndex, baseAffects };
}

function findBaseAffectsByProject(project, startRev) {
  let baseAffects = null;
  let gitError = null;
  let nxError = null;

  let baseAffectsIndex = 1;
  let commits = {};

  while (!baseAffects && !gitError && !nxError) {
    let commitSha = null;

    try {
      const outputRaw = execSync(
        `git log -n 1 HEAD~${baseAffectsIndex} --format="%h"`
      ).toString();

      commitSha = outputRaw.trim();
      commits[baseAffectsIndex] = commitSha;
    } catch (error) {
      gitError = error;
      break;
    }

    try {
      const commitAffects = doesBaseAffectProject(commitSha, startRev, project);

      if (commitAffects) {
        // baseAffects = commitSha;
        baseAffects = commits[baseAffectsIndex - 1];
        break;
      }
    } catch (error) {
      nxError = error;
      break;
    }

    baseAffectsIndex++;
  }

  if (!baseAffects) {
    baseAffectsIndex = -1;
  } else {
    baseAffectsIndex--;
  }

  return { baseAffects, baseAffectsIndex, gitError, nxError };
}

module.exports = {
  findBaseAffectsByCommitsAndProject,
  findBaseAffectsByProject,
};
