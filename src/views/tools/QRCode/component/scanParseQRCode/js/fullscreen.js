export default function(){
    ///引用与修改于 https://github.com/gruhn/vue-qrcode-reader/blob/ce28111a7390c3ccb0482bcd9f949adfeafdff72/docs/.vitepress/components/demos/Fullscreen.vue#L72

    function requestFullscreen(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen()
        } else if (elem.mozRequestFullScreen) {
            /* Firefox */
            elem.mozRequestFullScreen()
        } else if (elem.webkitRequestFullscreen) {
            /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen()
        } else if (elem.msRequestFullscreen) {
            /* IE/Edge */
            elem.msRequestFullscreen()
        }
    }

    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
            /* Firefox */
            document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
            /* Chrome, Safari and Opera */
            document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
            /* IE/Edge */
            document.msExitFullscreen()
        }
    }

    return {requestFullscreen,exitFullscreen};
}