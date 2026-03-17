import {isDev} from "@/ts/env/packMode.ts";

export default async function (
    path:string,
    explanationJson:Record<string, string>
)
:Promise<{
    code:number,//成功后返回0，失败后返回1
    content?:any,
    statusCode:number,
}> {
    const res = await fetch(explanationJson[path] as string);

    const contentType:string = res.headers.get('content-type')||'';
    if (res.ok &&
        (
            //添加内容类型判断，避免未匹配到目标时返回index.html导致fetch误以为请求成功
            contentType.includes('application/json')
        )
    ) {
        if (isDev) console.debug(`[explanationJsonFileGet.ts] “${path}”已加载`);
        return {
            code:0,
            content:await res.json(),
            statusCode:res.status,
        };
    }
    else {
        if (isDev) console.error(`[explanationJsonFileGet.ts] “${path}”请求失败`);
        return {
            code:1,
            statusCode:res.status,
        };
    }
}