import {i18nGlobal, loadLocale} from "@/plugins/i18n.ts";
import {useI18n} from "vue-i18n";

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
        //await loadLocale(loca);//加载全局语言
        await loadLocale(loca, `${viewName}.${loca}`);//加载view私有语言
    }
    const loc:string =i18nGlobal.locale.value;
    await loadLoc(loc);

    const backLoc:string[] = i18nGlobal.fallbackLocale.value as string[];
    backLoc.forEach((l:string) =>{
        loadLoc(l);
    })
}

/**
 * 加载全局语言
 */
export async function loadGlobalLocale(){
    await loadLocale(i18nGlobal.locale.value);
    const backLoc:string[] = i18nGlobal.fallbackLocale.value as string[];
    backLoc.forEach((l:string) =>{
        loadLocale(l);
    })
}

export function autoUseI18n(){
    const { t:gt } = useI18n({//访问全局语言
        inheritLocale: true,
        useScope: 'global'
    })
    const { t:lt } = useI18n({//仅供访问嵌入式语言
        inheritLocale: true,
        useScope: 'local'
    })
    return {gt, lt};
}

/**
 * 获取当前使用的语言名，例：zh-CN、en-US
 */
export function getCurrentLocale():string{
    return i18nGlobal.locale.value;
}

/**
 * 获取回退语言
 */
export function getFallbackLocale(forceArray:boolean=false):string|string[]{
    if (forceArray){
        const fblv:string|string[]=i18nGlobal.fallbackLocale.value;
        if (Array.isArray(fblv))
            return fblv;
        else
            return [fblv];
    }else return i18nGlobal.fallbackLocale.value;
}