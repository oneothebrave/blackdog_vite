<template>
  hellp
</template>

<script>
import { onBeforeMount } from 'vue';
import axios from "axios";
export default {
    setup(){
        onBeforeMount(() => {
            debugger
            axios
                .get("/api/user/auth")
                .then((response) => {
                    debugger
                })
                .catch((err) => {
                    debugger
                })
        })
    }

}
</script>

<style>

</style>