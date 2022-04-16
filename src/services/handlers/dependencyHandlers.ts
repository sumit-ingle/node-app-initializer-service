import { PackageJson } from '../../models/PackageJson';
import fs from 'fs';

export const dependencyHandlers = {
  eslint: (dependency: { name: string }, packageJson: PackageJson) => {
    if (dependency.name === 'eslint') {
      packageJson['scripts']['lint'] = 'eslint . --ext .js,.ts';
      fs.copyFileSync('resources/app-base/.eslintrc.json', 'resources/app/.eslintrc.json');
    }
  },
  jest: (dependency: { name: string }, packageJson: PackageJson) => {
    if (dependency.name === 'jest') {
      packageJson['scripts']['test'] = 'jest --coverage';
      packageJson['scripts']['test:watch'] = 'jest --watch';
    }
  },
};
