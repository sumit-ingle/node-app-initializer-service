import { Service } from 'typedi';
import * as fs from 'fs';
import { PackageJson } from '../models/PackageJson';
import { GenerateRequest } from '../models/GenerateRequest';

@Service()
export default class GeneratorService {
  public async generateNodeApp(generateRequest: GenerateRequest): Promise<string> {
    const packageJsonFile = fs.readFileSync('../../resources/app-base/package.json', 'utf8');
    const packageJson: PackageJson = JSON.parse(packageJsonFile);
    this.addDependencies(generateRequest.dependencies, packageJson);
      return 'resources/sample.zip';
  }

  private addDependencies(
    dependencies: [{ name: string; version: string }],
    packageJson: PackageJson,
  ): void {
    dependencies.forEach((dependency) => {
      packageJson.dependencies.set(dependency.name, dependency.version);
    });
  }

  // private addDependency(dependency) {}
}
