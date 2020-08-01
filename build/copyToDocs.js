// 生成的js文件copy到文档目录
var fs=require('fs');
fs.writeFileSync('docsBuild/.vuepress/public/eleTree/eleTree.js', fs.readFileSync('dist/eleTree.js'));