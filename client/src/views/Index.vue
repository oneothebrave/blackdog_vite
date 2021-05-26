<template>
  <Toast position="bottom-left" group="bl" />
  <Nav />
  <Skeleton v-if="showSkeleton" />
  <div class="contents" v-if="!showSkeleton">
    <WorkBox v-for="work in works" :key="work._id" :work="work" />
  </div>
</template>

<script>
import Skeleton from "../components/SkeletonIndex.vue";
import Nav from "../components/Nav.vue";
import WorkBox from "../components/WorkBox.vue";
import { onBeforeMount, onMounted, onUnmounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useToast } from "primevue/usetoast";
export default {
  components: {
    Nav,
    WorkBox,
    Skeleton,
  },
  setup() {
    const router = useRouter();
    const works = reactive([]);
    let ready4load = true;
    let skip = ref(0);
    const showSkeleton = ref(true);
    const toast = useToast();
    onBeforeMount(() => {
      axios
        .get("/api/user/auth", {
          headers: {
            "auth-token": localStorage["auth-token"],
          },
        })
        .then((response) => {
          loadData();
        })
        .catch((err) => {
          // 验证不通过就跳回到Login页面
          router.push({
            name: "Login",
          });
        });
    });

    // 获取数据
    function loadData() {
      if (ready4load) {
        // 需要加载才能进来，进来就“锁”上
        ready4load = false;
        // 获取作品除了图片之外的其他信息
        axios
          .get("/api/retrieve/getBasic", {
            params: {
              skip: skip.value,
            },
          })
          .then(async (res) => {
            const data = res.data;
            let work_index = 0;
            for (; work_index < data.length - 1; work_index++) {
              works.push({
                _id: data[work_index]._id,
                workName: data[work_index].workName,
                // workFile: data[work_index].workFile,
                workIntro: data[work_index].workIntro,
                authorAvatar: data[work_index].authorAvatar,
                authorName: data[work_index].authorName,
              });
            }
            showSkeleton.value = false;

            // 获取作品图片
            await axios // 防止这个还没跑完就去执行下面的then
              .get("/api/retrieve/getWorkFile", {
                params: {
                  skip: skip.value,
                },
              })
              .then((res) => {
                // 将作品图片放进works里
                for (
                  let workFileIndex = skip.value, index=0;
                  workFileIndex < works.length;
                  workFileIndex++, index++
                ) {
                  works[workFileIndex]["workFile"] =
                    res.data[index]["workFile"];
                }
                skip.value += data[work_index].limitNum;
                ready4load = true; // 加载完之后开“锁”，允许下一次
              });
           
          })
          // .then((res) => {
          //   skip.value += res["data"][res["work_index"]].limitNum;
          //   ready4load = true; // 加载完之后开“锁”，允许下一次
          // })
          .catch((err) => {
            if(err.response.status == 403){
               toast.add({severity:'error', summary: '你得支棱起来呀', detail:'别再刷了，今天刷地够多了.',group: 'bl', life: 3000});
               ready4load = false;
            }
          });
      }
    }

    const scrollHandler = function () {
      const scrollHeight = document.documentElement.scrollHeight; // 页面总高度
      const scrollTop = document.documentElement.scrollTop; // 可视区与页面顶部的距离
      const clientHeight = document.documentElement.clientHeight; // 可视区的高度

      const distance2bottom = scrollHeight - scrollTop - clientHeight; //可视区离页面底部的距离

      if (distance2bottom < 500) {
        loadData();
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", scrollHandler, false);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", scrollHandler, false);
    });

    // const works = [
    //     {"_id": 1, "workName": "el3", "workFile": "/static/el3.jpg", "authorAvatar": "/static/el3.jpg", "authorName": "mario9", "workIntro": "This one takes the cake for the sheer number of “thirteen ways of looking at x” knockoffs that I’ve seen. But please see also: “The Emperor of Ice-Cream.”"},
    //     {"_id": 2, "workName": "el2", "workFile": "/static/el2.jpg", "authorAvatar": "/static/el2.jpg", "authorName": "mario8", "workIntro": "To be quite honest, my favorite Plath poem is “The Applicant.” But “Daddy” is still the most iconic, especially if you’ve ever heard her read it aloud."},
    //     {"_id": 3, "workName": "el1", "workFile": "/static/el1.jpg", "authorAvatar": "/static/el1.jpg", "authorName": "mario7", "workIntro": "One of the defining works of the Harlem Renaissance, by its greatest poet. It also, of course, gave inspiration and lent a workName to another literary classic: Lorraine Hansberry’s A Raisin in the Sun."},
    //     {"_id": 4, "workName": "l2", "workFile": "/static/l2.jpg", "authorAvatar": "/static/l2.jpg", "authorName": "mario6", "workIntro": "The truth is, there are lots of equally iconic Dickinson poems, so consider this a stand-in for them all. Though, as Jay Parini has noted, this poem is perfect, “one of Dickinson’s most compressed and chilling attempts to come to terms with mortality.”"},
    //     {"_id": 5, "workName": "阿尔卑斯山", "workFile": "/static/l1.jpg", "authorAvatar": "/static/l1.jpg", "authorName": "mario5", "workIntro": "Bishop’s much loved and much discussed ode to loss, which Claudia Roth Pierpont called “a triumph of control, understatement, wit. Even of self-mockery, in the poetically pushed rhyme word “vaster,” and the ladylike, pinkies-up “shan’t.” An exceedingly rare mention of her mother—as a woman who once owned a watch. A continent standing in for losses larger than itself.”"},
    //     {"_id": 6, "workName": "m2", "workFile": "/static/m2.jpg", "authorAvatar": "/static/m2.jpg", "authorName": "mario4", "workIntro": "This blew my mind in high school, and I wasn’t the only one."},
    //     {"_id": 7, "workName": "m1", "workFile": "/static/m1.jpg", "authorAvatar": "/static/m1.jpg", "authorName": "mario3", "workIntro": "Otherwise known as “the most misread poem in America.” See also: “Stopping by Woods on a Snowy Evening.” And “Birches.” All begin in delight and end in wisdom, as Frost taught us great poems should."},
    //     {"_id": 8, "workName": "s2", "workFile": "/static/s2.jpg", "authorAvatar": "/static/s2.jpg", "authorName": "mario2", "workIntro": "Without a doubt one of the most important poems of the 20th century. “It has never lost its glamour,” Paul Muldoon observed. “It has never failed to be equal to both the fracture of its own era and what, alas, turned out to be the even greater fracture of the ongoing 20th century and now, it seems, the 21st century.” See also: “The Love Song of J. Alfred Prufrock.”"},
    //     {"_id": 9, "workName": "s1", "workFile": "/static/s1.jpg", "authorAvatar": "/static/s1.jpg", "authorName": "mario", "workIntro": "The most anthologized poem of the last 25 years for a reason. See also: “This is Just to Say,” which, among other things, has spawned a host of memes and parodies."}
    // ];
    return {
      works,
      showSkeleton,
    };
  },
};
</script>

<style>
</style>