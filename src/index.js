import * as configParser from './config-parser';

import CompilerHost from './compiler-host';
import FileChangedCache from './file-change-cache';
import CompileCache from './compile-cache';
import packagerCompileHook from './packager-hook';

module.exports = Object.assign({},
  configParser,
  { CompilerHost, FileChangedCache, CompileCache, packagerCompileHook }
);
