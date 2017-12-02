<template>
    <div 
        class="bin" 
        v-bind:style="{ width: innerWidth + 'px', height: innerHeight - 40 + 'px' }"
        v-on:mousemove="mouseMove('bin', $event)"
        v-on:mouseup="mouseUp($event)"
        v-on:mouseleave="mouseLeave($event)"
        >
        <div 
            class="column left" 
            v-bind:style="{ width: HtmlCssWarpperWidth + '%' }"
            >
            <div 
                class="window top" 
                v-bind:style="{ height: HtmlWarpperHeight + '%' }"
                >
                <HtmlCodeMirror v-on:htmlChange="htmlChange" />
            </div>
            <div class="handler handler_horizontal" v-on:mousedown="mouseDown('handler_horizontal_html_css', 'clientY', $event)"></div>
            <div class="window bottom" v-bind:style="{ height: 100 - HtmlWarpperHeight + '%' }">
                <CssCodeMirror v-on:cssChange="cssChange" />
            </div>
        </div>
        <div class="handler handler_vertical" v-bind:style="{ left: HtmlCssWarpperWidth + '%', height: innerHeight - 40 + 'px'}" v-on:mousedown="mouseDown('handler_vertical', 'clientX', $event)"></div>
        <div class="column right" v-bind:style="{ width:  100 - HtmlCssWarpperWidth + '%' }">
            <div class="window top" v-bind:style="{ height: JsWarpperHeight + '%' }">
                <JsCodeMirror v-on:jsChange="jsChange" />
            </div>
            <div class="handler handler_horizontal" v-bind:style="{}" v-on:mousedown="mouseDown('handler_horizontal_js_result', 'clientY', $event)"></div>
            <div class="window bottom" v-bind:style="{ height: 100 - JsWarpperHeight + '%' }">
                <iframe class="iframe" id="iframe" sandbox="allow-forms allow-popups allow-scripts allow-same-origin allow-modals" name="iframe" frameborder="0"></iframe>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .bin{
        position: relative;
        box-sizing: border-box;
        background-color: rgb(243, 243, 243);
    }
    .bin .handler{
        position: absolute;
        background-color: #fff;
        padding: 2px;
        cursor: row-resize;
    }
    .bin .handler_vertical{
        height: 100%;
        z-index: 200;
    }
    .bin .handler_horizontal{
        width: 100%;
        z-index: 200;
    }
    .bin .column{
        height: 100%;
    }
    .bin .left{
        position: absolute;
        left: 0;
    }
    .bin .right{
        position: absolute;
        right: 0;
    }
    .bin .window{
        width: 100%;
        box-sizing: border-box;
    }
    .iframe{
        width: 100%;
        height: 100%;
    }
</style>

