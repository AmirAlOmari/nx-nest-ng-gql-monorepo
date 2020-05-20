import * as fs from 'fs';
import * as path from 'path';

export const resolverFileNameRegex = /(.*).resolver.ts/;
export const resolverClasNameRegex = /(.*)Resolver$/;

type ResolverType = any; // TODO find needed class type

function _findResolversRec(
  currentDirPath: string,
  foundResolvers: ResolverType[]
) {
  const entries = fs.readdirSync(currentDirPath);

  entries.forEach(entry => {
    const entryPath = path.join(currentDirPath, entry);
    const entryStat = fs.statSync(entryPath);

    if (entryStat.isDirectory()) {
      return _findResolversRec(entryPath, foundResolvers);
    }

    const isResolverFile = entry.match(resolverFileNameRegex);

    if (!isResolverFile) {
      return;
    }

    const moduleExportMap = require(entryPath);

    if (moduleExportMap && typeof moduleExportMap === 'object') {
      const exportedResolvers = Object.entries(moduleExportMap).reduce(
        (acc, [moduleExportItemName, moduleExportItem]) => {
          const isResolverClas = moduleExportItemName.match(
            resolverClasNameRegex
          );

          if (isResolverClas) {
            acc.push(moduleExportItem);
          }

          return acc;
        },
        []
      );

      foundResolvers.push(...exportedResolvers);
    }
  });

  return foundResolvers;
}

export function findAllResolvers() {
  const foundResolvers = _findResolversRec(path.join(__dirname, './app'), []);

  return foundResolvers;
}
