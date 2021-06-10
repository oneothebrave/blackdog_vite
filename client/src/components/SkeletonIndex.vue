<template>
  <div class="p-grid top-blank" v-for="copy of [1, 2, 3]">
    <section class="p-col-1 work-triple-container">
      <div class="work-triple">
        <div>
          <Button
            class="p-button-rounded p-button-outlined"
          />
        </div>
        <div>
          <Button
            class="p-button-rounded p-button-outlined"
          />
        </div>
        <div>
          <Button
            class="p-button-rounded p-button-outlined"
          />
        </div>
      </div>
    </section>
    <section class="p-col-8 work-main-container">
      <div class="work-title"></div>
      <div class="work-work">
        <!-- <img :src="workFile.url" /> -->
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
export default {};
</script>

<style lang="sass" scoped>
.top-blank
    margin-bottom: 10rem

.work-triple-container
    width: 53px
    margin-left: -50px

.work-triple
    position: absolute
    bottom: 2px
    div
        position: relative
        padding-top: 20px
        width: 40px

        button
            border: 0
            animation: trans-bg 1s infinite

.work-main-container
    position: relative
    margin: 0 auto
    background: var(--surface-e)
    border-radius: 3px
    overflow: hidden
    border: 1px solid var(--surface-100)


    .work-title
        border-bottom: 1px solid var(--surface-50)
        height: 20px
        padding: 10px
        align-items: center
        line-height: 18px
        width: 30%
        margin: 10px auto
        border-radius: 3px
        animation: trans-bg 1s infinite


    .work-work 
        height:500px
        animation: trans-bg 1s infinite
        
.work-comment-container
    margin-left: 10px
    position: relative

    .work-author
        border-bottom: 1px solid var(--surface-d)
        padding: 4px 16px 4px 6px

        .author-head img,
        .author-name span,
        .author-operate
            cursor: pointer
        
        .author-head
            width: 32px
            height: 32px
            border-radius: 50%
            animation: trans-bg 1s infinite

        .author-name
            padding: 10px 0 0 12px
            span
                display: block
                width: 120px
                height: 15px
                animation: trans-bg 1s infinite

        .author-operate
            padding-top: 7px
            width: 50px
            height: 12px
            margin-top: 10px
            animation: trans-bg 1s infinite

    .work-info
        div
          margin: 15px auto
          height: 6px
          width: 100%
          animation: trans-bg 1s infinite
        span
          display: block
          margin-top: 5px
          float:left
          height: 6px
          width: 20%
          animation: trans-bg 1s infinite


</style>