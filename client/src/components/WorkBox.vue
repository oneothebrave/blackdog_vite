<template>
  <TieredMenu ref="poi" :model="poi_menu" :popup="true" />
  <Toast position="bottom-left" group="bl" />
  <div class="p-grid top-blank" v-for="work in works" :key="work._id">
    <section class="p-col-1 work-triple-container">
      <div class="work-triple">
        <div>
          <Button
            icon="pi pi-heart"
            class="p-button-rounded p-button-outlined"
            @click="toggleTriple"
          />
        </div>
        <div>
          <Button
            icon="pi pi-star-o"
            class="p-button-rounded p-button-outlined"
            @click="toggleTriple"
          />
        </div>
        <div>
          <Button
            icon="pi pi-dollar"
            class="p-button-rounded p-button-outlined"
            @click="toggleTriple"
          />
        </div>
      </div>
    </section>
    <section class="p-col-8 work-main-container">
      <div class="work-title">
        {{ work.workName }}
      </div>
      <div class="work-work" :style="{height:  work.isSmallImg == false && (605 * work.workFileHeight / work.workFileWidth + 'px')}">
        <img 
          :src="work.workFile" 
          :style="{width: work.workFileWidth + 'px' , height: work.workFileHeight + 'px'}" 
          :class="{img_small: work.isSmallImg, img_big: !work.isSmallImg }"
        />
        <!-- <img v-lazyload="work.workFile" /> -->
      </div>
    </section>
    <section class="p-col work-comment-container">
      <div class="work-author p-grid">
        <div class="author-head p-col-fixed">
          <img :src="work.authorAvatar" />
        </div>
        <div class="author-name p-col p-text-left">
          <span>{{ work.authorName }}</span>
        </div>
        <div class="author-operate p-col-1" @click="togglePoi">
          <i class="pi pi-ellipsis-h"></i>
        </div>
      </div>
      <div class="work-info p-text-left">
        <ScrollPanel style="width: 100%; max-height: 120px">
          <p>{{ work.workIntro }}</p>
        </ScrollPanel>
      </div>
      <div class="work-comment">
        <!-- <ScrollPanel style="width: 100%; height: 200px" class="custombar1">
            <p>
                杨家有女初长成，养在深闺人未识。天生丽质难自弃，一朝选在君王侧。回眸一笑百媚生，六宫粉黛无颜色。春寒赐浴华清池，温泉水滑洗凝脂。侍儿扶起娇无力，始是新承恩泽时。云鬓花颜金步摇，芙蓉帐暖度春宵。春宵苦短日高起，从此君王不早朝。承欢侍宴无闲暇，春从春游夜专夜。后宫佳丽三千人，三千宠爱在一身。金屋妆成娇侍夜，玉楼宴罢醉和春。姊妹弟兄皆列土，可怜光彩生门户。遂令天下父母心，不重生男重生女。骊宫高处入青云，仙乐风飘处处闻。缓歌慢舞凝丝竹，尽日君王看不足。渔阳鼙鼓动地来，惊破霓裳六衣不发无奈何，宛转蛾眉马前死。花钿委地无人收。羽衣曲。九重城阙烟尘生，千乘万骑西南行。翠华摇摇行复止，西出都门百余里。 ，王翠金雀玉搔头。君王掩面救不得，回看血泪相和流。黄埃散漫风萧索，云栈萦纡登剑阁。峨嵋山下少人行，旌旗无光日色薄。蜀江水碧宫山月，圣主朝朝暮暮情。行宫见月伤心色，夜雨闻铃肠断声。天旋地转回龙驭，到此踌躇不能去。马嵬坡下泥土中，不见玉颜空死处。君臣相归尽沾衣，东望都门信马归。归来池苑皆依旧，太液芙蓉未央柳。芙蓉如面柳如眉，由此如何不泪垂。春风桃李花开夜，秋雨梧桐叶落时。西宫南梨园弟子白发新，椒房阿监青娥老。夕殿萤飞思悄然，孤灯挑尽未成眠。迟迟钟鼓初长夜，耿耿星河欲曙天。临悠道士鸿都客，能以精诚致魂魄力。为感君王放置转思，遂教方士殷勤觅食。鸳鸯瓦冷霜华重，翡翠衾寒谁与共。悠悠生死别经年，魂魄不曾来入梦。上穷碧落下黄泉，两处茫茫皆不见。忽闻海上有仙山，山在虚无缥渺间。楼阁玲珑五云起，其中绰约多仙子。中一个人字太真，雪肤花貌参差是。金阙西厢叩玉扃，转教小玉报双成。闻道汉家天子使，九华帐里梦魂惊。揽衣推枕起云鬓半偏新睡觉，花冠不整下堂来。风吹仙袂飘飖举，犹似霓裳羽衣舞。玉容寂寞泪阑干，梨花一枝春带雨。昭阳殿里恩爱绝，蓬莱宫中日月长。回头下望人寰处，不见长安见尘雾。惟将旧物表深情，钿合金钗寄将去。教留一股合一扇，钗擘黄金合分钿。但教心似金钿坚，天上人间会相见。临别殷勤重寄词，词中有誓两心知。七月七日长生殿，夜半无在天愿作比翼鸟，在地愿为连理枝。天长地久尽尽，此恨绵绵无绝期。
            </p>
        </ScrollPanel> -->
      </div>
      <!-- <div class="work-comment-input">
        <InputText type="text" placeholder="添加评论..." />
        <Button label="发送" class="p-button-text" />
      </div> -->
    </section>
  </div>
