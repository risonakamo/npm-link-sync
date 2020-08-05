#!/usr/bin/env node
import execa from "execa";
import intersection from "lodash.intersection";

async function main():Promise<void>
{
    var localPackages:string[]=await getPackages(true);

    if (!localPackages.length)
    {
        console.log("local packages empty, sync impossible");
        return;
    }

    var globalPackages:string[]=await getPackages();

    if (!globalPackages.length)
    {
        console.log("global packages empty, sync impossible");
        return;
    }

    console.log(intersection(globalPackages,localPackages).join(" "));
}

// return array of install packages, globally or in the current folder.
async function getPackages(local?:boolean):Promise<string[]>
{
    var npmlsArgs:string[]=["ls","-g","--depth","0","--json"];

    if (local)
    {
        npmlsArgs.splice(1,1);
    }

    var {stdout}=await execa("npm",npmlsArgs);

    if (!stdout)
    {
        console.log("npm ls command failed");
        return [];
    }

    var npmResult:NpmLsResult=JSON.parse(stdout);

    if (!npmResult.dependencies)
    {
        console.log("npm ls result empty");
        return [];
    }

    return Object.keys(npmResult.dependencies);
}

main();