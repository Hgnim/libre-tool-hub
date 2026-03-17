import {json_get} from "@/views/tools/ts/assets.ts";
import {isDev} from "@/ts/env/packMode.ts";
import type {AllTools} from "@/views/tools/json/type/allTools.type.ts";

export default async function ()
    :Promise<{
    code:number,//成功后返回0，失败后返回1
    content?:AllTools,
    statusCode:number,
}>{
    const toolsJson=json_get();
    const path='/src/views/tools/json/allTools.json';

    const res = await fetch(toolsJson[path] as string);
    const contentType:string = res.headers.get('content-type')||'';
    if (res.ok &&
        (
            //添加内容类型判断，避免未匹配到目标时返回index.html导致fetch误以为请求成功
            contentType.includes('application/json')
        )
    ) {
        if (isDev) console.debug(`[allToolsJsonFileGet.ts] “${path}”已加载`);
        return {
            code:0,
            content:await res.json(),
            statusCode:res.status,
        };
    }
    else {
        if (isDev) console.error(`[allToolsJsonFileGet.ts] “${path}”请求失败`);
        return {
            code:1,
            statusCode:res.status,
        };
    }
}