# element-ui 表单自定义校验规则

> 文档：<https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze>

## 示例

``` vue
<template>
  <el-form ref="evaluatePost" :rules="evaluatePostRules" :model="evaluatePost" label-width="110px">
    <div v-for="(item, index) in evaluatePost.ScoreTemplateList" :key="index">
      <el-col :span="12">
        <el-form-item label="最高分：" :prop="`ScoreTemplateList.${index}.TotalScore`" :rules="evaluatePostRules.TotalScore">
          <el-input-number v-model="item.TotalScore" :precision="1" :step="0.1">
          </el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="最低分：" :prop="`ScoreTemplateList.${index}.MinScore`" :rules="evaluatePostRules.MinScore">
          <el-input-number v-model="item.MinScore" :precision="1" :step="0.1">
          </el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="分差：" :prop="`ScoreTemplateList.${index}.ScoringFemale`" :rules="evaluatePostRules.ScoringFemale">
          <el-input-number v-model="item.ScoringFemale" :precision="1" :step="0.1">
          </el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="默认分：" :prop="`ScoreTemplateList.${index}.DefaultScore`" :rules="evaluatePostRules.DefaultScore">
          <el-input-number v-model="item.DefaultScore" :precision="1" :step="0.1">
          </el-input-number>
        </el-form-item>
      </el-col>
    </div>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        evaluatePost: {}, //表单数据
        evaluatePostRules: {
        TotalScore: [
          { required: true, message: "请选择最高分", trigger: "blur" },
        ],
        MinScore: [
          { required: true, message: "请选择最低分", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value > this.evaluatePost.ScoreTemplateList[Number.parseFloat(rule.fullField.split('.')[1])].TotalScore) {
                callback(new Error('最低分应不大于最高分'))
              } else { callback() }
            }
          },
        ],
        ScoringFemale: [
          { required: true, message: "请输入分差", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value > this.evaluatePost.ScoreTemplateList[Number.parseFloat(rule.fullField.split('.')[1])].TotalScore - this.evaluatePost.ScoreTemplateList[Number.parseFloat(rule.fullField.split('.')[1])].MinScore) {
                callback(new Error('分差应不大于最高分与最低分之差'))
              } else { callback() }
            }
          },
        ],
        DefaultScore: [
          { required: true, message: "请选择默认分", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value > this.evaluatePost.ScoreTemplateList[Number.parseFloat(rule.fullField.split('.')[1])].TotalScore || value < this.evaluatePost.ScoreTemplateList[Number.parseFloat(rule.fullField.split('.')[1])].MinScore) {
                callback(new Error('默认分应不小于最低分并且不大于最高分'))
              } else { callback() }
            }
          },
        ],
      },
    },
  }
</script>
```
