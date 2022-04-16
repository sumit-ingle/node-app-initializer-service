import { Service } from 'typedi';
import * as fs from 'fs';
import { PackageJson } from '../models/PackageJson';
import { GenerateRequest } from '../models/GenerateRequest';
import { languageExtensions } from '../constants/languageExtensions';
import { dependencyHandlers } from './handlers/dependencyHandlers';
import AdmZip from 'adm-zip';

@Service()
export default class GeneratorService {
  public async generateNodeApp(generateRequest: GenerateRequest): Promise<string> {
    fs.writeFileSync(
      'resources/app/app.' + this.getLanguageExtension(generateRequest.language),
      '',
    );
    this.buildPackageJson(generateRequest);
    this.buildZipFile();
    return 'resources/sample.zip';
  }

  private buildZipFile(): void {
    const outputFile = 'resources/sample.zip';
    const zip = new AdmZip();
    zip.addLocalFolder('resources/app', 'app');
    zip.writeZip(outputFile);
  }

  private getLanguageExtension(language: string): string {
    return languageExtensions[language];
  }

  private buildPackageJson(generateRequest: GenerateRequest): void {
    const packageJsonFile = fs.readFileSync('resources/app-base/package.json', 'utf8');
    const packageJson: PackageJson = JSON.parse(packageJsonFile);
    this.setMetadata(packageJson, generateRequest);
    this.setScripts(packageJson, generateRequest);
    this.addDevDependencies(generateRequest.dependencies, packageJson);
    fs.writeFileSync('resources/app/package.json', JSON.stringify(packageJson, undefined, '\t'));
  }

  private setMetadata(packageJson: PackageJson, generateRequest: GenerateRequest): void {
    packageJson.name = generateRequest.name;
    packageJson.description = generateRequest.description;
    packageJson.author = generateRequest.author;
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
      dependencyHandlers.eslint(dependency, packageJson);
    });
  }
}
