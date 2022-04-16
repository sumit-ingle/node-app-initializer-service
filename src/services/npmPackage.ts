export type npmPackagesResponse = {
    name: string;
    version: string;
};

export function getNpmPackages(nodeVersion: string): npmPackagesResponse[] {
    return [
        {
            name: 'jest',
            version: '27.5.1',
        },
        {
            name: 'eslint',
            version: '8.13.0',
        },
    ];
}
