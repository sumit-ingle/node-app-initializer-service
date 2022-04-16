import { Service } from 'typedi';

@Service()
export default class GeneratorService {
  public async generateNodeApp(generateRequest: GenerateRequest): Promise<string> {
    return 'resources/sample.zip';
  }
}
