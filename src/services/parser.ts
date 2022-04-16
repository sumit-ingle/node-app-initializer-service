export function parseCompatibleNodeVersion(jsonData: any, nodeVersion: string): any  {
    console.log('json data', jsonData);
    const versionDetails = Object.values(jsonData.versions);
    return versionDetails.filter(obj => {
        return obj._nodeVersion >= nodeVersion;
    }).map(obj => {
        return {name: obj.name, version: obj.version};
    }).reduce((prev, curr) => {
        return curr.version >= prev.version ? curr : prev;
    });
}
