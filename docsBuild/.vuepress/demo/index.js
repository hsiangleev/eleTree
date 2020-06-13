// 代码大部分来源： https://github.com/busyrat/vuepress-plugins/blob/master/packages/vue-demo/DemoBlock.vue
const container = require('markdown-it-container')
const mdit = require('markdown-it')()
const path = require('path')
const resolvePath = p => path.resolve(__dirname, p).replace(/\\/g, '/')
const hashCode = s => {
    return s.split('').reduce(function(a, b) {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
    }, 0)
}
const creatDemoComponent = async (ctx, content, name) => {
    // const isHTML = /\`\`\`\s*html/.test(content)
    // const isPlainComponent = /^\s*\<template\>/.test(content) || /\`\`\`/.test(content)
    // const wrapTemplate = code => `<template>\n<div>\n${code}\n</div>\n</template>`
    // if (isHTML) {
    //     content = content.replace(/\`\`\`\s*html([\s\S]*)\`\`\`/,`<template>\n<div>\n$1\n</div>\n</template>`)
    // }

    if(!(/<template>/.test(content))){
        content = content.replace(/([\s\S]+)(<script>)/,"<template>\n<div>\n$1\n</div>\n</template>\n$2\n")
    }
    if(!(/export default/.test(content))){
        content = content.replace(/([\s\S]+<script>\s)([\s\S]+)(<\/script>)/,`$1\nexport default {\nmounted() {\n$2\n}\n}\n$3`)
    }

    // 写入临时文件
    await ctx.writeTemp(`dynamic/demo/${name}.vue`, content, { encoding: 'utf8' })
}

module.exports = (opts, ctx) => {
    return {
        name: 'vue-demo',
        enhanceAppFiles() {
            return {
                name: 'dynamic-code',
                content: `
                    export default ({ Vue, router }) => {
                        Vue.component('demoBlock', () => import('${resolvePath('demo-block.vue')}'))
                    }
                `
            }
        },
        extendPageData($page) {
            let { _content: content, key, relativePath } = $page

            if (typeof content === 'string') {
                let demoCodes = content.split(/:::/).filter(s => /^\s*demo/.test(s))

                demoCodes.forEach((code, index) => {
                    let t = code.split(/```[\s\S]*?(?=\<)/)
                    if (t.length > 1) {
                        code = t.slice(1).join('')
                        code = code.replace(/(\`\`\`)$/,"")
                    }
                    const tagName = `demo-block-${relativePath ? hashCode(relativePath) : key}-${index}`
                    creatDemoComponent(ctx, code, tagName)
                })
            }
        },

        extendMarkdown(md) {
            tagNameIndex = 0
            const validate = params => {
                return params.trim().match(/^demo\s*(.*)$/)
            }
            const render = (tokens, idx, options, env, self) => {
                const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
                if (tokens[idx].nesting === 1) {
                    const description = m && m.length > 1 ? m[1] : ''
                    const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
                    const isNewPage = tokens.slice(0, idx).filter(_ => _.type === 'container_demo_open').length === 0
                    if (isNewPage) {
                        tagNameIndex = 0
                    } else {
                        tagNameIndex++
                    }
                    let key = env.relativePath.match(/temp-pages\/(.*?)\.md/)
                    if (key) {
                        key = key[1]
                    } else {
                        key = hashCode(env.relativePath)
                    }
                    const tagName = `demo-block-${key}-${tagNameIndex}`
                    creatDemoComponent(ctx, content, tagName)
            
                    return `
                        <demo-block>
                        <template slot="source"><${tagName}/></template>
                        ${description ? `<div>${mdit.render(description)}</div>` : ''}
                        <template slot="code">
                    `
                }
                return '</template></demo-block>'
            }
        
            md.use(container, 'demo', { render, validate })
        },

        plugins: [
            [
                '@vuepress/register-components',
                {
                    componentsDir: path.resolve(ctx.tempPath, 'dynamic/demo')
                }
            ]
        ]
    }
}