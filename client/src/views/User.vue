<template>
  <Nav />
  <div class="p-grid myInfo">
    <!-- 头像 -->
    <div class="p-col-2 p-md-2 p-lg-2">
      <div class="myAvatar">
        <img :src="thisUser.avatar"  />
      </div>
    </div>
    <!-- 信息 -->
    <div
      class="p-col-8 p-md-8 p-lg-8 p-text-left"
      style="padding: 2rem 1rem 0px 2rem;"
    >
      <div class="p-grid p-flex-column">
        <div class="p-grid">
          <div class="p-col-10 p-md-10 p-lg-10">
            <div class="p-text-bold" id="myName">{{ thisUser.username }}</div>
          </div>
          <div class="p-col-1 p-md-1 p-lg-1">
            <Button
              icon="pi pi-cog"
              class="p-button-rounded p-button-danger"
            />
          </div>
        </div>
        <div class="p-text-light">
          <p class="aboutMe">
            This one takes the cake for the sheer number of “thirteen ways of
            looking at x” knockoffs that I’ve seen.
          </p>
        </div>
      </div>
    </div>
    <!-- 数据 -->
    <div class="p-col-2 p-md-2 p-lg-2 p-text-right myData">
      <p>
        <span class="p-text-bold">{{ myPicsNum }}</span
        >&nbsp;照片
      </p>
      <p>
        <span class="p-text-bold">{{ myFollowersNum }}</span
        >&nbsp;粉丝
      </p>
      <p>
        <span class="p-text-bold">{{ myFollowingsNum }}</span
        >&nbsp;关注
      </p>
    </div>
  </div>

  <TabView class="tabview-custom">
    <TabPanel>
      <template #header>
        <i class="pi pi-bookmark"></i>
        <span>&nbsp;帖子</span>
      </template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-star-o"></i>
        <span>&nbsp;收藏</span>
      </template>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
        ab illo inventore veritatis et quasi architecto beatae vitae dicta
        sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
        qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit,
        sed quia non numquam eius modi.
      </p>
    </TabPanel>
  </TabView>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
// useRouter和useRoute两个方法
// 秉承谁长谁先死,Router 长 所以他负责跳转,Route 负责接收数据 ； 
// 传参使用query和params，主要区别就是前者使用path进行跳转，后者使用name进行跳转
import { useRoute, useRouter } from "vue-router";
import Nav from "../components/Nav.vue";
import axios from 'axios';
export default {
  components: { Nav },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const thisUser = ref({}); // 当前查看的用户
    onBeforeMount(() => {
      let username = route.params.username;
      axios
        .post("/api/user/usernameExist",{
          username: username
        })
        .then((res) => {
          thisUser.value.avatar = res.data.avatar;
          thisUser.value.username = res.data.username;
        })
        .catch((err) => {
          router.push({
            name: "NotFound",
            params: {notfound:route.path.split("/")[1]}
          })
        })
    });


    var myPicsNum = 1;
    var myFollowersNum = 2;
    var myFollowingsNum = 3;

    return {
      myPicsNum,
      myFollowersNum,
      myFollowingsNum,
      thisUser
    };
  },
};
</script>

<style lang="sass">
.myInfo
    height: 210px
    line-height: 25px
    margin-top: 10rem
    
    #myName
        font-size: 26px
        color:#fff

    .myAvatar
        width: 100%
        height: auto
        & img
            width: 100%
            height: auto
            border-radius: 50%
    
    .aboutMe
        color: rgba(255, 255, 255, 0.6)
    
    .myData
        p
            color: rgba(255, 255, 255, 0.6)
            span
                color: #3F51B5



.p-tabview .p-tabview-nav
    justify-content: center
    background: none


    & li.p-highlight .p-tabview-nav-link
        background: none !important


    & .p-tabview-nav-link
        background: none !important
        border-width: 1px 0 0 0 !important
        border-top-right-radius: 0 !important
        border-top-left-radius: 0 !important

.p-tabview .p-tabview-panels
    background: none

.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus
    box-shadow: none
</style>