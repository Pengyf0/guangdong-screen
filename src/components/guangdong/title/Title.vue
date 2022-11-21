<template>
    <div class="gzTitle">
        <span class="shu"></span>
        <img :src="img" alt="">
        <div class="text">{{ text }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {


        }
    },
    props: {
        text: {
            type: String,
            default: '111'
        },
        img: {
            type: String,
            default: ''
        }
    }
}
</script>
 
<style lang = "less" scoped>
.gzTitle {
    width: 100%;
    height: 36px;
    background: linear-gradient(90deg, rgba(255, 159, 0, 0.63) 0%, rgba(255, 102, 0, 0) 65%);
    text-align: left;
    display: flex;
    align-items: center;

    .shu {
        width: 2px;
        height: 22px;
        background: #FFFFFF;

    }

    img {
        margin: 0 8px;
    }

    .text {
        font-size: 18px;
        font-family: PingFang SC;
    }
}
</style>