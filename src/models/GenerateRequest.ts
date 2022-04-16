interface GenerateRequest {
  nodeVersion: string;
  language: string;
  dependencies: {
    name: string;
    version: string;
  };
}
