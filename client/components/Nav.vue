<template>
  <!--图片全屏预览 -->
  <Galleria
    :value="imagnifier"
    :containerStyle="imagnifierMaxWidth"
    :fullScreen="true"
    :showThumbnails="false"
    v-model:visible="displayImagnifier"
  >
    <template #item="slotProps">
      <img
        :src="slotProps.item.itemImageSrc"
        style="width: 100%; display: block"
      />
    </template>
  </Galleria>
  <div style="height: 5rem"></div>
  <header class="p-d-flex nav-bar">
    <div class="p-grid p-jc-between nav">
      <!-- 名称 -->
      <div class="p-col-2 p-text-left">
        <router-link to="/" class="nav-log p-text-italic p-text-bold">BlackDog</router-link>
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
                <div class="p-col-8 p-md-8 p-lg-8">
                  <img
                    ref="single_pic_shower"
                    src=""
                    class="single_pic_shower"
                  />
                </div>
                <div class="p-col-4 p-md-4 p-lg-4">
                  <div class="p-fluid">
                    <div class="p-field">
                      <label for="firstname1"><h5>作品名称</h5></label>
                      <InputText id="firstname1" type="text" maxlength="20" />
                    </div>
                    <div class="p-field">
                      <label for="lastname1"><h5>上传作品</h5></label>
                      <FileUpload
                        name="demo[]"
                        url="./upload.php"
                        @select="onSelect"
                        @upload="onUpload"
                        :multiple="true"
                        accept="image/*"
                        :maxFileSize="10000000"
                        chooseLabel="选择照片"
                        fileLimit="5"
                        id="uploadpic"
                      >
                        <template #empty>
                          <p style="text-align: center">
                            上传或将文件拖放到此处进行上传
                          </p>
                        </template>
                      </FileUpload>
                    </div>
                    <div class="p-field">
                      <label for="lastname1"><h5>作品简介</h5></label>
                      <Textarea
                        v-model="work_info"
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
                  @click="closeDialog"
                  class="p-button-text"
                />
              </template>
            </Dialog>
          </div>
          <div class="p-mr-2 p-order-3 p-order-md-3 head-image">
            <img src="/img/bd.jpg" @click="toggleUserMenu" />
            <TieredMenu ref="user_menu" :model="user_menu" :popup="true" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      // 默认是否显示图片放大器
      displayImagnifier: false,
      imagnifierMaxWidth: "max-width:850px",
      // 图片放大器
      imagnifier: null,
      work_name: "",
      work_info: "",
      // 默认是否显示弹出框【发表作品】
      displayDialog: false,
      user_menu: [
        {
          label: "个人主页",
          icon: "pi pi-fw pi-user",
          to: "/oneo",
        },
        {
          separator: true,
        },
        {
          label: "退出",
          to: "/login",
        },
      ],
    };
  },

  methods: {
    // 个人
    toggleUserMenu(event) {
      this.$refs.user_menu.toggle(event);
    },
    //打开弹出框
    openDialog() {
      this.displayDialog = true;
      // 利用异步 等dom元素加载好之后再操作
      setTimeout(() => {
        const uploadContentRoot = document.getElementById("uploadpic");
        // 移除自带的上传按钮和取消按钮
        const childNodeList = uploadContentRoot.querySelectorAll("button");
        childNodeList.forEach((element) => {
          uploadContentRoot
            .querySelector("button")
            .parentNode.removeChild(element);
        });
        // 选择照片按钮的样式
        uploadContentRoot
          .getElementsByClassName("p-fileupload-buttonbar")[0]
          .setAttribute("style", "padding: 0;border: none;background: none;");
        uploadContentRoot
          .getElementsByClassName("p-fileupload-choose")[0]
          .setAttribute("style", "margin-right: 0;");
        // 上传图片的内容框
        uploadContentRoot
          .getElementsByClassName("p-fileupload-content")[0]
          .setAttribute(
            "style",
            "position: absolute;left: 24px;top: 80px;height: calc(65% + 35px);width: calc(62% + 8px);padding-left: 0;border:none;z-index:5"
          );
        uploadContentRoot.getElementsByClassName(
          "p-button-icon-only"
        )[0].style.padding = "0.5rem 0.5rem";
      }, 0);
    },
    closeDialog() {
      this.displayDialog = false;
    },
    // 选择照片之后出发
    onSelect() {
      setTimeout(() => {
        if (
          document.getElementsByClassName("p-fileupload-files")[0].children
            .length === 1
        ) {
          this.$refs.single_pic_shower.parentNode.setAttribute(
            "style",
            "z-index:6"
          );
          this.$refs.single_pic_shower.src = document
            .getElementsByClassName("p-fileupload-files")[0]
            .querySelector("div")
            .querySelector("div")
            .querySelector("img")
            .getAttribute("src");
        } else {
          this.$refs.single_pic_shower.parentNode.setAttribute(
            "style",
            "z-index:4"
          );
          this.$refs.single_pic_shower.setAttribute("src", "");
          document
            .getElementById("uploadpic")
            .querySelectorAll("img")
            .forEach((ele) => {
              ele.style.cursor = "pointer";
              let _this = this;
              ele.addEventListener("click", function () {
                _this.imagnify(ele.src);
              });
            });
        }
      }, 0);
    },
    //上传图片
    onUpload() {
      this.$toast.add({
        severity: "info",
        summary: "成功",
        detail: "文件上传成功",
        life: 3000,
      });
    },
    // 图片放大镜
    imagnify(src) {
      this.displayImagnifier = true;
      this.imagnifier = [
        {
          itemImageSrc: src,
        },
      ];
      // 闭包
      const _this = this;
      const img = new Image();
      img.src = src;
      img.onload = function () {
        if (img.height > window.innerHeight) {
          let maxWidth = Math.floor(
            ((window.innerHeight - 100) * img.width) / img.height
          );
          _this.imagnifierMaxWidth = `max-width:${maxWidth}px;`;
        }
      };
    },
    // blockUI: blockUIHandler.block(this),
    // unblockUI: blockUIHandler.unblock
  },
};
</script>

<style scoped>
.nav-bar {
  position: fixed;
  z-index: 998;
  top: 0;
  right: 0;
  left: 0;
  height: 54px;
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