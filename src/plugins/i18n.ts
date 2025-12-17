import {createI18n, type I18n} from 'vue-i18n';
import { nextTick } from 'vue'

export const i18n:I18n = createI18n({
    locale: 'zh-CN',
    fallbackLocale: ['en-US','zh-CN'],
})

/**
 * 加载语言
 * @param locale 语言名称
 * @param fileName 语言文件名，如果留空或为null，则使用locale值
 * @param isMerge 是否合并，如果为false，之前加载的语言将被抛弃
 */
export async function loadLocale(locale:string,fileName:string|null=null,isMerge:boolean=true){
    if(!fileName) fileName=locale;

    const messages = await import(
        `@/locales/${fileName}.json`
        )

    if (isMerge)
        i18n.global.mergeLocaleMessage(locale, messages.default);
    else
        i18n.global.setLocaleMessage(locale, messages.default);

    return nextTick();
}

/**
 * 清空已加载的语言
 * @param locale 语言名称
 */
export async function clearLocale(locale:string){
    i18n.global.setLocaleMessage(locale, {});
}