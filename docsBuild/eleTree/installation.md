
### 安装

#### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm install eletree -D
```

#### CDN

目前可以通过 [该地址](https://github.com/hsiangleev/eleTree/tree/master/dist/eleTree.js) 获取到最新版本的资源，下载到本地之后，在页面上引入 js 文件即可开始使用。

```html
<!-- js文件 -->
<script src="//eletreejs.surge.sh/eleTree.js"></script>
<!-- 加载字体文件样式 -->
<link rel="stylesheet" href="//eletreejs.surge.sh/css/icon.css"></script>
<!-- 使用图片地址 -->
<!-- imgUrl: "//eletreejs.surge.sh/images/" -->
```

#### layui

首先把获取到的js文件放到layui自定义插件目录下，例如mymodules文件夹下

```js
layui.config({
    base: 'mymodules的路径'
}).use(['eleTree'], function(){
    var eleTree = layui.eleTree;
    eleTree({/*...*/})
});
```

#### 在线测试

通过 CDN 的方式我们可以很容易地使用 eleTree 写出一个页面。[在线演示](https://codepen.io/hsiangleev/pen/ZEQQgyO)

<iframe height="365" style="width: 100%;" scrolling="no" title="ZEQQgyO" src="https://codepen.io/hsiangleev/embed/ZEQQgyO?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/hsiangleev/pen/ZEQQgyO'>ZEQQgyO</a> by 李祥
  (<a href='https://codepen.io/hsiangleev'>@hsiangleev</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>