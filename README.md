### 虚拟dom重写eleTree树组件

#### 说明
1. 移除layui和jquery，完全基于snabbdom，渲染性能大大优化
2. es6加webpack打包

#### 使用
1. npm install
2. npm run start
3. 访问[http://localhost:3000](http://localhost:3000)

#### 项目结构
1. config目录配置webpack环境
2. test目录下的test.js文件用于开发环境测试
3. src目录下mock模拟后台数据请求，opera为数据节点操作的常用方法，vnode为渲染节点目录