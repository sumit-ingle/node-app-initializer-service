import axios from 'axios';
import { supportedPackages } from '../constants/suuported-packages';
import { parseCompatibleNodeVersion } from './parser';

export type npmPackagesResponse = {
    name: string;
    version: string;
};

export const fetchNpmPackageDetails = (name: string) => {
    const npmRegistryUrl = 'https://registry.npmjs.org/';
    return axios.get(`${npmRegistryUrl}\\name`);
};

export function getNpmPackages(nodeVersion: string): npmPackagesResponse[] {
    const response = supportedPackages
        .map(async (supportedPackage) => await fetchNpmPackageDetails(supportedPackage));

    return [];
}
