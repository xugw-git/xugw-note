# drag 事件

> 文档：<https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drag_event>
>
> 文章: <https://blog.csdn.net/qq_43681948/article/details/107819286>

## 示例

``` vue
<template>
  <el-table :data="listData">
    <el-table-column prop="name" label="教师" width="200">
      <template slot-scope="{row}">
        <div class="u-f-ac u-f-jsb" @dragenter="dragenter($event, row)">
          <el-input v-model="row.HeadMaster"></el-input>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div draggable="true" @dragend="dragEnd($event, item)" v-for="(item,index) in teacherList" :key="index">
    <el-tag style="margin: 5px; width: 95px">
      {{ item.RealName }}
    </el-tag>
  </div>             
</template>

<script>
export default {
  methods: {
    /* 拖拽目标事件 */
    dragenter(e, row, index) {
      this.drogRow = row
    },
    /* 拖拽结束事件 */
    dragEnd(e, item) {
      this.SetClassTeacher(this.drogRow.ClassId, item.UserId)
    },
  }
}
</script>
```
