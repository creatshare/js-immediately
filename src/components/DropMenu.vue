<template>
    <div class="drop-down">
        <span class="label" v-bind:class="{ 'label-active': isFocus }" v-on:mouseover="focusBtn()" v-on:mouseleave="blurBtn()" v-on:click="showDropMenu()">{{type}}</span>
        <div class="drop-menu" v-bind:style="{ display: isDrop ? 'block' : 'none' }">
            <a href="#">HTML5</a>
            <a href="#">HTML4</a>
        </div>
    </div>
</template>

<style scoped>
    .drop-down{
        position: relative;
    }
    .drop-down .label{
        box-sizing: content-box;
        font-size: 1.2em;
        padding: 0 5px;
        cursor: pointer;
        color:#89908d;
        border: 2px solid rgb(243, 243, 243);
        border-radius: 5px;
    }
    .drop-down .label-active{
        color: #42b983;
        border: 2px solid #42b983;
    }
    .drop-menu{
        position: absolute;
        top: 25px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(19, 37, 47, 0.65);
    }
    .drop-menu > a{
        color: #89908d;
        display: block;
        padding: 5px 10px;
    }
    .drop-menu > a:hover{
        color: #42b983;
    }
</style>

<script>
    export default {
        name: 'DropMenu',
        data() {
            return {
                isFocus: false,
                isDrop: false,
            }
        },
        props: ['type'],
        methods: {
            focusBtn() {
                //this.isFocus = true
            },
            showDropMenu() {
                //this.isDrop = !this.isDrop
            },
            blurBtn() {
                /*if (this.isDrop) {
                    return
                }
                this.isFocus = false*/
            }
        }
    }
</script>
