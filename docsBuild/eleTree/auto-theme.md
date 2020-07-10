### 自定义主题

#### 默认主题

<div class="eleTree-group">
    <div class="eleTree-node">
        <div class="eleTree-title">
            <span class="eleTree-dropdown eleTree-dropdown-code" :style="dropdownCode" ref="dropdownCode"></span>
            <span class="eleTree-checkbox eleTree-checkbox-code"></span>
            <span class="eleTree-radio eleTree-radio-code"></span>
            <span class="eleTree-text">安徽省</span>
        </div>
    </div>
</div>
<div class="eleTree-group">
    <div class="eleTree-node">
        <div class="eleTree-title">
            <span class="eleTree-dropdown eleTree-dropdown-code eleTree-dropdown-open"></span>
            <span class="eleTree-dropdown eleTree-loading eleTree-animate-rotate eleTree-loading-code"></span>
            <span class="eleTree-checkbox eleTree-checkbox-code eleTree-checkbox-code_disabled"></span>
            <span class="eleTree-checkbox eleTree-checkbox-code eleTree-checkbox-code_checked"></span>
            <span class="eleTree-checkbox eleTree-checkbox-code eleTree-checkbox-code_checked eleTree-checkbox-code_disabled"></span>
            <span class="eleTree-checkbox eleTree-checkbox-code eleTree-checkbox-code_half"></span>
            <span class="eleTree-radio eleTree-radio-code eleTree-radio-code_disabled"></span>
            <span class="eleTree-radio eleTree-radio-code eleTree-radio-code_checked"></span>
            <span class="eleTree-radio eleTree-radio-code eleTree-radio-code_checked eleTree-radio-code_disabled"></span>
        </div>
    </div>
</div>

<script>
export default {
    data() {
        return {
            dropdownCode: {
                // backgroundColor: "#ff4200"
            }
        }
    },
    mounted () {
        // document.styleSheets[document.styleSheets.length - 1].addRule(
        //     `.eleTree-group .eleTree-node .eleTree-title .eleTree-dropdown.eleTree-dropdown-code:not(.eleTree-dropdown-hide)::before, 
        //     .eleTree-group .eleTree-node .eleTree-title .eleTree-dropdown.eleTree-dropdown-code:not(.eleTree-dropdown-hide)::after`, 'background-color: #ff4200'
        // )
        // console.log(getComputedStyle(this.$refs["dropdownCode"],":before")["background-color"])
    }
}
</script>

<style>
.eleTree-group .eleTree-node .eleTree-title .eleTree-dropdown.eleTree-dropdown-code:not(.eleTree-dropdown-hide)::before, 
.eleTree-group .eleTree-node .eleTree-title .eleTree-dropdown.eleTree-dropdown-code:not(.eleTree-dropdown-hide)::after{
    /* background-color: #ff4200; */
    width: 10px;
    left: 3px;
}
.eleTree-group .eleTree-node .eleTree-title .eleTree-checkbox.eleTree-checkbox-code{

}
</style>