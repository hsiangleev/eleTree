import { on } from '~/event/customEvent'
import getChecked from '~/methods/getChecked'
import append from '~/methods/append'
import updateKeySelf from '~/methods/updateKeySelf'
import setChecked from '~/methods/setChecked'
import unChecked from '~/methods/unChecked'
import expandAll from '~/methods/expandAll'
import unExpandAll from '~/methods/unExpandAll'
import remove from '~/methods/remove'
import insert from '~/methods/insert'
import reload from '~/methods/reload'
import search from '~/methods/search'
export default function(inst) {
    let { config: options } = inst
    //函数内部的this为当前的methods方法，第一个参数为options对象，后续参数为传入的参数，函数内部返回this即可实现链式调用
    let methods = {
        on: (...args)=>on.call(methods, options, ...args),
        getChecked: (...args)=>getChecked.call(methods, options, ...args),
        setChecked: (...args)=>setChecked.call(methods, options, ...args),
        unChecked: (...args)=>unChecked.call(methods, options, ...args),

        expandAll: (...args)=>expandAll.call(methods, options, ...args),
        unExpandAll: (...args)=>unExpandAll.call(methods, options, ...args),

        append: (...args)=>append.call(methods, options, ...args),
        updateKeySelf: (...args)=>updateKeySelf.call(methods, options, ...args),
        remove: (...args)=>remove.call(methods, options, ...args),
        insert: (...args)=>insert.call(methods, options, ...args),
        reload: (...args)=>reload.call(methods, inst, ...args),

        search: (...args)=>search.call(methods, options, ...args),
    }
    return methods
}