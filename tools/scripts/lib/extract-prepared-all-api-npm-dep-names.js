const { extractAllApiNpmDeps } = require('./extract-all-api-npm-deps');

/**
 *
 * @param {string[] | undefined} packageNamesToIgnore
 */
function extractPreparedAllApiNpmDepNames(packageNamesToIgnore) {
  const allApiNpmDeps = extractAllApiNpmDeps(packageNamesToIgnore);
  const allApiNpmDepNames = allApiNpmDeps.map((d) => d.target);
  const preparedAllApiNpmDepNames = allApiNpmDepNames.map((dname) =>
    dname.replace('npm:', '')
  );

  return preparedAllApiNpmDepNames;
}

module.exports = { extractPreparedAllApiNpmDepNames };
