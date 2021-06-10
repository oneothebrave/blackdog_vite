<template>
  <div class="p-grid top-blank">
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
          <i class="pi pi-ellipsis-h"></i>
        </div>
      </div>
      <div class="work-info p-text-left">
        <ScrollPanel style="width: 100%; max-height: 120px">
          <p></p>
        </ScrollPanel>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
.top-blank
    margin-bottom: 6rem

.work-triple-container
    width: 53px
    margin-left: -50px
    text-align: right
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
        height: 30px
        padding: 16px
        align-items: center
        line-height: 18px
        width: 30%
        margin: 0 auto
        border-radius: 3px
        animation: trans-bg 1s infinite


    .work-work 
        height:500px
        img
            width: 100%
            height: 100%
            object-fit: cover

.work-comment-container
    margin-left: 10px
    position: relative

    .work-author
        border-bottom: 1px solid var(--surface-d)
        padding: 4px 16px 4px 6px
        img
            width: 32px
            height: 32px
            border-radius: 50%

        .author-head img,
        .author-name span,
        .author-operate
            cursor: pointer

        .author-name
            padding: 15px 0 0 3px
            span
                color: var(--primary-color)

        .author-operate
            padding-top: 13px

        .work-info
            padding: 6px 0 6px 0
            color: #a2a2a2
            p
                font-size: 12px

.work-comment
    border: 1px solid
    max-height: 50%
    margin-bottom: 10%


    input
        height: 50px
        width: 98%
        position: absolute
        bottom: 0
        border-bottom: 1px solid var(--surface-d)
        display: flex


    input 
        input
            width: 76%
            height: 100%
            background: var(--surface-b)
            border: 0
            flex: 5


    input 
        input:focus
            border: 0
            flex: 1


</style>