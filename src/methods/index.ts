import { ITreeData, IEleTree } from '../interface'
import { EleTree } from '../eleTree'
import { on, emit } from '../event/customEvent'
import getChecked from './getChecked'
import append from './append'
import updateKeySelf from './updateKeySelf'
import setChecked from './setChecked'
import unChecked from './unChecked'
import expandAll from './expandAll'
import unExpandAll from './unExpandAll'
import remove from './remove'
import insert from './insert'
import reload from './reload'
import search from './search'
import getRadioChecked from './getRadioChecked'
import setRadioChecked from './setRadioChecked'
import unRadioChecked from './unRadioChecked'
import getAllNodeData from './getAllNodeData'
import getClipboardData from './getClipboardData'
import { copy, cutPaste, paste } from './copy'
import setAllChecked from './setAllChecked'
import reverseChecked from './reverseChecked'
import edit from './edit'
import documentEvent from '../event/documentEvent'
import { showLoding, removeLoding } from '../vnode/loadingVnode'
import groupVnode from '../vnode/groupVnode'
import eleVnode from '../vnode/eleVnode'
import reloadVnode from '../vnode/reloadVnode'
import checkboxVnode from '../vnode/checkboxVnode'
import titleVnode from '../vnode/titleVnode'
import dropdownVnode from '../vnode/dropdownVnode'
import radioVnode from '../vnode/radioVnode'
import iconVnode from '../vnode/iconVnode'
import textVnode from '../vnode/textVnode'
import lineHorizontal from '../vnode/lineHorizontal'
import lineVertical from '../vnode/lineVertical'
import emptyVnode from '../vnode/emptyVnode'

export default class TreeMethodsBaseClass {
  // 函数内部第一个参数为当前methods方法，后续参数为传入的参数，函数内部返回methods方法即可实现链式调用
  on = on;
  emit = emit;
  getChecked = getChecked;
  setChecked = setChecked;
  unChecked = unChecked;
  setAllChecked = setAllChecked;
  reverseChecked = reverseChecked;

  expandAll = expandAll;
  unExpandAll = unExpandAll;

  append = append;
  updateKeySelf = updateKeySelf;
  remove = remove;
  insert = insert;
  // reload = reload;

  search = search;
  getRadioChecked = getRadioChecked;
  setRadioChecked = setRadioChecked;
  unRadioChecked = unRadioChecked;
  getAllNodeData = getAllNodeData;

  copy = copy;
  cutPaste = cutPaste;
  paste = paste;
  getClipboardData = getClipboardData;
  edit = edit;

  documentEvent = documentEvent
  showLoding = showLoding
  removeLoding = removeLoding
  lineHorizontal = lineHorizontal
  lineVertical = lineVertical

  reloadVnode = reloadVnode
  emptyVnode = emptyVnode
  titleVnode = titleVnode
  groupVnode = groupVnode
  eleVnode = eleVnode
  radioVnode = radioVnode
  checkboxVnode = checkboxVnode
  dropdownVnode = dropdownVnode
  iconVnode = iconVnode
  textVnode = textVnode
}