</template>

<script>
import { onMounted, onUnmounted, reactive, ref} from "vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";
// import { toRefs } from 'vue';
export default {
  props: ["worksInfo"],
  async setup(props) {
    let ready4load = true;
    const toast = useToast();
    let works = reactive([]);
    let skip = ref(0);
    const worksInfo = props.worksInfo;
    let workworkWidth = 0;
    const workworkHeight = 200;

    onMounted(() => {
      window.addEventListener("scroll", scrollHandler, false);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", scrollHandler, false);
    });

    // 获取数据
    const loadData = async function () {
      if (ready4load) {
        // 需要加载才能进来，进来就“锁”上
        ready4load = false;
        // 获取作品
        await axios
          .get("/api/retrieve/getWork", {
            params: {
              skip: skip.value,
            },
          })
          .then(async (res) => {
            const sql_data = res.data;
            let work_index = 0;
            workworkWidth = document.getElementsByClassName('work-work')[0].offsetWidth;
            for (; work_index < sql_data.length - 1; work_index++) {
              let workFileWidth = sql_data[work_index].workFileWidth;
              let workFileHeight = sql_data[work_index].workFileHeight;
              works.push({
                _id: sql_data[work_index]._id,
                workName: sql_data[work_index].workName,
                workIntro: sql_data[work_index].workIntro,
                workFile: sql_data[work_index].workFile,
                workFileWidth: workFileWidth,
                workFileHeight: workFileHeight,
                authorAvatar: sql_data[work_index].authorAvatar,
                authorName: sql_data[work_index].authorName,
                isSmallImg: workFileWidth < workworkWidth && workFileHeight < workworkHeight
              });
            }
            ready4load = true; // 加载完之后开“锁”，允许下一次
            skip.value += sql_data[work_index].limitNum;
          })
          .catch((err) => {
            if (err.response.status == 403) {
              toast.add({
                severity: "error",
                summary: "木得了",
                detail: "真的一张都不剩了",
                group: "bl",
                life: 3000,
              });
              ready4load = false;
            }
          });
      }
    };

    await loadData();

    const scrollHandler = function () {
      const scrollHeight = document.documentElement.scrollHeight; // 页面总高度
      const scrollTop = document.documentElement.scrollTop; // 可视区与页面顶部的距离
      const clientHeight = document.documentElement.clientHeight; // 可视区的高度

      const distance2bottom = scrollHeight - scrollTop - clientHeight; //可视区离页面底部的距离
      if (distance2bottom < 800) {
        loadData();
      }
    };

    //三连
    const toggleTriple = (event) => {
      const currentClass = event.target.className;
      event.target.className = currentClass.includes("p-button-outlined")
        ? currentClass.replace("p-button-outlined", "")
        : `${currentClass} p-button-outlined`;
    };

    //poi: person of interest  关注/拉黑/举报...某人
    const poi = ref(null);
    const togglePoi = (event) => {
      poi.value.toggle(event);
    };

    const poi_menu = [
      {
        label: "关注",
        icon: "pi pi-plus",
      },
      {
        label: "拉黑",
        icon: "pi pi-eye-slash",
      },
    ];

    return {
      toggleTriple,
      togglePoi,
      poi_menu,
      poi,
      works,
      worksInfo
    };
  },
};
</script>

<style lang="sass">
.top-blank
  margin-top: 10rem

.work-triple-container
  width: 53px
  margin-left: -50px
  text-align: right
  position: relative

.work-triple
  position: absolute
  bottom: 2px


  & div
    position: relative
    padding-top: 20px
    width: 40px
    text-align: center


  & i
    font-size: 1.3rem

.work-main-container
  position: relative
  margin: 0 auto
  background: #212121
  border-radius: 3px
  overflow: hidden
  border: 1px solid #212121


  & .work-title
    height: 45px
    padding: 16px
    align-items: center
    line-height: 18px
    font-style: italic
    font-weight: bold
    font-size: 14px
    color: var(--primary-color-text)


  & .work-work 
    min-height: 200px
    position: relative
    img
      animation: trans-bg 2s infinite
    .img_small
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      margin: auto
    .img_big
      width: 100% !important
      height: 100% !important
      object-fit: cover !important

.work-comment-container
  margin-left: 10px
  position: relative

.work-author
  border-bottom: 1px solid #303030
  padding: 4px 16px 4px 6px


  & img
    width: 32px
    height: 32px
    border-radius: 50%

.author-head img,
.author-name span,
.author-operate
  cursor: pointer

.author-name
  padding: 15px 0 0 3px


  & span
    color: var(--primary-color)

.author-operate
  padding-top: 13px

.work-info
  padding: 6px 0 6px 0
  color: #aaaaaa


  & p
    font-size: 12px

.work-comment
  max-height: 50%
  margin-bottom: 10%


  &-input
    height: 50px
    width: 98%
    position: absolute
    bottom: 0
    border-bottom: 1px solid #303030
    display: flex


  &-input input
    width: 76%
    height: 100%
    background: #181818
    border: 0
    flex: 5


  &-input input:focus
    border: 0
    flex: 1


  &-input span
    font-weight: 400
</style>