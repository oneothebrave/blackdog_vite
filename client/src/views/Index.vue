<template>
  <Nav />

  <!-- <div class="contents">
    <PicBox v-for="pic in picInfo" :key="pic.id" :pic="pic" />
  </div> -->
</template>

<script>
import Nav from "../components/Nav.vue"
import { onBeforeMount } from 'vue';
import { useRouter } from "vue-router";
import axios from "axios";
export default {
    components:{
        Nav
    },
    setup(){
        const router = useRouter();
        onBeforeMount(() => {
            axios
                .get("/api/user/auth",
                    {
                        headers: {
                            "auth-token": localStorage["auth-token"]
                        }
                    }
                )
                .then((response) => {
                    debugger
                })
                .catch((err) => {
                    // 验证不通过就跳回到Login页面
                    router.push({
                        name: "Login"
                    });
                })
        })
    }

}
</script>

<style>

</style>