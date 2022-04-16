import * as fs from 'fs';
import {npmPackagesResponse} from './npmPackage';

export function parseCompatibleNodeVersion(jsonData: any, nodeVersion: string): any  {
    const versionDetails = Object.values(jsonData.versions);
    return versionDetails.filter(obj => {
        return obj._nodeVersion >= '12.14.1';
    }).map(obj => {
        return {name: obj.name, version: obj.version};
    }).reduce((prev, curr) => {
        console.log(prev.version)
        return curr.version >= prev.version ? curr : prev;
    });
}
