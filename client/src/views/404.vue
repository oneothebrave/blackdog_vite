<template>
  <Nav />
  <div class="notfound"><img src="static/404.jpg"></div>
  
</template>

<script>
import Nav from "../components/Nav.vue"
export default {
    components: {
        Nav
    },

}
</script>

<style scoped lang="sass">
.notfound
    position: absolute
    left:0
    height: 100%
    width: 100%
    img
        width:100%
        height: 100%
        object-fit: cover

</style>