<template>
  <!--图片全屏预览 -->
  <!-- <div style="height: 7rem"></div> -->
  <Toast />
  <header class="p-d-flex nav-bar">
    <div class="p-grid p-jc-between nav">
      <!-- 名称 -->
      <div class="p-col-2 p-text-left">
        <router-link to="/index" class="nav-log p-text-italic p-text-bold"
          >BlackDog</router-link
        >
      </div>
      <div class="p-col-1"></div>
      <!-- 功能 -->
      <div class="p-col-4 p-text-right">
        <div class="p-d-inline-flex nav-func">
          <div class="p-mr-2 p-order-3 p-order-md-3">
            <Button icon="pi pi-comments" class="p-button-rounded p-button" />
          </div>
          <div class="p-mr-2 p-order-3 p-order-md-3">
            <Button
              icon="pi pi-upload"
              class="p-button-rounded p-button"
              @click="openDialog"
            />
            <!--modal：是否需要遮蔽罩 -->
            <Dialog
              header="发布作品"
              v-model:visible="displayDialog"
              :style="{ width: '50vw' }"
              :modal="true"
            >
              <div class="p-grid">
                <div class="p-col-4 p-md-4 p-lg-4">
                  <div class="p-fluid">
                    <div class="p-field">
                      <label for="workName"><h5>作品名称</h5></label>
                      <InputText
                        id="workName"
                        type="text"
                        maxlength="20"
                        v-model="workName"
                      />
                    </div>
                    <div class="p-field">
                      <label for="workUpload"><h5>上传作品</h5></label>
                      <!-- <FileUpload mode="basic" url="/api/upload/uploadWorkFile" accept="image/*" :maxFileSize="1000000" @upload="onUpload" chooseLabel="Browse" /> -->
                      <input
                        type="file"
                        id="workUpload"
                        accept="image/*"
                        name="workUpload"
                        @change="getWorkFile"
                      />
                    </div>
                    <div class="p-field">
                      <label for="workIntro"><h5>作品简介</h5></label>
                      <Textarea
                        v-model="workIntro"
                        :autoResize="true"
                        rows="4"
                        cols="30"
                        maxlength="100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <template #footer>
                <Button
                  label="取消"
                  icon="pi pi-times"
                  @click="closeDialog"
                  class="p-button-text"
                />
                <Button
                  label="发布"
                  icon="pi pi-check"
                  @click="
                    releaseWork();
                    closeDialog();
                  "
                  class="p-button-text"
                />
              </template>
            </Dialog>
          </div>
          <div class="p-mr-2 p-order-3 p-order-md-3 head-image">
            <img :src="userAvatar" @click="toggleUserMenu" />
            <!-- <TieredMenu ref="user_menu" :model="user_menu" :popup="true" /> -->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import { getCookie } from "../composable/js/cookieHandler";
import { useToast } from "primevue/usetoast";
export default {
  setup() {
    const displayDialog = ref(false);
    const workName = ref("");
    let workFile = null;
    const workIntro = ref("");
    const userAvatar = ref(""); // 为什么简单地用let userAvatar = null. 不行
    const toast = useToast();
    onBeforeMount(() => {
      axios
        .get("/api/user/getAvatar", {
          headers: { email: getCookie("email") },
        })
        .then((response) => {
          userAvatar.value = response.data;
        });
    });

    // // 个人
    // toggleUserMenu(event) {
    //     this.$refs.user_menu.toggle(event);
    // };

    //打开弹出框
    const openDialog = () => {
      displayDialog.value = true;
    };

    //关闭弹出框
    const closeDialog = () => {
      displayDialog.value = false;
    };

    // 上传图片的文件监听器
    const getWorkFile = (event) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        workFile = this.result;
      };
      reader.readAsArrayBuffer(event.target.files[0]);
    };

    // 发布作品
    const releaseWork = () => {
      const formData = new FormData();
      formData.append("workName", workName.value);
      formData.append("workFile", workFile);
      formData.append("workIntro", workIntro.value);
      axios
        .post(
          "/api/upload/",
          // {
          //   formData
          //     // workName: workName.value,
          //     // workFile: workFile,
          //     // workIntro: workIntro.value
          // },
          formData,
          {
            headers: {
              "auth-token": localStorage["auth-token"],
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          toast.add({
            severity: "success",
            summary: "成功",
            detail: "作品已上传",
            life: 3000,
          });
        })
        .catch((err) => {
          debugger;
        });
    };

    return {
      displayDialog,
      // toggleUserMenu,
      openDialog,
      closeDialog,
      getWorkFile,
      releaseWork,
      workName,
      workIntro,
      userAvatar,
    };
  },
};

