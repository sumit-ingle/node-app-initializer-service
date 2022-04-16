import axios from 'axios';
import { supportedPackages } from '../constants/suuported-packages';
import { parseCompatibleNodeVersion } from './parser';

export type npmPackagesResponse = {
    name: string;
    version: string;
};

export const fetchNpmPackageDetails = async (name: string) => {
    const npmRegistryUrl = `https://registry.npmjs.org/${name}`;
    console.log('npmRegistryUrl', npmRegistryUrl);
    return axios.get(npmRegistryUrl);
};

export async function getNpmPackages(nodeVersion: string): Promise<npmPackagesResponse[]> {
    const packages = Promise.all(supportedPackages
        .map((supportedPackage) => fetchNpmPackageDetails(supportedPackage)))
        .then(responses => {
            return responses.map(
                (res) => parseCompatibleNodeVersion(res.data, nodeVersion),
            );
        });

    return packages;
}
