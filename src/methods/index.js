import getCurrentNodeData from '../opera/getCurrentNodeData'
import { on } from '../event/customEvent'
import getChecked from './getChecked'
import updateKeyChildren from './updateKeyChildren'
import updateKeySelf from './updateKeySelf'
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