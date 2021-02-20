import path from 'path';
import yargs from 'yargs';
import {
  readConfigFile,
  readSpecificConfigFile,
} from './config/readConfigFile';
import multiplerun from './index';

export async function run() {
  const { _, cwd = process.cwd() } = yargs(process.argv.slice(2))
    .usage('Usage: $0 [file] <command>')
    .option('cwd', { type: 'string' }).argv;

  const [options, commands] =
    _.length === 1
      ? await readConfigFile({ cwd })
      : await readSpecificConfigFile(path.resolve(cwd, _[0].toString()));

  const command = _.length === 1 ? _[0] : _[1];

  if (command in commands) {
    multiplerun(commands[command], options);
  } else {
    throw new Error(`Undefined command "${command}"`);
  }
}
