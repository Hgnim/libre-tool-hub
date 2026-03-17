import {isDev} from "@/ts/env/packMode.ts";

export default async function (
    path:string,
    appendixMd:Record<string, string>
)
:Promise<{
    code:number,//成功后返回0，失败后返回1
    content?:string,
    statusCode:number,
}> {
    const res = await fetch(appendixMd[path] as string);

    const contentType: string = res.headers.get('content-type') || '';
    if (res.ok &&
        (
            //添加内容类型判断，避免未匹配到目标时返回index.html导致fetch误以为请求成功
            contentType.includes('text/plain') ||
            contentType.includes('text/markdown')
        )
    ) {
        if (isDev) console.debug(`[appendixMdFileGet.ts] “${path}”已加载`);
        return {
            code:0,
            content: await res.text(),
            statusCode: res.status,
        };
    }else{
        if(isDev) console.error(`[appendixMdFileGet.ts] “${path}”请求失败`);
        return {
            code:1,
            statusCode: res.status,
        };
    }
}