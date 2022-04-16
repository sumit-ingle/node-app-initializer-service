export type PackageJson = {
  name: string;
  version: string;
  description: string;
  type: string;
  scripts: Map<string, string>;
  author: string;
  license: string;
  dependencies: Map<string, string>;
  devDependencies: Map<string, string>;
};
