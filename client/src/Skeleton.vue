
<script>
  import { ContentLoader } from "vue-content-loader"
    import Nav from "./components/Nav.vue";

  export default {
    components: { ContentLoader,Nav }
  }
</script>

<template>
<Nav/>
  <content-loader
    :width="1040"
    :height="420"
    :speed="2"
    primaryColor="lightblue"
    secondaryColor="#ecebeb"
  >
    <circle cx="20" cy="280" r="20" /> 
    <circle cx="20" cy="340" r="20" /> 
    <circle cx="20" cy="400" r="20" /> 

    <rect x="45" y="38" rx="0" ry="0" width="625" height="18" /> 
    <rect x="45" y="66" rx="2" ry="2" width="625" height="410" /> 

    <circle cx="690" cy="47" r="15" /> 
    <rect x="690" y="42" rx="2" ry="2" width="200" height="10" /> 
    <rect x="930" y="42" rx="2" ry="2" width="30" height="10" />
    <rect x="659" y="70" rx="0" ry="0" width="300" height="1" /> 
    <rect x="660" y="90" rx="2" ry="2" width="300" height="5" /> 

    <!-- <rect x="660" y="110" rx="2" ry="2" width="300" height="5" /> 
    <rect x="660" y="130" rx="2" ry="2" width="300" height="5" /> 
    <rect x="660" y="150" rx="2" ry="2" width="300" height="5" /> 
    <rect x="660" y="170" rx="2" ry="2" width="50" height="5" />  -->
  </content-loader>
</template>