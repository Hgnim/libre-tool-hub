export function appendixMd_get(){
    return import.meta.glob('@/views/tools/*/md/**/appendix*.md', {
        eager: true,
        as: 'url'
    });
}