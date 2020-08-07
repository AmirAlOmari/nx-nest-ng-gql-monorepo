const currentPackageJson = require('../../package.json');
const currentPackageJsoScripts = currentPackageJson.scripts;

const dependencyRegexesToRemove = [/angular/, /nrwl/, /ngrx/, /\@types/];

const filteredDependencies = Object.fromEntries(
  Object.entries(currentPackageJson.dependencies).filter(
    ([key]) => !dependencyRegexesToRemove.some((drtr) => drtr.test(key))
  )
);

const newPackageJson = {
  ...currentPackageJson,
  scripts: {
    ...currentPackageJsoScripts,
    // TODO: should we?
    // postinstall: 'node ./decorate-angular-cli.js',
    postinstall: undefined,
  },
  dependencies: {
    ...filteredDependencies,
  },
};

console.log(JSON.stringify(newPackageJson, 0, 2));
