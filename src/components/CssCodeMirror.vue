<template>
    <div class="codemirror">
        <div class="menu">
            <DropMenu v-bind:type= "'CSS'" />
        </div>
        <codemirror v-model="code" v-bind:options="editorOptions" v-on:change="codeChange"></codemirror>
    </div>
</template>

<style scoped>
    .codemirror{
        position: relative;
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
    import DropMenu from './DropMenu.vue'
    import 'codemirror/addon/selection/active-line.js'
    export default {
        name: 'CssCodeMirror',
        components: {
            DropMenu: DropMenu
        },
        data() {
            return {
                code: ``,
                editorOptions: {
                    tabSize: 4,
                    styleActiveLine: true,
                    lineNumbers: true,
                    line: true,
                    mode: 'text/css',
                    theme: 'rubyblue'
                }
            }
        },
        methods: {
            codeChange(newCode) {
                this.code = newCode
                this.$emit('cssChange', this.code)
            }
        }
    }
</script>