<script>
    import HtmlCodeMirror from '../components/HtmlCodeMirror.vue'
    import CssCodeMirror from '../components/CssCodeMirror.vue'
    import JsCodeMirror from '../components/JsCodeMirror.vue'
    export default {
        name: 'Home',
        components: {
            HtmlCodeMirror: HtmlCodeMirror,
            CssCodeMirror: CssCodeMirror,
            JsCodeMirror: JsCodeMirror
        },
        data() {
            let { innerWidth, innerHeight } = window
            return {
                innerWidth: innerWidth,
                innerHeight: innerHeight,
                drag: {
                    currentDrag: '',
                    mode: '',
                    handler_vertical: {
                        left: 0.4,
                        clientX: 0.4
                    },
                    handler_horizontal_html_css: {
                        top: 0.5,
                        clientY: 0.5
                    },
                    handler_horizontal_js_result: {
                        top:  0.4,
                        clientY: 0.4,
                        tempTop: 0
                    }
                }
            }
        },
        mounted() {
            let iframe = document.getElementsByTagName('iframe')[0].contentWindow
            let styleNode = iframe.document.createElement('style')
            let htmlNode = iframe.document.createElement('div')
            let jsNode = iframe.document.createElement('script')
            htmlNode.id = "app"
            iframe.document.head.appendChild(styleNode)
            iframe.document.body.appendChild(htmlNode)
            iframe.document.body.appendChild(jsNode)
            window.onresize = (event) => {
                let clientHeight = (document.documentElement.scrollHeight >document.documentElement.clientHeight) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;   
                let clientWidth = (document.documentElement.scrollWidth>document.documentElement.clientWidth) ? document.documentElement.scrollWidth : document.documentElement.scrollWidth;
                if (clientWidth <= 800) {
                    return
                }
                this.innerWidth = clientWidth
                this.innerHeight = clientHeight
            }
            document.onselectstart = () => {
                return false
            }
            iframe.document.onmousemove = (event) => this.mouseMove('iframe', event)
            iframe.document.onmouseup = (event) => this.mouseUp(event)
        },
        watch: {
            innerHeight() {
                let { top: HtmlCssHandlerTop } = this.drag.handler_horizontal_html_css
                let { top: JsResultHandlerTop} = this.drag.handler_horizontal_js_result
                let { innerHeight } = this

            }
        },
        computed: {
            HtmlCssWarpperWidth() {
                return this.drag.handler_vertical.left * 100
            },
            HtmlWarpperHeight() {
                return this.drag.handler_horizontal_html_css.top * 100
            },
            JsWarpperHeight() {
                return this.drag.handler_horizontal_js_result.top * 100
            }
        },
        methods: {
            mouseDown(type, mode, event) {
                if(window.event.button != 0) return
                this.drag.currentDrag = type
                this.drag.mode = mode
                this.drag[type][mode] = event[mode]
            },
            mouseMove(doc, event) {
                if (!this.drag.currentDrag) return
                let { innerWidth, innerHeight } = this
                let { currentDrag, mode } = this.drag
                let prevClient = this.drag[currentDrag][mode]
                let nextClient = event[mode]
                if (doc === 'bin') {
                    if (mode === 'clientX') {
                        if ((this.drag[currentDrag].left < 0.15 && nextClient - prevClient < 0) || (this.drag[currentDrag].left > 0.85 && nextClient - prevClient > 0)) {
                            return
                        }
                        this.drag[currentDrag].left = this.drag[currentDrag].left + (nextClient - prevClient ) / this.innerWidth
                    } else if (mode === 'clientY') {
                        if ((this.drag[currentDrag].top < 0.15 && nextClient - prevClient < 0) || (this.drag[currentDrag].top > 0.85 && nextClient - prevClient > 0)) {
                            return
                        }
                        if (this.drag[currentDrag].tempTop != undefined) {
                            this.drag[currentDrag].tempTop = nextClient
                        }
                        this.drag[currentDrag].top = this.drag[currentDrag].top + (nextClient - prevClient) / (this.innerHeight - 40)
                    }
                    this.drag[currentDrag][mode] = nextClient
                } else if (doc === 'iframe') {
                    if (mode === 'clientX') {
                        if (this.drag[currentDrag].left > 0.85) {
                            return
                        }
                        nextClient += this.drag[currentDrag].left * this.innerWidth
                        this.drag[currentDrag].left =  nextClient / this.innerWidth
                    } else if(mode === 'clientY') {
                        if (this.drag[currentDrag].top > 0.85) {
                            return
                        }
                        nextClient +=  this.drag[currentDrag].tempTop - 20
                        this.drag[currentDrag].top = nextClient / (this.innerHeight - 40)
                    }
                }
            },
            mouseLeave(event) {
                if (!this.drag.currentDrag) return
                this.drag.currentDrag = ''
            },
            mouseUp(event) {
                if (!this.drag.currentDrag) return
                this.drag.currentDrag = ''
            },
            htmlChange(code) {
                let iframe = document.getElementsByTagName('iframe')[0].contentWindow
		        iframe.document.getElementById('app').innerHTML = code
            },
            cssChange(code) {
                let iframe = document.getElementsByTagName('iframe')[0].contentWindow
                iframe.document.head.getElementsByTagName('style')[0].innerHTML = code
            },
            jsChange(value) {
                let iframe = document.getElementsByTagName('iframe')[0].contentWindow
                let code = `
                    try{
                        ${value}
                    } catch(e) {
                        console.log(e)
                    }
                `
                iframe.document.body.getElementsByTagName('script')[0].innerHTML = code
                iframe.eval(code)
            }
        }
    }
</script>


