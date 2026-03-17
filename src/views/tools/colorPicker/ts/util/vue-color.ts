export function getRgbaString(tinycolorRes:any){
    const rgba=tinycolorRes.toRgb();
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}