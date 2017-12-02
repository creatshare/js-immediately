<template>
    <div class="codemirror">
        <div class="menu">
            <DropMenu v-bind:type= "'JavaScript'" />
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
    import DropMenu from './DropMenu.vue'

    import 'codemirror/addon/selection/active-line.js'
    // styleSelectedText
    import 'codemirror/addon/selection/mark-selection.js'
    import 'codemirror/addon/search/searchcursor.js'
    // hint
    import 'codemirror/addon/hint/show-hint.js'
    import 'codemirror/addon/hint/show-hint.css'
    import 'codemirror/addon/hint/javascript-hint.js'
    import 'codemirror/addon/selection/active-line.js'
    // highlightSelectionMatches
    import 'codemirror/addon/scroll/annotatescrollbar.js'
    import 'codemirror/addon/search/matchesonscrollbar.js'
    import 'codemirror/addon/search/searchcursor.js'
    import 'codemirror/addon/search/match-highlighter.js'
    // keyMap
    import 'codemirror/mode/clike/clike.js'
    import 'codemirror/addon/edit/matchbrackets.js'
    import 'codemirror/addon/comment/comment.js'
    import 'codemirror/addon/dialog/dialog.js'
    import 'codemirror/addon/dialog/dialog.css'
    import 'codemirror/addon/search/searchcursor.js'
    import 'codemirror/addon/search/search.js'
    import 'codemirror/keymap/sublime.js'
    // foldGutter
    import 'codemirror/addon/fold/foldgutter.css'
    import 'codemirror/addon/fold/brace-fold.js'
    import 'codemirror/addon/fold/comment-fold.js'
    import 'codemirror/addon/fold/foldcode.js'
    import 'codemirror/addon/fold/foldgutter.js'
    import 'codemirror/addon/fold/indent-fold.js'
    import 'codemirror/addon/fold/markdown-fold.js'
    import 'codemirror/addon/fold/xml-fold.js'
    export default {
        name: 'JsCodeMirror',
        components: {
            DropMenu: DropMenu
        },
        data() {
            return {
                timeout: '',
                code: ``,
                editorOptions: {
                    tabSize: 4,
                    styleActiveLine: true,
                    lineNumbers: true,
                    line: true,
                    foldGutter: true,
                    styleSelectedText: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
                    mode: 'text/javascript',
                    // hint.js options
                    hintOptions:{
                        // 当匹配只有一项的时候是否自动补全
                        completeSingle: false
                    },
                    //快捷键 可提供三种模式 sublime、emacs、vim
                    keyMap: "sublime",
                    matchBrackets: true,
                    showCursorWhenSelecting: true,
                    theme: "rubyblue",
                    extraKeys: { "Ctrl": "autocomplete" }
                }
            }
        },
        methods: {
            codeChange(newCode) {
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.code = newCode
                    this.$emit('jsChange', this.code)
                }, 1000)
            }
        }
    }
</script>
