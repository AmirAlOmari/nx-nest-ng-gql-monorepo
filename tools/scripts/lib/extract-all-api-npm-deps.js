const { execSync } = require('child_process');

const packageNamesToIgnoreDefault = ['@nestjs/testing'];

/**
 *
 * @param {string[] | undefined} packageNamesToIgnore
 *
 * @returns {any[]}
 */
function extractAllApiNpmDeps(
  packageNamesToIgnore = packageNamesToIgnoreDefault
) {
  const outputRaw = execSync(
    'yarn run nx print-affected --select projectGraph.dependencies --head HEAD --base HEAD'
  );

  let script = outputRaw.toString();
  script = `a_${Math.random()
    .toString()
    .replace('0.', '')}  = ${outputRaw.toString()}`;

  const output = eval(script);

  // ---

  const allApiNpmDeps = output.api
    .filter((d) => d.target.startsWith('npm:'))
    .filter(
      (d) => !packageNamesToIgnore.some((pnto) => d.target.includes(pnto))
    );

  return allApiNpmDeps;
}

module.exports = { extractAllApiNpmDeps };
