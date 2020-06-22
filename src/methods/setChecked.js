import getCurrentNodeData from '~/opera/getCurrentNodeData'
import { isArray } from '~/opera/tools'
// 在原来的选中项基础上增加选中项
export default function(checkArr = []) {
    if(!isArray(checkArr)) checkArr = [checkArr]
    console.log(checkArr)
    // for(let i = 0,len=checkArr.length;i<len;i++){

    // }
}