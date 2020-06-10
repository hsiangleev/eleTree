import { on } from '~/event/customEvent'
import getChecked from '~/methods/getChecked'
import updateKeyChildren from '~/methods/updateKeyChildren'
import updateKeySelf from '~/methods/updateKeySelf'
export default function(options) {
    return {
        on(type, callback) {
            on(type, callback)
        },
        getChecked: getChecked.bind(options),
        updateKeyChildren: updateKeyChildren.bind(options),
        updateKeySelf: updateKeySelf.bind(options)
    }
}