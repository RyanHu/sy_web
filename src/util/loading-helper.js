export default {
    loading: false,
    loadingText: 'loading...',
    loadingTime:200,
    loadingParam(txt = '加载中...', basicTime = 200) {
        this.loadingTime = basicTime
        this.loadingText = txt
    }
}
