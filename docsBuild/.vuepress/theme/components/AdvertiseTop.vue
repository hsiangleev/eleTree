<template>
    <!-- 头部广告位 -->
    <div class="advertise-top">
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <ins class="adsbygoogle"
            style="display:inline-block;width:210px;height:100px"
            data-ad-client="ca-pub-2229355551485035"
            data-ad-slot="6395441907"></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    </div>
</template>

<script>

export default {
    name: 'AdvertiseTop',
    props: [
        'items',
        'depth',  // depth of current sidebar links
        'sidebarDepth' // depth of headers to be extracted
    ],

    data () {
        return {
            
        }
    },

    methods: {
        
    }
}
</script>

<style lang="stylus">
.advertise-top
    min-height: 102px;
    padding: 1.5rem 1.5rem 0;
    margin-bottom: -.5rem;
    font-size: .75rem;
</style>
