import { Service } from 'typedi';
import * as fs from 'fs';
import { PackageJson } from '../models/PackageJson';
import { GenerateRequest } from '../models/GenerateRequest';

@Service()
export default class GeneratorService {
  public languageExtensions = { typescript: 'ts', javascript: 'js' };

  public async generateNodeApp(generateRequest: GenerateRequest): Promise<string> {
    fs.writeFileSync(
      'resources/app-base/app.' + this.getLanguageExtension(generateRequest.language),
      '',
    );
    this.buildPackageJson(generateRequest);
    return 'resources/sample.zip';
  }

  private getLanguageExtension(language: string): string {
    return this.languageExtensions[language];
  }

  private buildPackageJson(generateRequest: GenerateRequest): void {
    const packageJsonFile = fs.readFileSync('resources/app-base/package.json', 'utf8');
    const packageJson: PackageJson = JSON.parse(packageJsonFile);
    this.setScripts(packageJson, generateRequest);
    this.addDevDependencies(generateRequest.dependencies, packageJson);
    this.configureTypeScript(generateRequest, packageJson);
  }

  private setScripts(packageJson: PackageJson, generateRequest: GenerateRequest): void {
    packageJson.scripts['start'] =
      'node app.' + this.getLanguageExtension(generateRequest.language);
  }

  private addDevDependencies(
    dependencies: [{ name: string; version: string }],
    packageJson: PackageJson,
  ): void {
    dependencies.forEach((dependency) => {
      packageJson.devDependencies[dependency.name] = dependency.version;
    });
  }

  private configureTypeScript(generateRequest: GenerateRequest, packageJson: PackageJson): void {}
}
