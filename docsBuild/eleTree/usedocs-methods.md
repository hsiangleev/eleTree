### 方法

| 方法名      | 说明          | 参数      |
|---------- |-------------- |---------- |
| on | 事件回调 | (type, callback)1.事件名，2.触发事件时的回调函数；[查看更多](/eleTree/usedocs-event.html) |
| getChecked | 获取复选框选中的节点信息 | (leafOnly, includeHalfChecked)1.是否只选中叶子节点，默认false，2.是否包括半选节点，默认false |
| setChecked | 设置复选框选中的节点 | (checkArr, isUnCheckAll)1.设置选中项数组，2.是否先清空原有的选中项，默认true |
| unChecked | 取消复选框选中的节点 | (unCheckArr)1.取消选中的节点数组；不传参数则默认清空所有选中项； |
| setAllChecked | checkbox选中所有节点，除了禁用的节点 | — |
| reverseChecked | checkbox反选所有节点，除了禁用的节点 | — |
| getRadioChecked | 获取单选框选中的节点信息 | — |
| setRadioChecked | 设置单选框选中的节点 | (checkArr, isUnCheckAll)1.设置选中项数组，2.是否先清空原有的选中项，默认true |
| unRadioChecked | 取消单选框选中的节点 | (unCheckArr)1.取消选中的节点数组；不传参数则默认清空所有选中项 |
| expandAll | 展开所有节点 | — |
| unExpandAll | 合并所有节点 | — |
| append | 添加子节点(<span style="color: #ff4200">有两种格式</span>) | A. (id, array/object)1.查找需要添加的节点id，2.添加的子节点数据数组；id传null或空字符串则会添加到根节点</br>B. (array/object)只传一个array/object参数则代表传入的为pid格式的数据，即在节点pid下添加子节点 |
| updateKeySelf | 更新当前节点数据或移动某些节点(<span style="color: #ff4200">有两种格式</span>) | A. (id, object)1.查找需要修改的节点id，2.需要修改的数据</br>B. (array/object)只传一个array/object参数则代表传入的为pid格式的数据，即修改id的数据，如果pid改变，则代表移动节点 |
| remove | 删除节点数据 | (removeArr)1.需要删除的节点id数组(可以移除多个节点) |
| edit | 编辑节点 | (id, nodeType)1.需要编辑的节点id, 2. 当前编辑的节点类型，对应触发的回调事件名称，可选值(edit/add_child/add_before/add_after) |
| insert | 在某个节点前后插入数据 | (id, array/object, type)1.查找需要添加的节点id，2.需要添加节点数据数组，3.类型，在当前节点前插入还是节点后插入，可选参数('before','after')，默认节点前 |
| reload | 重新渲染树节点 | (options)1.传入object，参数初始参数一致 |
| search | 搜索树节点 | (value, callback)1.需要搜索的文本信息，2. 传入的搜索条件，函数返回值为true则显示该节点；[查看更多](/eleTree/demo-search.html) |
| getAllNodeData | 获取所有节点数据 | ('c'/'p') 传入字符串'c'则返回的数据结构为父子结构，传入字符串'p'则返回pid格式的数据，默认为'c' |
| copy | 复制节点 | (id) 1.需要复制的节点id |
| cutPaste | 剪贴节点 | (id) 1.需要剪贴的节点id |
| paste | 粘贴节点 | (id, nodeType) 1.需要粘贴到的节点id，2.粘贴到该节点的位置，可选参数('before','after','children')，默认children |
| getClipboardData | 获取剪贴板数据 | 移动或复制或剪贴节点都会把该节点复制到剪贴板，如果剪贴板没有数据，则返回null |
| sort | 对某个节点的子节点排序 | (opts) 1.id:对某一个节点排序, 不传则对最外层节点;field:按某个字段排序;type:升序asc降序desc;depth:深度,不传则为所有子节点；[查看更多](/eleTree/demo-sort.html) |