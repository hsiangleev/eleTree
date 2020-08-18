import getCurrentNodeData from '~/opera/getCurrentNodeData'
export default function(methods) {
    if(this.rightMenuPasteData) {
        return getCurrentNodeData.call(this, this.rightMenuPasteData)
    }
    return null
}