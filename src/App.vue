<template>
    <div id="app">
        <Panel/>
        <router-view/>
    </div>
</template>

<script>
    import Panel from './components/Panel.vue'
    export default {
        name: 'app',
        components: {
            Panel: Panel
        }
    }
</script>

<style>
    body{
        font-size: 13px;
        overflow: hidden;
        min-width: 1200px;
    }
    a{
        text-decoration: none;
    }
    #app {
        font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #42b983;
    }
</style>
