import type { PackageJson, TsConfigJson } from 'type-fest';
declare let projectRoot: string | undefined;
declare let pkg: PackageJson | undefined;
declare let tsConfig: TsConfigJson | undefined;
export declare const getUserFiles: () => {
    pkg: PackageJson;
    projectRoot: string;
    tsConfig: TsConfigJson;
};
export {};
//# sourceMappingURL=user-files.d.ts.map