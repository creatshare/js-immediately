<template>
    <div class="code-mirror-line">
        <span>1</span>
        <span>2</span>
    </div>
</template>

<style scoped>
    .code-mirror-line{
        width: 34px;
        height: 100%;
        border-right: 1px solid #42b983;
    }
    .code-mirror-line > span{
        width: 100%;
        box-sizing: border-box;
        line-height: 19px;
        text-align: center;
        display: block;
    }
</style>

<script>
    export default {
        name: 'MirrorLine'
    }
</script>

