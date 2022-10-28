# 可视化图表库 echarts

> 文档：<https://echarts.apache.org/zh/index.html>

``` bash
npm install echarts --save
```

## vue 示例

``` js
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts
```

``` html
<template>
<!-- 图表容器 -->
<div ref="pieChart" style="width: 100%; height: 350px;"></div>
</template>

<script>
export default {
    data() {
        return {
            pieOption: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: 'top',
                    left: 'left',
                    orient: 'vertical'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 1
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 484, name: 'HTML' },
                            { value: 300, name: 'CSS' },
                            { value: 735, name: 'JavaScript' },
                            { value: 1048, name: 'Vue' },
                            { value: 580, name: 'element-ui' },
                        ]
                    }
                ]
            },
        }
    },
    computed: {
        pieChart() {
            return this.$echarts.init(this.$refs.pieChart)
        },
    },
    mounted() {
        this.pieOption && this.pieChart.setOption(this.pieOption)
        // 使用 onresize 设置 echartsInstance.resize 方法
        let timer = null
        window.onresize = () => {
            if (timer !== null) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                this.pieChart.resize()
                timer = null
            }, 500)
        }
    }
}
</script>
```

## django 示例

``` py
# views.py
def charts_posts(request):
    categorys = Category.objects.all()
    category_list = []
    for category in categorys:
        category_value = Post.objects.filter(category__name=category.name).count()
        category_dict = dict(name=category.name, value=category_value)
        category_list.append(category_dict)
    return render(
            request,
            'blog/charts.html',
            { 'category_list': category_list, }
            )
```

``` html
<!-- 图表容器 -->
<div id="category_pie" style="width:400px;height:450px;"></div>
<script>
    var chartDom = documentgetElementById('category_pie');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
        title: {
            text: '文章分类占比',
            top: '5%',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '85%',
            left: 'center'
        },
        series: [
            {
                name: '专栏名称',
                type: 'pie',
                radius: ['35%', '65%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        fontWeight:'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                // 使用模板语法传递视图渲染的数据
                data: {{ category_list |safe }}
            }
        ]
    };
    option && myChart.setOption(option);
    // 鼠标事件
    myChart.on('click', function(params) {
        window.open("{% url 'link' %}category=" + encodeURIComponen(params.name));
    });
</script>
```