//   data() {
//     return {
//       // 默认是否显示图片放大器
//       displayImagnifier: false,
//       imagnifierMaxWidth: "max-width:850px",
//       // 图片放大器
//       imagnifier: null,
//       work_name: "",
//       work_info: "",
//       // 默认是否显示弹出框【发表作品】
//       displayDialog: false,
//       user_menu: [
//         {
//           label: "个人主页",
//           icon: "pi pi-fw pi-user",
//           to: "/oneo",
//         },
//         {
//           separator: true,
//         },
//         {
//           label: "退出",
//           to: "/login",
//         },
//       ],
//     };
//   },

//   methods: {

//     //打开弹出框
//     openDialog() {
//       this.displayDialog = true;
//         debugger
//       // 利用异步 等dom元素加载好之后再操作
//     //   setTimeout(() => {
//     //     const uploadContentRoot = document.getElementById("uploadpic");
//     //     // 移除自带的上传按钮和取消按钮
//     //     const childNodeList = uploadContentRoot.querySelectorAll("button");
//     //     childNodeList.forEach((element) => {
//     //       uploadContentRoot
//     //         .querySelector("button")
//     //         .parentNode.removeChild(element);
//     //     });
//     //     // 选择照片按钮的样式
//     //     uploadContentRoot
//     //       .getElementsByClassName("p-fileupload-buttonbar")[0]
//     //       .setAttribute("style", "padding: 0;border: none;background: none;");
//     //     uploadContentRoot
//     //       .getElementsByClassName("p-fileupload-choose")[0]
//     //       .setAttribute("style", "margin-right: 0;");
//     //     // 上传图片的内容框
//     //     uploadContentRoot
//     //       .getElementsByClassName("p-fileupload-content")[0]
//     //       .setAttribute(
//     //         "style",
//     //         "position: absolute;left: 24px;top: 80px;height: calc(65% + 35px);width: calc(62% + 8px);padding-left: 0;border:none;z-index:5"
//     //       );
//     //     uploadContentRoot.getElementsByClassName(
//     //       "p-button-icon-only"
//     //     )[0].style.padding = "0.5rem 0.5rem";
//     //   }, 0);
//     },
//     closeDialog() {
//       this.displayDialog = false;
//     },
//     // 选择照片之后出发
//     onSelect() {
//       setTimeout(() => {
//         if (
//           document.getElementsByClassName("p-fileupload-files")[0].children
//             .length === 1
//         ) {
//           this.$refs.single_pic_shower.parentNode.setAttribute(
//             "style",
//             "z-index:6"
//           );
//           this.$refs.single_pic_shower.src = document
//             .getElementsByClassName("p-fileupload-files")[0]
//             .querySelector("div")
//             .querySelector("div")
//             .querySelector("img")
//             .getAttribute("src");
//         } else {
//           this.$refs.single_pic_shower.parentNode.setAttribute(
//             "style",
//             "z-index:4"
//           );
//           this.$refs.single_pic_shower.setAttribute("src", "");
//           document
//             .getElementById("uploadpic")
//             .querySelectorAll("img")
//             .forEach((ele) => {
//               ele.style.cursor = "pointer";
//               let _this = this;
//               ele.addEventListener("click", function () {
//                 _this.imagnify(ele.src);
//               });
//             });
//         }
//       }, 0);
//     },
//     //上传图片
//     onUpload() {
//       this.$toast.add({
//         severity: "info",
//         summary: "成功",
//         detail: "文件上传成功",
//         life: 3000,
//       });
//     },
//     // 图片放大镜
//     imagnify(src) {
//       this.displayImagnifier = true;
//       this.imagnifier = [
//         {
//           itemImageSrc: src,
//         },
//       ];
//       // 闭包
//       const _this = this;
//       const img = new Image();
//       img.src = src;
//       img.onload = function () {
//         if (img.height > window.innerHeight) {
//           let maxWidth = Math.floor(
//             ((window.innerHeight - 100) * img.width) / img.height
//           );
//           _this.imagnifierMaxWidth = `max-width:${maxWidth}px;`;
//         }
//       };
//     },
//     // blockUI: blockUIHandler.block(this),
//     // unblockUI: blockUIHandler.unblock
//   },
</script>

<style scoped>
.nav-bar {
  position: fixed;
  z-index: 998;
  top: 0;
  right: 0;
  left: 0;
  height: 4rem;
  border-bottom: 1px solid var(--surface-d);
  justify-content: space-between;
  align-items: center;
  transition: height 0.2s ease-in-out;
  padding: 0.7rem 1.5rem;
  background-color: var(--surface-e);
}
.nav {
  align-items: center;
  transition: height 0.2s ease-in-out;
  max-width: 965px;
  width: 100%;
  margin: 0 auto;
}
.nav-log {
  color: var(--text-color);
  text-decoration: none;
}
.nav-func i,
img {
  cursor: pointer;
}
.head-image img {
  width: 2.36rem;
  height: auto;
  border-radius: 50%;
}
.pi {
  font-size: 1.2rem;
}
.single_pic_shower {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>