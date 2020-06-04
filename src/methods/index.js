import { on } from '../event/customEvent'
import getChecked from './getChecked'
import updateKeyChildren from './updateKeyChildren'
import updateKeySelf from './updateKeySelf'
import { isFun } from '../opera/tools'
export default function(options) {
    return {
        on(type, callback) {
            if(callback && isFun(callback)){
                on({type, callback})
            }else{
                return new Promise(resolve=>{
                    on({resolve, type})
                })
            }
        },
        getChecked: getChecked.bind(options),
        updateKeyChildren: updateKeyChildren.bind(options),
        updateKeySelf: updateKeySelf.bind(options)
    }
}