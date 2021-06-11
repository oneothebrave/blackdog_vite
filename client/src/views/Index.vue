<template>
  <Nav />
    <!-- vue3的异步加载组建  default插槽放的是异步加载完成后的数据   fallback插槽放的是在加载时显示的内容。比如骨架屏 -->
    <Suspense>  
      <template #default>
          <WorkBox />
      </template>
      <template #fallback>
          <SkeletonIndex />
      </template>
    </Suspense>
</template>

<script>
import SkeletonIndex from "../components/SkeletonIndex.vue"
import Nav from "../components/Nav.vue";
import WorkBox from "../components/WorkBox.vue";
import { onBeforeMount } from 'vue';
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  components: {
    Nav,
    WorkBox,
    SkeletonIndex
  },
  setup() {
    const router = useRouter();
    onBeforeMount(() => {
      axios
        .get("/api/user/auth", {
          headers: {
            "auth-token": localStorage["auth-token"],
          },
        })
        .catch((err) => {
          // 验证不通过就跳回到Login页面
          router.push({
            name: "Login",
          });
        });
    });
    return {
      
    }
  }
};
</script>

<style>
</style>