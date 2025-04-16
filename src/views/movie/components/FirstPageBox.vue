<template>
    <div class="container">
        <div class="header">
            最多人看……
        </div>
        <div class="content">
            
                <div class="movie-box" v-for="item in 6" :key="item">
                    <img src="/src/assets/1.png" alt="Movie Poster" class="movie-poster" />
                    <div class="movie-title">电影标题</div>
                    <div class="movie-rating">评分：8.5</div>
                </div>
            
        </div>
    </div>
</template>

<style scoped>
.container{
    width: 90vw;
    /* height: 600px; */
    margin:0 auto;
    margin-top: 50px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 20px;
}
.header{
    margin-top: 20px;
    height: 50px;
    width: 100%;
    font-size: 30px;
    color:red;
    font-weight: bold;
    text-align: left;
}
.content{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /* overflow: hidden; */
    margin-bottom: 20px;
}
.movie-box {
    width: 200px;
    height: 300px;
    margin: 20px;
    
    text-align: center;

    img{
         height: 300px;
        width: 200px;
    }
}
</style>