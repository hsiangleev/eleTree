import { h } from 'snabbdom'
export default function(options, v) {
    let checkboxStr = v.checkedStatus === 2 ? '.eleTree-checkbox-checked' : (v.checkedStatus === 1 ? '.eleTree-checkbox-half' : '')
    let disabledStr = v.disabled ? '.eleTree-checkbox-disabled' : ''
    return options.showCheckbox ? h('span.eleTree-checkbox' + checkboxStr + disabledStr) : null
}