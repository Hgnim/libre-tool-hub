import * as QRCode from 'qrcode'

declare module 'qrcode' {
    export function toDataURL(
        text: string,
        options: QRCode.QRCodeToDataURLOptions,
        callback: (error: Error | null | undefined, url: string) => void
    ): void
    export interface QRCodeToDataURLOptionsJpegWebp {
        quality?: number
    }
    export interface QRCodeRenderersOptions {
        quality?: number
    }
}
