### 快速开始

::: demo
```html
<div class="eletree"></div>

<script>
eleTree({
    el: '.eletree',
    url: '/eleTree/json/1.json?v=2.0.12',
    highlightCurrent: true,
    showCheckbox: true,
    showRadio: true,
    imgUrl: "/eleTree/images/",
    icon: {
        fold: "fold.png",
        leaf: "leaf.png",
        checkFull: ".eletree_icon-check_full",
        checkHalf: ".eletree_icon-check_half",
        checkNone: ".eletree_icon-check_none",
        dropdownOff: ".eletree_icon-dropdown_right",
        dropdownOn: ".eletree_icon-dropdown_bottom",
        loading: ".eleTree-animate-rotate.eletree_icon-loading1",
        radioCheck: "radioCheck.png",
        radioCheckNone: "radioCheckNone.png",
    },
    rightMenuList: ["copy", "paste", "paste_before", "paste_after", "cut_paste", "edit", "remove", "add_child", "add_before", "add_after"],
})
</script>
<style>
.eletree { 
    
}
</style>
```
:::