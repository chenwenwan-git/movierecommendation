<template>
<div class="container">
  <div class="headerbox">
    <div class="leftimg">
        <img src="@/assets/3.png" alt="">
    </div>
    <div class="rightinfo">
        <div class="moviename" style="font-size: 40px;">电影</div>
        <div>导演：</div>
        <div>导演：</div>
        <div>导演：</div>
        <div>导演：</div>
        <div>导演：</div>
    </div>
  </div>
  <div class="comment">
    pingl
  </div>
</div>

</template>

<style scoped>
.headerbox {
  width: 100%;
  height: 500px; 
  
 
   position: relative;
   display: flex;
   justify-content: flex-start;
   align-items: flex-start;
 
  
}
.headerbox::before{
    content:'';
    background-image: url('@/assets/3.png'); 
  background-size: cover;
  background-position: center;
  filter:blur(7px);
  position: absolute;
  top:0;
  bottom: 0;
  right:0;
  left:0;
  z-index:-1;
    
}
 .leftimg{
    width: 300px;
    height: 500px;
    margin-top: 20px;
    margin-left: 20px;
    img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
  }
  .rightinfo{
    color:white;
    margin-left: 200px;
  }
  .comment{
    height: 900px;
  }
</style>