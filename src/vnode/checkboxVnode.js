import { h } from 'snabbdom'
export default function(options, v) {
    let checkboxStr = v.checkedStatus === 2 ? '.eleTree-checkbox-code_checked' : (v.checkedStatus === 1 ? '.eleTree-checkbox-code_half' : '')
    let disabledStr = v.disabled ? '.eleTree-checkbox-code_disabled' : ''
    return options.showCheckbox ? h('span.eleTree-checkbox' + checkboxStr + disabledStr) : null

}