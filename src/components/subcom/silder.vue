<template>
    <div class="temp">
        <!-- 轮播图组件 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in imgs" :key="item.id">
                <img v-bind:src="item.img">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
  export default {
   props:['imgs']
  }
</script>
<style scoped>
    .mint-swipe {
        height: 300px;
    }
    .mint-swipe-item img {
        width: 100%;
        height: 100%
    }
</style>
