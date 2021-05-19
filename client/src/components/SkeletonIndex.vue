
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
    :height="681"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    style="margin-top:85px"
  >
    <circle cx="20" cy="540" r="20" /> 
    <circle cx="20" cy="600" r="20" /> 
    <circle cx="20" cy="660" r="20" /> 

    <rect x="45" y="0" rx="2" ry="2" width="625" height="1" /> 
    <rect x="45" y="680" rx="2" ry="2" width="625" height="1" /> 
    <rect x="45" y="0" rx="2" ry="2" width="1" height="680" /> 
    <rect x="670" y="0" rx="2" ry="2" width="1" height="680" /> 

    <rect x="258" y="23" rx="6" ry="6" width="200" height="20" /> 
    <rect x="54" y="58" rx="0" ry="0" width="608" height="1" /> 
    <rect x="54" y="59" rx="0" ry="0" width="608" height="608" /> 

    <circle cx="710" cy="34" r="16" /> 
    <rect x="730" y="28" rx="2" ry="2" width="160" height="14" /> 
    <rect x="950" y="30" rx="2" ry="2" width="30" height="10" />
    <rect x="690" y="58" rx="0" ry="0" width="300" height="1" /> 

    <rect x="690" y="80" rx="2" ry="2" width="300" height="5" /> 
    <rect x="690" y="100" rx="2" ry="2" width="300" height="5" /> 
    <rect x="690" y="120" rx="2" ry="2" width="300" height="5" /> 
    <rect x="690" y="140" rx="2" ry="2" width="30" height="5" /> 
  </content-loader>
</template>