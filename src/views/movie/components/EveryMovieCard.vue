<template>
    <div class="container">

        <div class="moviephoto">
            <img src="@/assets/1.png" alt="">
        </div>
        <div class="movieinfo">
            <div class="moviename">
                智能大反攻
            </div>
            <div class="moviestar">1111</div>
            <div class="info">
                <div>导演：</div>
                <div>导演：</div>
                <div>导演：</div>
                <div>导演：</div>

            </div>
        </div>

    </div>


</template>

<style scoped>
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