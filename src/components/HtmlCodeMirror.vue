<template>
    <div class="codemirror">
        <div class="menu">
            <DropMenu v-bind:type= "'HTML'" />
        </div>
        <codemirror v-model="code" v-bind:options="editorOptions" v-on:change="codeChange"></codemirror>
    </div>
</template>

<style scoped>
    .codemirror{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .codemirror .menu{
        position: absolute;
        z-index: 999;
        top: 10px;
        right: 10px;
    }
</style>

<script>
    import MirrorLine from './MirrorLine.vue'
    import DropMenu from './DropMenu.vue'
    import 'codemirror/addon/selection/active-line.js'
    import 'codemirror/addon/edit/closetag.js'
    export default {
        name: 'HtmlBin',
        components: {
            HtmlMirrorLine: MirrorLine,
            DropMenu: DropMenu
        },
        data() {
            return {
                code: ``,
                editorOptions: {
                    tabSize: 4,
                    mode: 'text/html',
                    styleActiveLine: true,
                    lineNumbers: true,
                    autoCloseTags: true,
                    line: true,
                    theme: 'rubyblue'
                }
            }
        },
        methods: {
            codeChange(newCode) {
                this.code = newCode
                this.$emit('htmlChange', this.code)
            }
        }
    }
</script>
