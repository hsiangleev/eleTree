eleTree

## 说明

* 基于虚拟dom重写eleTree插件
* 移除layui和jquery，完全基于snabbdom，渲染性能大大优化
* es6加webpack打包，支持import导入，layui导入和CDN直接引入的方式

## 开发

```bash
git clone https://github.com/hsiangleev/eleTree.git
cd eleTree
npm install
npm run start
```

浏览器访问[http://localhost:3000](http://localhost:3000)

## 其他

```bash
# 生成
npm run build

# vuepress文档在线查看(浏览器访问http://localhost:3001)
npm run docs:start

# vuepress文档生成
npm run docs:build

```
