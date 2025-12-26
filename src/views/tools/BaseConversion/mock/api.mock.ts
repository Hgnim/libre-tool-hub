import {doConv} from "@/views/tools/BaseConversion/ts/baseConversion.ts";
import { http, HttpResponse } from 'msw';

export const baseConversion_handlers = [
    http.get('/tool/baseconversion/api', ({ request }) => {
        const url = new URL(request.url);
        const input = url.searchParams.get('input');
        const inbase = url.searchParams.get('inbase');
        const outbase = url.searchParams.get('outbase');

        if (input && inbase && outbase) {
            return HttpResponse.json({
                ...doConv(input,Number(inbase),Number(outbase))
            });
        }
        else{
            return HttpResponse.json({
                code:'-1',
            });
        }
    }),
]