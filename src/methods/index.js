import { on } from '~/event/customEvent'
import getChecked from '~/methods/getChecked'
import updateKeyChildren from '~/methods/updateKeyChildren'
import updateKeySelf from '~/methods/updateKeySelf'
import setChecked from '~/methods/setChecked'
export default function(options) {
    return {
        on(type, callback) {
            on(type, options.el, callback)
        },
        getChecked: getChecked.bind(options),
        updateKeyChildren: updateKeyChildren.bind(options),
        updateKeySelf: updateKeySelf.bind(options),
        setChecked: setChecked.bind(options),
    }
}