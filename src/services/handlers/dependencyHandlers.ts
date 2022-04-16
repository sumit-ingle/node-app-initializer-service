import { PackageJson } from '../../models/PackageJson';

export const dependencyHandlers = {
  eslint: (dependency: { name: string; version: string }, packageJson: PackageJson) => {
    if (dependency.name === 'eslint') {
      packageJson['scripts']['lint'] = 'eslint . --ext .js,.ts';
    }
  },
};
