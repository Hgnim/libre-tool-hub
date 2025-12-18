import {i18nGlobal, loadLocale} from "@/plugins/i18n.ts";

/**
 * 切换语言
 * @param locale 语言名
 * @param viewName 当不留空和不为null时，根据其值调用viewAutoLoadLocale函数
 */
export async function switchLocale(locale: string,viewName:string|null = null) {
    if (i18nGlobal.locale.value === locale) return

    i18nGlobal.locale.value = locale

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
     */
    async function loadLoc(loca:string){
        await loadLocale(loca);//加载全局语言
        await loadLocale(loca, `${viewName}.${loca}`);//加载view私有语言
    }
    const loc:string =i18nGlobal.locale.value;
    await loadLoc(loc);

    const backLoc:string[] = i18nGlobal.fallbackLocale.value as string[];
    backLoc.forEach((l:string) =>{
        loadLoc(l);
    })
}