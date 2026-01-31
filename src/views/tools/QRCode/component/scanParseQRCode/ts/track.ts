import {ref} from "vue";

export default function() {
    ///引用与修改于 https://github.com/gruhn/vue-qrcode-reader/blob/ce28111a7390c3ccb0482bcd9f949adfeafdff72/docs/.vitepress/components/demos/FullDemo.vue#L116

    function paintOutline(detectedCodes:any, ctx:any) {
        for (const detectedCode of detectedCodes) {
            const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

            ctx.strokeStyle = '#00a6ff'

            ctx.beginPath()
            ctx.moveTo(firstPoint.x, firstPoint.y)
            for (const { x, y } of otherPoints) {
                ctx.lineTo(x, y)
            }
            ctx.lineTo(firstPoint.x, firstPoint.y)
            ctx.closePath()
            ctx.stroke()
        }
    }
    function paintBoundingBox(detectedCodes:any, ctx:any) {
        for (const detectedCode of detectedCodes) {
            const {
                boundingBox: { x, y, width, height }
            } = detectedCode

            ctx.lineWidth = 2
            ctx.strokeStyle = '#007bff'
            ctx.strokeRect(x, y, width, height)
        }
    }
    function paintCenterText(detectedCodes:any, ctx:any) {
        for (const detectedCode of detectedCodes) {
            const { boundingBox, rawValue } = detectedCode

            const centerX = boundingBox.x + boundingBox.width / 2
            const centerY = boundingBox.y + boundingBox.height / 2

            const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

            ctx.font = `bold ${fontSize}px sans-serif`
            ctx.textAlign = 'center'

            ctx.lineWidth = 3
            ctx.strokeStyle = '#001935'
            ctx.strokeText(detectedCode.rawValue, centerX, centerY)

            ctx.fillStyle = '#008efb'
            ctx.fillText(rawValue, centerX, centerY)
        }
    }
    function paintOutlineAndCenterText(detectedCodes:any, ctx:any) {
        paintOutline(detectedCodes, ctx);
        paintCenterText(detectedCodes, ctx);
    }
    const trackFunctionOptions = [
        { text: 'nothing (default)', value: undefined },
        { text: 'outline', value: paintOutline },
        { text: 'centered text', value: paintCenterText },
        { text: 'bounding box', value: paintBoundingBox },
        { text: 'outline and centered text', value: paintOutlineAndCenterText },
    ]
    const trackFunctionSelected = ref(trackFunctionOptions[4])

    return {trackFunctionSelected};
}
