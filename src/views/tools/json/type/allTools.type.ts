export type AllTools ={
    allToolsId:string[],
    allTools:{
        baseConversion: AllTools_Tool,
        colorPicker: AllTools_Tool,
        markdownPane: AllTools_Tool,
        qrcode: AllTools_Tool,
        stringAndBaseConversion: AllTools_Tool,
    },
};
export type AllTools_Tool={
    path:{
        explanationJson:string,
        appendixMd:string,
    },
    router:{
        name:string,
    },
};