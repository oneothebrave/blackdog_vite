<template>
  <div class="p-grid top-blank" v-for="work of worksInfo">
    <section class="p-col-1 work-triple-container">
      <div class="work-triple">
        <div>
          <Button
            icon="pi"
            class="p-button-rounded p-button-outlined"
          />
        </div>
        <div>
          <Button
            icon="pi"
            class="p-button-rounded p-button-outlined"
          />
        </div>
        <div>
          <Button
            icon="pi"
            class="p-button-rounded p-button-outlined"
          />
        </div>
      </div>
    </section>
    <section class="p-col-8 work-main-container">
      <div class="work-title"></div>
      <div class="work-work" :style="{width: work[0] + 'px' , height: work[1] + 'px'}">
      </div>
    </section>
    <section class="p-col work-comment-container">
      <div class="work-author p-grid">
        <div class="author-head p-col-fixed"></div>
        <div class="author-name p-col p-text-left">
          <span></span>
        </div>
        <div class="author-operate p-col-1">
        </div>
      </div>
      <div class="work-info p-text-left">
        <div></div>
        <div></div>
        <div></div>
        <span></span>
      </div>
    </section>
  </div>
</template>

<script>
import { reactive } from 'vue';
import axios from "axios";
export default {
  setup(){
    const worksInfo = reactive([]);
    axios
      .get("/api/retrieve/getWorkFileInfo")
      .then((res) => {
          for(let info of res.data){
              worksInfo.push([info.workFileWidth, info.workFileHeight])
          }
    })
    return {
      worksInfo
    }
  }
};
</script>

<style lang="sass" scoped>
.top-blank
    margin-bottom: 10rem

.work-triple-container
    width: 53px
    margin-left: -50px
    position: relative

.work-triple
    position: absolute
    bottom: 2px
    div
        position: relative
        padding-top: 20px
        width: 40px

        button
            border: 0
            animation: trans-bg 2s infinite

.work-main-container
    position: relative
    margin: 0 auto
    background: #212121
    border-radius: 3px
    overflow: hidden
    border: 1px solid #212121


    .work-title
        border-bottom: 1px solid #212121
        height: 18px
        padding: 10px
        align-items: center
        line-height: 18px
        width: 30%
        margin: 15px auto
        border-radius: 3px
        animation: trans-bg 2s infinite


    .work-work 
        height:500px
        animation: trans-bg 2s infinite
        
.work-comment-container
    margin-left: 10px
    position: relative

    .work-author
        border-bottom: 1px solid #303030
        padding: 11px 16px 17px 10px

        .author-head img,
        .author-name span,
        .author-operate
            cursor: pointer
        
        .author-head
            width: 32px
            height: 32px
            border-radius: 50%
            animation: trans-bg 2s infinite

        .author-name
            padding: 10px 0 0 12px
            span
                display: block
                width: 120px
                height: 15px
                animation: trans-bg 2s infinite

        .author-operate
            padding-top: 7px
            width: 50px
            height: 12px
            margin-top: 10px
            animation: trans-bg 2s infinite

    .work-info
        div
          margin: 15px auto
          height: 6px
          width: 100%
          animation: trans-bg 2s infinite
        span
          display: block
          margin-top: 5px
          height: 6px
          width: 20%
          animation: trans-bg 2s infinite


</style>