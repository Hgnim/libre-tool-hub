import {type Ref} from "vue";
import {getCurrentLocale, getFallbackLocale} from "@/utils/i18nUtils.ts";
import {appendixMd_get, explanationJson_get} from "@/views/tools/ts/assets.ts";
import {marked} from "marked";
import explanationJsonFileGet from "@/views/tools/ts/explanationJsonFileGet.ts";
import appendixMdFileGet from "@/views/tools/ts/appendixMdFileGet.ts";
import {isDev} from "@/ts/env/packMode.ts";
import allToolsJsonFileGet from "@/views/tools/ts/allToolsJsonFileGet.ts";
import type {AllTools_Tool} from "@/views/tools/json/type/allTools.type.ts";

export default function (
    appendix:Ref<HTMLElement|null>,
    toolId:string,
){
    const appendixMd=appendixMd_get();
    const explanationJson=explanationJson_get();
    async function doLoad(){
        if(appendix.value) {
            appendix.value.innerHTML = marked.parse(
                (await (async (): Promise<string> => {
                    try {
                        const allTools = (await allToolsJsonFileGet()).content!;
                        const tryLocale: string[] = [
                            ...[getCurrentLocale()],//当前语言
                            ...getFallbackLocale(true),//如果当前语言对应的文件未找到，则寻找回退语言
                        ]
                        let outputMd: string = '';
                        for (let i = 0; i < tryLocale.length; i++) {
                            const res = await explanationJsonFileGet(
                                ((allTools.allTools as any)[toolId]! as AllTools_Tool).path.explanationJson
                                    .replace('{lang}',tryLocale[i] as string),
                                explanationJson
                            );
                            if (res.code == 0) {
                                const resJson = res.content!;
                                outputMd = `${resJson.title.md}\n${resJson.description.md}\n`;
                                break;
                            }
                        }
                        for (let i = 0; i < tryLocale.length; i++) {
                            const res = await appendixMdFileGet(
                                ((allTools.allTools as any)[toolId]! as AllTools_Tool).path.appendixMd
                                    .replace('{lang}',tryLocale[i] as string),
                                appendixMd
                            );
                            if (res.code == 0) {
                                outputMd += res.content!;
                                break;
                            }
                        }
                        return outputMd;
                    } catch (err) {
                        if (isDev)
                            console.error('[appendixLoader.ts] 发生错误：', err);
                        return '**X**';
                    }
                })()).toString()
            ) as string;
        }
    }

    return {doLoad};
}