
<script>
  import { ContentLoader } from "vue-content-loader"
    import Nav from "./Nav.vue";

  export default {
    components: { ContentLoader,Nav }
  }
</script>

<template>
<Nav/>
  <content-loader
    :width="1040"
    :height="2300"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    style="margin-top:85px"
  >
    <!-- 第一个 -->
    <!-- 三连 -->
    <circle cx="20" cy="540" r="20" /> 
    <circle cx="20" cy="600" r="20" /> 
    <circle cx="20" cy="660" r="20" /> 
    <!-- 图片标题外面的框 -->
    <rect x="45" y="0" rx="2" ry="2" width="625" height="1" /> 
    <rect x="45" y="680" rx="2" ry="2" width="625" height="1" /> 
    <rect x="45" y="0" rx="2" ry="2" width="1" height="680" /> 
    <rect x="670" y="0" rx="2" ry="2" width="1" height="680" /> 
    <!-- 标题，分割线，图片 -->
    <rect x="258" y="23" rx="6" ry="6" width="200" height="20" /> 
    <rect x="54" y="58" rx="0" ry="0" width="608" height="1" /> 
    <rect x="54" y="59" rx="0" ry="0" width="608" height="608" /> 
    <!-- 作者头像，名字，点点点，分割线 -->
    <circle cx="710" cy="34" r="16" /> 
    <rect x="730" y="28" rx="2" ry="2" width="160" height="14" /> 
    <rect x="950" y="30" rx="2" ry="2" width="30" height="10" />
    <rect x="690" y="58" rx="0" ry="0" width="300" height="1" /> 
    <!-- 作品简介 -->
    <rect x="690" y="80" rx="2" ry="2" width="300" height="5" /> 
    <rect x="690" y="100" rx="2" ry="2" width="300" height="5" /> 
    <rect x="690" y="120" rx="2" ry="2" width="300" height="5" /> 
    <rect x="690" y="140" rx="2" ry="2" width="30" height="5" /> 


    <!-- 第二个 -->
    <!-- 三连 -->
    <circle cx="20" cy="1320" r="20" /> 
    <circle cx="20" cy="1380" r="20" /> 
    <circle cx="20" cy="1440" r="20" /> 
    <!-- 图片标题外面的框 -->
    <rect x="45" y="780" rx="2" ry="2" width="625" height="1" /> 
    <rect x="45" y="1460" rx="2" ry="2" width="625" height="1" /> 
    <rect x="45" y="780" rx="2" ry="2" width="1" height="680" /> 
    <rect x="670" y="780" rx="2" ry="2" width="1" height="680" /> 
    <!-- 标题，分割线，图片 -->
    <rect x="258" y="803" rx="6" ry="6" width="200" height="20" /> 
    <rect x="54" y="838" rx="0" ry="0" width="608" height="1" /> 
    <rect x="54" y="839" rx="0" ry="0" width="608" height="608" /> 
    <!-- 作者头像，名字，点点点，分割线 -->
    <circle cx="710" cy="814" r="16" /> 
    <rect x="730" y="808" rx="2" ry="2" width="160" height="14" /> 
    <rect x="950" y="810" rx="2" ry="2" width="30" height="10" />
    <rect x="690" y="838" rx="0" ry="0" width="300" height="1" /> 
    <!-- 作品简介 -->
    <rect x="690" y="860" rx="2" ry="2" width="300" height="5" /> 
    <rect x="690" y="880" rx="2" ry="2" width="300" height="5" /> 
    <rect x="690" y="900" rx="2" ry="2" width="300" height="5" /> 
    <rect x="690" y="920" rx="2" ry="2" width="30" height="5" /> 

    <!-- 第三个 -->
    <!-- 三连 -->
    <circle cx="20" cy="2100" r="20" /> 
    <circle cx="20" cy="2160" r="20" /> 
    <circle cx="20" cy="2220" r="20" /> 
    <!-- 图片标题外面的框 -->
    <rect x="45" y="1560" rx="2" ry="2" width="625" height="1" /> 
    <rect x="45" y="2240" rx="2" ry="2" width="625" height="1" /> 
    <rect x="45" y="1560" rx="2" ry="2" width="1" height="680" /> 
    <rect x="670" y="1560" rx="2" ry="2" width="1" height="680" /> 
    <!-- 标题，分割线，图片 -->
    <rect x="258" y="1583" rx="6" ry="6" width="200" height="20" /> 
    <rect x="54" y="1618" rx="0" ry="0" width="608" height="1" /> 
    <rect x="54" y="1619" rx="0" ry="0" width="608" height="608" /> 
    <!-- 作者头像，名字，点点点，分割线 -->
    <circle cx="710" cy="1594" r="16" /> 
    <rect x="730" y="1588" rx="2" ry="2" width="160" height="14" /> 
    <rect x="950" y="1590" rx="2" ry="2" width="30" height="10" />
    <rect x="690" y="1618" rx="0" ry="0" width="300" height="1" /> 
    <!-- 作品简介 -->
    <rect x="690" y="1640" rx="2" ry="2" width="300" height="5" /> 
    <rect x="690" y="1660" rx="2" ry="2" width="300" height="5" /> 
    <rect x="690" y="1680" rx="2" ry="2" width="300" height="5" /> 
    <rect x="690" y="1700" rx="2" ry="2" width="30" height="5" /> 
  </content-loader>
</template>