export type GenerateRequest = {
  name: string;
  description: string;
  author: string;
  nodeVersion: string;
  language: string;
  dependencies: [
    {
      name: string;
      version: string;
    },
  ];
};
