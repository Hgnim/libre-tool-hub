export function appendixMd_get(){
    return import.meta.glob('@/views/tools/*/md/**/appendix*.md', {
        eager: true,
        as: 'url'
    });
}
export function explanationJson_get():Record<string, string>{
    return import.meta.glob('@/views/tools/*/json/**/explanation.*.json', {
        eager: true,
        as: 'url',
    });
}