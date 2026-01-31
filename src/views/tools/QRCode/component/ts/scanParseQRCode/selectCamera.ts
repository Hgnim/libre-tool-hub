import {type Ref, ref} from "vue";

export default function () {
    ///引用与修改于 https://github.com/gruhn/vue-qrcode-reader/blob/ce28111a7390c3ccb0482bcd9f949adfeafdff72/docs/.vitepress/components/demos/FullDemo.vue#L88

    const selectedConstraints = ref({facingMode: 'environment'})
    const defaultConstraintOptions = [
        {label: 'rear camera', constraints: {facingMode: 'environment'}},
        {label: 'front camera', constraints: {facingMode: 'user'}}
    ]
    const constraintOptions: Ref<any> = ref(defaultConstraintOptions)

    async function onCameraReady() {
        // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
        // camera access permission. `QrcodeStream` internally takes care of
        // requesting the permissions. The `camera-on` event should guarantee that this
        // has happened.
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter(({kind}) => kind === 'videoinput')

        constraintOptions.value = [
            ...defaultConstraintOptions,
            ...videoDevices.map(({deviceId, label}) => ({
                label: `${label} (ID: ${deviceId})`,
                constraints: {deviceId}
            }))
        ]
    }

    return {selectedConstraints,constraintOptions,onCameraReady};
}