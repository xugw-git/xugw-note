# 二维码生成插件 uQRCode

> 文档：<https://doc.uqrcode.cn/>

## 使用

``` vue
<template>
  <view @longtap="saveUqrcode">
    <uqrcode ref="uqrcode" :text="uqrcodeInfo" :size="120" @complete="complete" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      uqrcodeInfo: '', //二维码信息
    }
  },
  methods: {
  /* complete事件 */
  complete(obj) {
    // obj是一个包含二维码ID信息的对象
  },
  /* 保存二维码方法 */
  saveUqrcode() {
  // uqrcode为组件的ref名称
   this.$refs.uqrcode.save()
  },
  }
}
</script>
```
