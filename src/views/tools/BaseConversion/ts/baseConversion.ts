import {isDev} from "@/ts/global/packMode.ts";

const allChars:string[]=[
    '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'
]

/**
 * 合法性检查
 * @param value 需要转换的值
 * @param baseNum 进制值
 */
export function legalCheck(value:string, baseNum:number):boolean{
    return new RegExp(
        `^[${
            allChars.slice(0, Number(baseNum)).join('')
        }]+$`
    ).test(value);
}
export type doConvRes={
    //退出代码：
    //0: 正常退出；
    //1: 输入不合法；
    code:number,
    output:string|null,
}
/**
 * 执行转换
 * @param inputStr 输入字符串
 * @param inputBase 输入的进制
 * @param outputBase 输出的进制
 */
export function doConv(inputStr:string, inputBase:number,outputBase:number):doConvRes{
    if (!legalCheck(inputStr, inputBase)) return {code:1,output:null};

    const inputChars:string[]=inputStr.split('');

    const outToDec:bigint=(()=>{
        let op:bigint=0n;
        for (let i=0; i<inputChars.length; i++){
            for (let j=0;j<allChars.length;j++){
                if (inputChars[i] == allChars[j]){
                    op+=BigInt(j)*BigInt((BigInt(inputBase)**BigInt((inputChars.length-1-i))));
                    break;
                }
            }
        }
        return op;
    })();
    if (isDev)
        console.debug
        (`[BaseConversion.vue] ${inputBase}进制转十进制结果：${outToDec.toLocaleString('fullwide'/*不使用科学计数法*/, {useGrouping: false/*不使用千位分隔符','*/})}`);

    let dec:bigint=outToDec;
    let opVals:number[] = [];
    while (true){
        opVals.push(Number(dec%BigInt(outputBase)));
        dec /= BigInt(outputBase);//bigint正数情况下向下取整，负数计算则需要额外逻辑
        if (dec == 0n){
            break;
        }
    }
    let outputVal:string='';
    for (let i=opVals.length-1;i>=0;i--){
        outputVal+=allChars[opVals[i]!];
    }
    if (isDev) console.debug(`[BaseConversion.vue] ${inputBase}进制转${outputBase}进制输出：${outputVal}`);

    return {code:0,output:outputVal};
}