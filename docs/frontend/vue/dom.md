# 获取 DOM

## ref、$refs、$el

- ref：元素的属性
- $refs：ref 的集合，用于获取普通元素中的 DOM 以及子组件中方法/参数
- $el：用于获取组件内 DOM，包括子组件、当前 .vue 组件以及父组件

## 示例

``` vue
<template>
  <el-row :gutter="10">
    <el-col :span="4">
      <el-card>
        <el-row>
          <el-col :span="24" class="rect-printElement-types hiprintEpContainer" ref="hiprint-epcontainer-div">
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card>
        <div ref="hiprint-printTemplate-div" id="hiprint-printTemplate" class="hiprint-printTemplate" style="padding: 15px; overflow: hidden; overflow-x: auto; overflow-y:aut"><div>
      </el-card>
    </el-col>
    <el-col :span="4" class="params_setting_container">
      <el-card>
        <div id="PrintElementOptionSetting"></div>
      </el-card>
    </el-col>
  </el-row>
  <print-preview ref="preView" />
</template>

<script>
export default {
  methods: {
    /* 初始化模板 */
    init() {
      hiprint.init({ providers: [this.createProvider()] });
      $('.hiprintEpContainer').empty()
      hiprint.PrintElementTypeManager.build('.hiprintEpContainer', 'providerModule');
      $('#hiprint-printTemplate').empty()
      hiprintTemplate = new hiprint.PrintTemplate({
        template: this.currentPrintTemplate,
        settingContainer: '#PrintElementOptionSetting',
        paginationContainer: '.hiprint-printPagination'
      });
      hiprintTemplate.design('#hiprint-printTemplate');
      this.scaleValue = hiprintTemplate.editingPanel.scale || 1
      this.$nextTick(() => {
        // 获取el-col组件内DOM
        let parentList = this.$refs['hiprint-epcontainer-div'].$el.children[0].children
        if (!!parentList && parentList.length > 0) {
          let notDefaultparentList = [...parentList].slice(0, -1)
          notDefaultparentList.forEach(i => {
            [...i.children[1].children].forEach(e => {
              e.children[0].innerHTML = `<i class="el-icon-edit-outline" style="margin-right: 2px"></i>${e.children[0].innerHTML}`
            })
          })
          let defaultList = [...[...parentList].slice(-1)[0].children[1].children]
          defaultList.forEach(i => i.children[0].setAttribute("style", "text-align: center; height: 90px; position: static; left: 0px; top: 285px;"))
          defaultList[0].children[0].innerHTML = `<i class="fa fa-text-width" style="font-size: 40px;line-height: 60px;"></i><div>文本</div>`
          defaultList[1].children[0].innerHTML = `<i class="fa fa-picture-o" style="font-size: 40px;line-height: 60px;"></i><div>图片</div>`
          defaultList[2].children[0].innerHTML = `<i class="fa fa-arrows-h" style="font-size: 40px;line-height: 60px;"></i><div>横线</div>`
          defaultList[3].children[0].innerHTML = `<i class="fa fa-arrows-v" style="font-size: 40px;line-height: 60px;"></i><div>竖线</div>`
          defaultList[4].children[0].innerHTML = `<i class="fa fa-square-o" style="font-size: 40px;line-height: 60px;font-weight: bold;"></i><div>矩形</div>`
          defaultList[5].children[0].innerHTML = `<i class="fa fa-circle-o" style="font-size: 40px;line-height: 60px;"></i><div>椭圆</div>`
        }
        // 获取普通元素的DOM并添加click事件
        this.$refs['hiprint-printTemplate-div'].children[0].click()
      })
      this.setPaper('A4', { width: 210, height: 296.6 })
    },
    /* 预览 */
    preview(hiprintTemplate, printDataList, width){
      // 获取子组件中的方法
      this.$refs.preView.show(hiprintTemplate, printDataList, width)
    },
  }
}
</script>
```
