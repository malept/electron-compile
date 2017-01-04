import fs from 'fs-promise';
import path from 'path';

import cli from './cli';

export default async(buildPath, _electronVersion, _pPlatform, _pArch, done) => {
  for (const entry of await fs.readdir(buildPath)) {
    if (!entry.match(/^(node_modules|bower_components)$/)) {
      const fullPath = path.join(buildPath, entry);

      if ((await fs.stat(fullPath)).isDirectory()) {
        const log = console.log;
        console.log = () => {};
        await cli.main(buildPath, [fullPath]);
        console.log = log;
      }
    }
  }

  const packageJSONPath = path.resolve(buildPath, 'package.json');
  const packageJSON = JSON.parse(await fs.readFile(packageJSONPath, 'utf8'));

  const index = packageJSON.main || 'index.js';
  packageJSON.originalMain = index;
  packageJSON.main = 'es6-shim.js';

  await fs.copy(
    path.join(path.resolve(__dirname, 'es6-shim.js')),
    path.join(buildPath, 'es6-shim.js'));

  await fs.writeFile(packageJSONPath, JSON.stringify(packageJSON, null, 2));

  done();
};
