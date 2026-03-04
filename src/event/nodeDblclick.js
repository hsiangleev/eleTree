import { emit } from '~/event/customEvent'

export default function(thisTree, v, event) {
    emit.call(thisTree, {v, type: 'dblclick', event})
}