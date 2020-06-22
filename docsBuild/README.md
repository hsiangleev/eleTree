---
home: true
heroImage: /eleTree.jpg
meta:
  - name: title
    content: eleTree2.0
actionText: 起步 →
description: 基于虚拟dom编写的树组件
actionLink: /eleTree/installation
footer: MIT Licensed | Copyright © 2020-present hsianglee
---

<div class="features">
  <div class="feature">
    <h2>版本重构</h2>
    <p>相较于1.0版本，移除了jquery和layui的依赖，采用snabbdom插件</p>
  </div>
  <div class="feature">
    <h2>代码分离</h2>
    <p>采用webpack的方式，代码结构分离更清晰，并支持直接引入，layui模块引入，和npm的方式引入</p>
  </div>
  <div class="feature">
    <h2>性能优化</h2>
    <p>采用后渲染的方式，即初始渲染时，只渲染展开的树节点，上万条数据无压力渲染</p>
  </div>
</div>

::: warning 兼容性
eleTree2.0版本要求浏览器至少为IE10+
:::

