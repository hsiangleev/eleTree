import { on } from '~/event/customEvent'
import getChecked from '~/methods/getChecked'
import updateKeyChildren from '~/methods/updateKeyChildren'
import updateKeySelf from '~/methods/updateKeySelf'
import setChecked from '~/methods/setChecked'
import unChecked from '~/methods/unChecked'
import expandAll from '~/methods/expandAll'
import unExpandAll from '~/methods/unExpandAll'
export default function(options) {
    //函数内部的this为当前的methods方法，第一个参数为options对象，后续参数为传入的参数，函数内部返回this即可实现链式调用
    let methods = {
        on: (...args)=>on.call(methods, options, ...args),
        getChecked: (...args)=>getChecked.call(methods, options, ...args),
        setChecked: (...args)=>setChecked.call(methods, options, ...args),
        updateKeyChildren: (...args)=>updateKeyChildren.call(methods, options, ...args),
        updateKeySelf: (...args)=>updateKeySelf.call(methods, options, ...args),
        unChecked: (...args)=>unChecked.call(methods, options, ...args),
        expandAll: (...args)=>expandAll.call(methods, options, ...args),
        unExpandAll: (...args)=>unExpandAll.call(methods, options, ...args),
    }
    return methods
}