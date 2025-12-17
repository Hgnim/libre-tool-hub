import type { WritableComputedRef } from 'vue'
import {clearLocale, i18n, loadLocale} from "@/plugins/i18n.ts";

/**
 * 切换语言
 * @param locale 语言名
 * @param viewName 当不留空和不为null时，根据其值调用viewAutoLoadLocale函数
 */
export async function switchLocale(locale: string,viewName:string|null = null) {
    if ((i18n.global.locale as WritableComputedRef<string>).value === locale) return

    (i18n.global.locale as WritableComputedRef<string>).value = locale

    if (viewName)
        await viewAutoLoadLocale(viewName);
}

/**
 * 自动加载页面语言
 * @param viewName 页面名称，名称对应locales/xxx.zh-CN.json
 */
export async function viewAutoLoadLocale(viewName:string){
    /**
     * 加载语言
     * @param loca 语言类型
     * @param doClear 加载前是否执行清除操作
     */
    async function loadLoc(loca:string,doClear:boolean){

        if (doClear)
            await clearLocale(loca);//清空目标语言
        try {await loadLocale(loca);/*加载全局语言*/}catch(e){console.log(e)}
        try {await loadLocale(loca, `${viewName}.${loca}`);/*加载view私有语言*/}catch(e){console.log(e)}

    }
    const loc:string =(i18n.global.locale as WritableComputedRef<string>).value;
    await loadLoc(loc,true);

    const backLoc = (i18n.global.fallbackLocale as WritableComputedRef<string[]>).value;
    backLoc.forEach((l:string) =>{
        loadLoc(l,false);
    })
}