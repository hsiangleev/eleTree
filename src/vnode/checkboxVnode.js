import { h } from 'snabbdom'
export default function(options, v) {
    let checkboxStr = v.checkedStatus === 2 ? '.eleTree-checkbox-checked' : (v.checkedStatus === 1 ? '.eleTree-checkbox-half' : '')
    return h('span.eleTree-checkbox' + checkboxStr)
}