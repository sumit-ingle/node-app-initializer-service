import { PackageJson } from '../../models/PackageJson';

export const dependencyHandlers = {
  eslint: (dependency: { name: string }, packageJson: PackageJson) => {
    if (dependency.name === 'eslint') {
      packageJson['scripts']['lint'] = 'eslint . --ext .js,.ts';
    }
  },
  jest: (dependency: { name: string }, packageJson: PackageJson) => {
    if (dependency.name === 'jest') {
      packageJson['scripts']['test'] = 'jest --coverage';
      packageJson['scripts']['test:watch'] = 'jest --watch';
    }
  },
};
