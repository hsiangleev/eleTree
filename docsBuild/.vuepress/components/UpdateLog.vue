<template>
    <ul class="update-log">
        <slot></slot>
    </ul>
</template>

<script>
export default {
    name: 'UpdateLog'
}
</script>

<style lang="scss" scoped>
    ul.update-log{
        padding: 0 0 10px;
        position: relative;
        color: #666;
        &>li{
            position: relative;
            list-style: none;
            line-height: 1.8;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding-bottom: 30px;
            &>h5{
                padding: 0px 40px;
                font-size: 18px;
                font-weight: 600;
            }
            &>ul{
                padding: 0px 80px;
            }
            &:not(:last-child){
                margin-bottom: 50px;
            }
            &>h4:first-child{
                border-bottom: 1px solid #ddd;
                padding: 15px 20px;
                line-height: 30px;
                margin: 0;
                font-size: 20px;
                font-weight: 600;
            }
            &>p:first-of-type{
                position: absolute;
                right: 30px;
                top: 0px;
            }
        }
    }
</style>