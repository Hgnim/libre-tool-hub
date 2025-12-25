import { defineMock } from 'vite-plugin-mock-dev-server'
import {doConv} from "@/views/tools/BaseConversion/ts/baseConversion.ts";

export default defineMock({
    url: '/api/tool/baseconversion',
    method: 'GET',
    type: 'json',
    status: 200,
    response: (req,res)=>{
        const { query={} } = req;
        if (query.input && query.inbase && query.outbase) {
            res.end(
                JSON.stringify({
                    ...doConv(query.input,Number(query.inbase),Number(query.outbase))
                }),
            )
        }else{
            res.end(
                JSON.stringify({
                    code:'-1',
                })
            )
        }
    }
})