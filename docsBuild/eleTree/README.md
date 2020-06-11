
## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm i eletree -S
```

### CDN

目前可以通过 [该地址](https://github.com/hsiangleev/eleTree/tree/master/dist/eleTree.js) 获取到最新版本的资源，在页面上引入 js 文件即可开始使用。

```html
<script src="https://github.com/hsiangleev/eleTree/tree/master/dist/eleTree.js"></script>
```

### layui

首先把获取到的js文件放到layui自定义插件目录下，例如mymodules文件夹下

```js
layui.config({
    base: 'mymodules的路径'
}).use(['eleTree'], function(){
    var eleTree = layui.eleTree;
    eleTree.render({/*...*/})
});
```

<!-- :::tip
我们建议使用 CDN 引入 Element 的用户在链接地址上锁定版本，以免将来 Element 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com)。
::: -->

### Hello world

通过 CDN 的方式我们可以很容易地使用 Element 写出一个 Hello world 页面。[在线演示](https://codepen.io/ziyoung/pen/rRKYpd)

<iframe height="265" style="width: 100%;" scrolling="no" title="Element demo" src="//codepen.io/ziyoung/embed/rRKYpd/?height=265&theme-id=light&default-tab=html" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ziyoung/pen/rRKYpd/'>Element demo</a> by hetech
  (<a href='https://codepen.io/ziyoung'>@ziyoung</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

如果是通过 npm 安装，并希望配合 webpack 使用，请阅读下一节：[快速上手](/#/zh-CN/component/quickstart)。
