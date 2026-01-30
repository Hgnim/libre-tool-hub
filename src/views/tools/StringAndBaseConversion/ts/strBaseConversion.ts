import {doConv, type doConvRes} from "@/views/tools/BaseConversion/ts/baseConversion.ts";
import {isDev} from "@/ts/env/packMode.ts";


/**
 * 获取一个字符码转换为指定进制文本时的位数
 * 目前只支持2 8 10 16进制
 * @param base 基数
 */
function getCharBit(base:number):number{
    switch (base){
        case 2:
            return 8;
        case 8:
        case 10:
            return 3
        case 16:
            return 2;
        default:
            throw new Error('getCharBit中出现了不支持的基数');
    }
}

/**
 * 合法性检查，目前只支持2 8 10 16进制
 * @param value 需要转换的值
 * @param base 基数值
 */
export function legalCheck(value:string, base:number):boolean{
    try{
        return value.length % getCharBit(base) == 0;
    }catch(e){
        if (isDev) console.error(`[strBaseConversion.ts] legalCheck函数出现错误：`,e);
        return false;
    }
}

/**
 * 执行字符串与进制文本的转换
 * strValue与baseStrValue其中一个参数需为null，为null的参数表示为希望输出的内容
 * 目前只支持2 8 10 16进制
 * @param strValue 字符串
 * @param baseStrValue 进制文本
 * @param base 基数
 */
export function doSbConv(strValue:string|null,baseStrValue:string|null,base:number):doConvRes{
    try {
        const charBit:number=getCharBit(base);
        if (strValue!=null && baseStrValue==null){
            let baseString:string='';
            /*for (let i=0;i<strValue.length;i++){
                const charCode:number=strValue.charCodeAt(i);
                const baseChar:string=doConv(charCode.toString(),10,base,false).output!.padStart(charBit, '0');

                baseString+=baseChar;
                if (isDev) console.debug(`[strBaseConversion.ts] [字符串->进制文本] 字符索引：${i}；字符码：${charCode}；进制文本：${baseChar}`);
            }*/
            const uint8Arr=new TextEncoder().encode(strValue);
            for (let i=0;i<uint8Arr.length;i++){
                const baseChar:string=doConv(uint8Arr[i]!.toString(),10,base,false).output!.padStart(charBit, '0');
                baseString+=baseChar;
                if (isDev) console.debug(`[strBaseConversion.ts] [字符串->进制文本] 索引：${i}；uint8值：${uint8Arr[i]}；进制文本：${baseChar}`);
            }
            return {code:0,output:baseString};
        }else if (baseStrValue!=null && strValue==null){
            if (!legalCheck(baseStrValue,base)) return {code:1,output:null};
            let outputStr:string='';
            /*for (let i=0;i<baseStrValue.length;i+=charBit){
                const baseChar:string=baseStrValue.slice(i, i+charBit);
                const charCode:string=doConv(baseChar,base,10,false).output!;
                const char:string=String.fromCharCode(Number(charCode));

                outputStr+=char;
                if (isDev) console.debug(`[strBaseConversion.ts] [进制文本->字符串] 组索引：${i}；进制文本：${baseChar}；字符码：${charCode}；`);
            }*/
            {
                let byteArr:number[]=[];
                for (let i = 0; i < baseStrValue.length; i += charBit) {
                    byteArr.push(
                        Number(doConv(baseStrValue.slice(i, i+charBit),base,10,false).output!)
                    );
                }
                const uint8Arr=new Uint8Array(byteArr);
                outputStr=new TextDecoder('utf-8').decode(uint8Arr);
                if (isDev) console.debug('[strBaseConversion.ts] [进制文本->字符串] uint8组：',byteArr);
            }
            return {code:0,output:outputStr};
        }else{
            return {code:1,output:null};
        }
    }catch (e){
        if (isDev) console.error('[strBaseConversion.ts] 转换时发生错误：',e);
        return {code:1,output:null};
    }
}