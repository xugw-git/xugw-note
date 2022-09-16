# element-ui el-table 表格

> 文档：<https://element.eleme.cn/#/zh-CN/component/table>

## 使用

``` vue
<template>
  <el-table :data="tableData" border stripe @cell-click="tableCellEdit">
    <el-table-column prop="DutyTimeName" label="时间段" width="150" fixed>
    </el-table-column>
    <el-table-column v-for="(item, index) in tableHead" :key="index" :prop="item.ClassId" :label="item.ClassName" min-width="150">
      <template slot-scope="{row}">
        <el-tag size="mini" :type="row[item.ClassId].DutySign === '1' ? 'warning' : row[item.ClassId].DutySign === '2' ? 'success' : ''"> 
          {{ row[item.ClassId].DutySign === '1' ? '加班' : row[item.ClassId].DutySign === '2' ? '上课' : '值班' }}
        </el-tag> 
        {{ row[item.ClassId].real }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        DutyPostData: {}, //表单数据
        tableData: [], //表格数据
        tableHead: [], //表头列表
        timeColumn: [], //表格第一列
      }
    },
    mounted() {
      this.gradeListGet()
    },
    methods: {
      /* 获取表格第一列-时间段 */
      dutyTimeListGet() {
        dutyTimeListGetUrl().then(res => {
          if (res && res.data.success) {
            this.timeColumn = res.data.response
            this.tableData = res.data.response.map(i => {
              this.tableHead.forEach(gradeclass => i[gradeclass.ClassId] = { DutySign: 0 })
              return i
            })
          }
        })
      },
      /* 获取年级 */
      gradeListGet() {
        this.tableHead = []
        gradeListGetUrl().then(res => {
          console.log('年级列表', res)
          if (res && res.data.success) {
            res.data.response.forEach(i => {
              this.classListGet(i.value, i.label)
            })
            this.dutyTimeListGet()
          }
        })
      },
      /* 获取表头数据-班级*/
      classListGet(id, grade) {
        classListGetUrl({ GradeId: id }).then(res => {
          if (res && res.data.success) {
            res.data.response.forEach(item => {
              item.ClassName = grade + '-' + item.ClassName
              this.tableHead.push(item)
            })
          }
        })
      },
      /* 提交新增数据 */
      addSubmit() {
        this.DutyPostData.DutyList = []
        this.tableData.forEach(tableRow => {
          this.tableHead.forEach(dutyPlace => {
            this.DutyPostData.DutyList.push({
              DutyType: 2,
              DutyTimeId: tableRow.DutyTimeId,
              DutyTimeName: tableRow.DutyTimeName,
              StartTime: tableRow.TimeRange.split('-')[0],
              EndTime: tableRow.TimeRange.split('-')[1],
              DutyPlaceId: dutyPlace.ClassId,
              DutyPlaceName: dutyPlace.ClassName,
              UserId: tableRow[dutyPlace.ClassId].uid,
              UserName: tableRow[dutyPlace.ClassId].real,
              DutySign: tableRow[dutyPlace.ClassId].DutySign
            })
          })
        })
        if (this.DutyPostData.DutyList.every(i => i.UserId !== undefined && i.UserId !== null)) {
          this.DutyPostData.DutyType = 2
          this.DutyPostData.Remark = this.DutyPostData.Remark.replace(/\n/g, '<br/>')
          this.dutyPost()
        } else {
          this.$message({
            message: '表格中的任意单元格不能为空！',
            type: 'warning'
          })
        }
      },
      /* 创建值班数据 */
      dutyPost() {
        dutyPostUrl(this.DutyPostData).then(res => {
          if (res.data.success) {
            this.$message.success("提交成功");
          }
        })
      },
    }
  }
</script>
```
