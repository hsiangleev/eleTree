// https://stackoverflow.com/questions/3680876/using-queryselectorall-to-retrieve-direct-children
// 查找子节点
export default function queryChildren(element, selector) {
    var id = element.id,
        guid = element.id = id || 'eletree_query_children_' + Date.now(),
        attr = '#' + guid + ' > ',
        selector = attr + (selector + '').replace(',', ',' + attr, 'g');
    var result = element.parentNode.querySelectorAll(selector);
    if (!id) element.removeAttribute('id');
    return result;
}

// 获取dom节点在兄弟节点的索引
export function queryIndex(element, selector) {
    const list = queryChildren(element.parentNode, selector)
    return [].indexOf.call(list, element)
}