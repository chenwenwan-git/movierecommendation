<script setup>
const props = defineProps({
  moviedata: {
    type: Object,
    required: true
  }
})

</script>

<template>
    <div class="container">

        <div class="moviephoto">
            <img :src="props.moviedata.postUrl" alt="">
        </div>
        <div class="movieinfo">
            <div class="moviename">
                {{ props.moviedata.movieName }}
            </div>
            <div class="moviestar">{{props.moviedata.movieScore}}</div>
            <div class="info">
                <div>导演：{{props.moviedata.director}}</div>
                <div>导演：</div>
                <div>导演：</div>
                <div>导演：</div>

            </div>
        </div>

    </div>


</template>

<style lang="scss" scoped>
    .container{
        height: 200px;
        display: flex;
        
        justify-content: flex-start;
        align-items: center;
    }
    .moviephoto{
        width: 150px;
        height: 200px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
    }
    .movieinfo{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 20px;
        .info{
            padding:10px;
            border-left: 1px solid gray;
        }
    }


</style>