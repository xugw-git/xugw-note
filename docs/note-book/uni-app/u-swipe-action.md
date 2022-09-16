# uView u-swipe-action 滑动操作

> 文档：<https://v1.uviewui.com/components/swipeAction.html>

## 使用

``` vue
<template>
  <view class="nameList" v-if="RaterList.length > 0">
    <u-swipe-action :show="item.show" :index="index" v-for="(item, index) in RaterList" :key="item.RecordId" @click="recordDelete(item)" :options="options">
      <view class="item u-border-bottom">
        <view class="name">{{ item.ClassName }} {{ item.Stu_Name }}</view>
        <view class="title-wrap">
          <text class="title u-line-2">{{ item.Remark }}</text>
        </view>
      </view>
    </u-swipe-action>
    <u-modal v-model="showState" :show-title="false" :show-cancel-button="true" @confirm="recordConfirmDelete">
      <view class="slot-content">确定要删除此条违规记录吗？</view>
    </u-modal>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        indexObj: {}, //当前记录
        RaterList: [], //违规列表
        options: [ //滑动操作按钮配置
        { text: '删除', style: { backgroundColor: '#fa3534' } },
        ],
        showState: false, //是否显示u-modal
      }
    },
    methods: {
      /* 获取记录名单列表 */
      recordListGet() {
        recordListGetUrl().then(res => {
          if (res && res.data.success) {
            if (res.data.response && res.data.response.length > 0) {
              this.RaterList = res.data.response.map(i=>{
                i.show = false
                return i
              })
            }
          }
        })
      },
      /* 删除 */
      recordDelete(item) {
        this.indexObj = item
        this.showState = true
      },
      /* 确认删除记录 */
      recordConfirmDelete() {
        recordConfirmDeleteUrl({ id: this.indexObj.RecordId }).then(res => {
          if (res && res.data.success) {
            this.recordListGet()
          }
        })
      },
    }
  }
</script>
```

## 备注

> index: 标识符，点击时候用于区分点击了哪一个，用v-for循环时的 index 即可

> show: 打开或者关闭某个组件，用数组中的对象元素的 "show" 属性
