<template>
    <div class="panel">
        <a href="/" class="logo">
            <img src="../assets/logo.png" alt="logo">
            <span>JS Immediately</span>
        </a>
    </div>
</template>

<style scoped>
    .panel{
        box-shadow: 0 0 5px rgba(19, 37, 47, 0.65);
        box-sizing: border-box;
        height: 40px;
    }
    .panel .logo{
        display: inline-block;
        font-size: 1.5em;
        padding: 5px 10px;
        line-height: 30px;
    }
    .panel .logo > img{
        width: 30px;
        vertical-align: middle;
    }
    .panel .logo > span{
        margin-left: 10px;
        color: #000;
        font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    }
</style>

<script>
    export default {
        name: 'Panel'
    }
</script>
