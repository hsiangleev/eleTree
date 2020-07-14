## [eleTree2.0在线文档](https://eletree.hsianglee.cn/)

### 说明

* 基于虚拟dom重写eleTree插件
* 移除layui和jquery，完全基于snabbdom，渲染性能大大优化
* es6加webpack打包，支持import导入，layui导入和CDN直接引入的方式

### 本地开发测试

```bash
git clone https://github.com/hsiangleev/eleTree.git

cd eleTree

npm install

# 浏览器访问 http://localhost:3000
npm run start

# 生成
npm run build

# vuepress文档在线查看(浏览器访问http://localhost:3001)
npm run docs:start
```

### 安装

```bash
npm install eletree -D
```

### 快速开始

`<div class="eletree"></div>`

```javascript
var el = eleTree({
    el: '.eletree',
    url: '/eleTree/json/1.json',
    highlightCurrent: true,
    showCheckbox: true
})
el.getChecked()
el.on("checkbox", function(data) {
    console.log(data)
})
```

## api文档

### options属性

#### 基础属性

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| elem | dom选择器 | string | — | — |
| data | 静态数据 | array | — | — |
| emptText | 当数据为空时显示的内容 | string | — | 暂无数据 |
| highlightCurrent | 是否高亮当前选中节点 | boolean | — | false |
| defaultExpandAll | 是否默认展开所有节点 | boolean | — | false |
| autoExpandParent | 展开子节点的时候是否自动展开父节点 | boolean | — | false |
| expandOnClickNode | 是否在点击文本的时候展开或者收缩节点，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点 | boolean | — | true |
| checkOnClickNode | 复选框是否在点击文本的时候选中节点 | boolean | — | false |
| radioOnClickNode | 单选框是否在点击文本的时候选中节点 | boolean | — | false |
| defaultExpandedKeys | 默认展开的节点的 key 的数组 | array | — | — |
| showCheckbox | 是否显示checkbox | boolean | — | false |
| checkStrictly | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 | boolean | — | false |
| defaultCheckedKeys | 默认勾选的节点的 key 的数组 | array | — | — |
| accordion | 是否每次只打开一个同级树节点展开（手风琴效果） | boolean | — | false |
| indent | 相邻级节点间的水平缩进，单位为像素 | number | — | 16 |
| showLine | 是否显示虚线 | boolean | — | true |
| imgUrl | 图片所在的文件夹路径 | string | — | ./images/ |
| icon | 使用自定义图标或图片 | object | fold，leaf，checkFull，checkHalf，checkNone，dropdownOff，dropdownOn，loading，radioCheck，radioCheckNone | 每个属性默认值均为空字符串 |
| done | 树渲染完成之后的回调，参数为data数据 | function | — | — |
| lazy | 开启懒加载 | boolean | — | false |
| rightMenuList | 开启右键菜单 | array | "copy", "paste", "paste_before", "paste_after", "cut_paste", "edit", "remove", "add_child", "add_before", "add_after" | [] |
| showRadio | 是否显示radio | boolean | — | false |
| radioType | 单选范围（是同一级还是整体只能选择一个） | string | level/all | level |
| defaultRadioCheckedKeys | radio默认选中项 | array | — | — |

#### 异步属性

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| url | 异步接口地址 | string | — | — |
| method | 接口http请求类型 | string | get,post | get |
| where | 接口的其它参数 | object | — | — |
| headers | 接口的请求头 | object | — | — |
| response | dom选择器 | string | — | — |
| request | dom选择器 | string | — | — |

### 方法

| 方法名      | 说明          | 参数      |
|---------- |-------------- |---------- |
| on | 事件回调 | (type, callback)1.事件名，2.触发事件时的回调函数； |
| getChecked | 获取复选框选中的节点信息 | (leafOnly, includeHalfChecked)1.是否只选中叶子节点，默认false，2.是否包括半选节点，默认false |
| setChecked | 设置复选框选中的节点 | (checkArr, isUnCheckAll)1.设置选中项数组，2.是否先清空原有的选中项，默认true |
| unChecked | 取消复选框选中的节点 | (unCheckArr)1.取消选中的节点数组；不传参数则默认清空所有选中项；<span style="color: #ff4200">注意：如果父子节点都是选中的，则如果要取消子节点，需要先取消父节点，即父节点必须包含在数组中</span> |
| getRadioChecked | 获取单选框选中的节点信息 | — |
| setRadioChecked | 设置单选框选中的节点 | (checkArr, isUnCheckAll)1.设置选中项数组，2.是否先清空原有的选中项，默认true |
| unRadioChecked | 取消单选框选中的节点 | (unCheckArr)1.取消选中的节点数组；不传参数则默认清空所有选中项 |
| expandAll | 展开所有节点 | — |
| unExpandAll | 合并所有节点 | — |
| append | 添加子节点 | (id, array)1.查找需要添加的节点id，2.添加的子节点数据数组；id传null或空字符串则会添加到根节点 |
| updateKeySelf | 更新当前节点数据 | (id, object)1.查找需要修改的节点id，2.需要修改的数据 |
| remove | 删除节点数据 | (removeArr)1.需要删除的节点id数组(可以移除多个节点) |
| insert | 在某个节点前后插入数据 | (id, array, type)1.查找需要添加的节点id，2.需要添加节点数据数组，3.类型，在当前节点前插入还是节点后插入，可选参数('before','after')，默认节点前 |
| reload | 重新渲染树节点 | (options)1.传入object，参数初始参数一致 |
| search | 搜索树节点 | (value, callback)1.需要搜索的文本信息，2. 传入的搜索条件，函数返回值为true则显示该节点； |
| getAllNodeData | 获取所有节点数据 | — |

### 事件

| 方法名      | 说明          | 回调参数      |
|---------- |-------------- |---------- |
| checkbox | checkbox选择 | (type, data)1.事件名，2.当前节点数据 |
| radio | radio选择 | (type, data)1.事件名，2.当前节点数据 |
| click | 节点点击 | (type, data)1.事件名，2.当前节点数据 |
| copy | 节点复制 | (type, data, load, stop)1.事件名，2.当前节点数据, 3. 执行该操作, 4. 取消执行该操作 |
| paste | 粘贴到子节点 | 同上 |
| paste_before | 粘贴到节点之前 | 同上 |
| paste_after |  粘贴到节点之后 | 同上 |
| cut_paste | 剪贴节点 | 同上 |
| edit | 编辑节点 | 同上 |
| remove | 删除节点 | 同上 |
| add_child | 添加子节点 | 同上 |
| add_before |  添加到节点前 | 同上 |
| add_after | 添加到节点后 | 同上 |
| custom_ | 自定义事件 | 同上 |