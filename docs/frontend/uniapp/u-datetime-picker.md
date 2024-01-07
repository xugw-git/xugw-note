# uView u-popup 二次封装

> 文档：<https://v1.uviewui.com/components/popup.html>
<https://v1.uviewui.com/components/picker.html>

## vue v-model

> 文档：<https://cn.vuejs.org/guide/components/events.html#usage-with-v-model>

``` vue
<input v-model="searchText" />
<input :value="searchText" @input="searchText = $event.target.value" />
```

## 示例

``` vue
<template>
  <view @tap="showPicker">
    <input v-if="showInput" class="inputword" type="text" v-model="dateTimeContent" :placeholder="placeholder" />
    <u-popup :mask-close-able="maskCloseAble" mode="center" :popup="false" v-model="show" width="500" :safe-area-inset-bottom="safeAreaInsetBottom" @close="close" :z-index="999" :border-radius="10">
      <view class="u-datetime-picker">
        <view class="u-picker__title">{{ title }}</view>
        <view class="u-picker-body" @touchmove.stop v-if="params.year || params.month || params.day">
          <picker-view :value="valueArr" @change="change" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
            <picker-view-column v-if="params.year">
              <view class="u-column-item" v-for="(item, index) in years" :key="index">
                {{ item }}
                <text class="u-text" v-if="showTimeTag">年</text>
              </view>
            </picker-view-column>
            <picker-view-column v-if="params.month">
              <view class="u-column-item" v-for="(item, index) in months" :key="index">
                {{ formatNumber(item) }}
                <text class="u-text" v-if="showTimeTag">月</text>
              </view>
            </picker-view-column>
            <picker-view-column v-if="params.day">
              <view class="u-column-item" v-for="(item, index) in days" :key="index">
                {{ formatNumber(item) }}
                <text class="u-text" v-if="showTimeTag">日</text>
              </view>
            </picker-view-column>
          </picker-view>
        </view>
        <view class="u-picker-body" @touchmove.stop v-if="params.hour || params.minute || params.second">
          <picker-view :value="valueArr2" @change="change2" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
            <picker-view-column v-if="params.hour">
              <view class="u-column-item" v-for="(item, index) in hours" :key="index">
                {{ formatNumber(item) }}
                <text class="u-text" v-if="showTimeTag">时</text>
              </view>
            </picker-view-column>
            <picker-view-column v-if="params.minute">
              <view class="u-column-item" v-for="(item, index) in minutes" :key="index">
                {{ formatNumber(item) }}
                <text class="u-text" v-if="showTimeTag">分</text>
              </view>
            </picker-view-column>
            <picker-view-column v-if="params.second">
              <view class="u-column-item" v-for="(item, index) in seconds" :key="index">
                {{ formatNumber(item) }}
                <text class="u-text" v-if="showTimeTag">秒</text>
              </view>
            </picker-view-column>
          </picker-view>
        </view>
        <view class="u-model__footer u-border-top">
          <view :hover-stay-time="100" hover-class="u-model__btn--hover" class="u-model__footer__button" style="color: #606266;" @touchmove.stop @tap.stop="getResult('cancel')">
            取消
          </view>
          <view :hover-stay-time="100" hover-class="u-model__btn--hover" class="u-model__footer__button" style="color: #2979ff;" @touchmove.stop @tap.stop="getResult('confirm')">
            确定
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
/**
 * @property {Boolean} showInput 是否需要input框（默认true）
 * @property {String} v-model 父组件绑定的字段的初始值（showInput为true时生效）
 * @property {String} placeholder input placeholder显示值（默认'请选择'、showInput为true时生效）
 * @property {Boolean} isShow 是否弹出组件（默认fasle、showInput为fasle时启用）
 * @property {Object} params 需要显示的参数（默认显示年、月、日、时、分）
 * @property {String Number} start-year 可选的开始年份（默认1950）
 * @property {String Number} end-year 可选的结束年份（默认2050）
 * @property {String} default-time 默认选中的时间（默认为当前时间）
 * @property {Boolean} show-time-tag 时间模式时，是否显示后面的年月日中文提示（默认true）
 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker（默认true）
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配（默认false）
 * @event {Function} change 关闭弹窗后返回false（showInput为fasle时用于将父组件isShow改变为false）
 * @event {Function} confirm 点击确定按钮，返回当前选择的值（showInput为fasle时用于获取datetime数据）
 * @example 作为formitem使用： <yh-datetime-picker v-model="inputValue"></yh-datetime-picker>
 * @example 单独使用： <yh-datetime-picker :showInput='false' :isShow="show" @change='showChange'></yh-datetime-picker>
**/
export default {
  name: 'yh-datetime-picker',
  props: {
    // 是否需要input框
    showInput: {
      type: Boolean,
      default: true
    },
    // 父组件绑定的字段的初始值
    value: {
      type: String,
      default() {
        return ''
      }
    },
    // input placeholder显示值
    placeholder: {
      type: String,
      default() {
        return '请选择'
      }
    },
    // 是否弹出组件
    isShow: {
      type: Boolean,
      default: false
    },
    // picker中需要显示的参数
    params: {
      type: Object,
      default() {
        return {
          year: true,
          month: true,
          day: true,
          hour: true,
          minute: true,
          second: false,
        };
      }
    },
    // 年份开始时间
    startYear: {
      type: [String, Number],
      default: 1950
    },
    // 年份结束时间
    endYear: {
      type: [String, Number],
      default: 2050
    },
    // 默认显示的时间，2025-07-02 || 2025-07-02 13:01:00 || 2025/07/02
    defaultTime: {
      type: String,
      default: ''
    },
    // 时间模式时，是否显示后面的年月日中文提示
    showTimeTag: {
      type: Boolean,
      default: true
    },
    // 是否允许通过点击遮罩关闭Picker
    maskCloseAble: {
      type: Boolean,
      default: true
    },
    // 是否开启底部安全区适配
    safeAreaInsetBottom: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      show: false,
      years: [],
      months: [],
      days: [],
      hours: [],
      minutes: [],
      seconds: [],
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      startDate: '',
      endDate: '',
      valueArr: [],
      valueArr2: [],
      dateTimeContent: '',
      title1: '',
      title2: '',
      moving: false // 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    yearAndMonth() {
      return `${this.year}-${this.month}`;
    },
    title() {
      return this.title1 + ' ' + this.title2
    }
  },
  watch: {
    isShow(val){
      if (val && !this.showInput) {
        this.show = true
      }
    },
    value(val) {
      if (val) {
        if (this.params.year) {
          this.dateTimeContent = this.$common.toDate(val, 'yyyy')
        }
        if (this.params.month) {
          this.dateTimeContent = this.$common.toDate(val, 'yyyy-MM')
        }
        if (this.params.day) {
          this.dateTimeContent = this.$common.toDate(val, 'yyyy-MM-dd')
        }
        if (this.params.hour) {
          this.dateTimeContent = this.$common.toDate(val, 'yyyy-MM-dd hh')
        }
        if (this.params.minute) {
          this.dateTimeContent = this.$common.toDate(val, 'yyyy-MM-dd hh:mm')
        }
        if (this.params.second) {
          this.dateTimeContent = this.$common.toDate(val, 'yyyy-MM-dd hh:mm:ss')
        } 
      }
    },
    // watch监听月份的变化，实时变更日的天数，因为不同月份，天数不一样
    // 一个月可能有30，31天，甚至闰年2月的29天，平年2月28天
    yearAndMonth(val) {
      if (this.params.year) this.setDays();
    },
  },
  methods: {
    // 显示input框时的picker开启事件
    showPicker() {
      if (this.showInput) {
        this.show = true
      }
    },
    // 标识滑动开始，只有微信小程序才有这样的事件
    pickstart() {
      // #ifdef MP-WEIXIN
      this.moving = true;
      // #endif
    },
    // 标识滑动结束
    pickend() {
      // #ifdef MP-WEIXIN
      this.moving = false;
      // #endif
    },
    // 小于10前面补0，用于月份，日期，时分秒等
    formatNumber(num) {
      return +num < 10 ? '0' + num : String(num);
    },
    // 生成递进的数组
    generateArray: function (start, end) {
      // 转为数值格式，否则用户给end-year等传递字符串值时，下面的end+1会导致字符串拼接，而不是相加
      start = Number(start);
      end = Number(end);
      end = end > start ? end : start;
      // 生成数组，获取其中的索引，并剪出来
      return [...Array(end + 1).keys()].slice(start);
    },
    getIndex: function (arr, val) {
      let index = arr.indexOf(val);
      // 如果index为-1(即找不到index值)，~(-1)=-(-1)-1=0，导致条件不成立
      return ~index ? index : 0;
    },
    //日期时间处理
    initTimeValue() {
      // 格式化时间，在IE浏览器(uni不存在此情况)，无法识别日期间的"-"间隔符号
      let fdate = this.defaultTime.replace(/\-/g, '/');
      fdate = fdate && fdate.indexOf('/') == -1 ? `2020/01/01 ${fdate}` : fdate;
      let time = null;
      if (fdate) time = new Date(fdate);
      else time = new Date();
      // 获取年日月时分秒
      this.year = time.getFullYear();
      this.month = Number(time.getMonth()) + 1;
      this.day = time.getDate();
      this.hour = time.getHours();
      this.minute = time.getMinutes();
      this.second = time.getSeconds();
    },
    init() {
      this.dateTimeContent = this.value
      this.valueArr = []
      this.valueArr2 = []
      this.initTimeValue();
      if (this.params.year) {
        this.valueArr.push(0);
        this.setYears();
        this.title1 = this.year
      }
      if (this.params.month) {
        this.valueArr.push(0);
        this.setMonths();
        this.title1 = this.year + '-' + this.formatNumber(this.month)
      }
      if (this.params.day) {
        this.valueArr.push(0);
        this.setDays();
        this.title1 = this.year + '-' + this.formatNumber(this.month) + '-' + this.formatNumber(this.day)
      }
      if (this.params.hour) {
        this.valueArr2.push(0);
        this.setHours();
        this.title2 = this.formatNumber(this.hour)
      }
      if (this.params.minute) {
        this.valueArr2.push(0);
        this.setMinutes();
        this.title2 = this.formatNumber(this.hour) + ':' + this.formatNumber(this.minute)
      }
      if (this.params.second) {
        this.valueArr2.push(0);
        this.setSeconds();
        this.title2 = this.formatNumber(this.hour) + ':' + this.formatNumber(this.minute) + ':' + this.formatNumber(this.second)
      }
      this.$forceUpdate();
    },
    // 设置picker的某一列值
    setYears() {
      // 获取年份集合
      this.years = this.generateArray(this.startYear, this.endYear);
      // 设置this.valueArr某一项的值，是为了让picker预选中某一个值
      this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.years, this.year));
    },
    setMonths() {
      this.months = this.generateArray(1, 12);
      this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.months, this.month));
    },
    setDays() {
      let totalDays = new Date(this.year, this.month, 0).getDate();
      this.days = this.generateArray(1, totalDays);
      let index = 0;
      // 这里不能使用类似setMonths()中的this.valueArr.splice(this.valueArr.length - 1, xxx)做法
      // 因为this.month和this.year变化时，会触发watch中的this.setDays()，导致this.valueArr.length计算有误
      if (this.params.year && this.params.month) index = 2;
      else if (this.params.month) index = 1;
      else if (this.params.year) index = 1;
      else index = 0;
      // 当月份变化时，会导致日期的天数也会变化，如果原来选的天数大于变化后的天数，则重置为变化后的最大值
      // 比如原来选中3月31日，调整为2月后，日期变为最大29，这时如果day值继续为31显然不合理，于是将其置为29(picker-column从1开始)
      if (this.day > this.days.length) this.day = this.days.length;
      this.valueArr.splice(index, 1, this.getIndex(this.days, this.day));
    },
    setHours() {
      this.hours = this.generateArray(0, 23);
      this.valueArr2.splice(this.valueArr2.length - 1, 1, this.getIndex(this.hours, this.hour));
    },
    setMinutes() {
      this.minutes = this.generateArray(0, 59);
      this.valueArr2.splice(this.valueArr2.length - 1, 1, this.getIndex(this.minutes, this.minute));
    },
    setSeconds() {
      this.seconds = this.generateArray(0, 59);
      this.valueArr2.splice(this.valueArr2.length - 1, 1, this.getIndex(this.seconds, this.second));
    },
    close() {
      this.show = false
      this.$emit('change', false)
    },
    // 用户更改picker的列选项
    change(e) {
      this.valueArr = e.detail.value
      let i = 0
      if (this.params.year) {
        this.year = this.years[this.valueArr[i++]]
        this.title1 = this.year
      }
      if (this.params.month) {
        this.month = this.months[this.valueArr[i++]]
        this.title1 = this.year + '-' + this.formatNumber(this.month)
      }
      if (this.params.day) {
        this.day = this.days[this.valueArr[i++]]
        this.title1 = this.year + '-' + this.formatNumber(this.month) + '-' + this.formatNumber(this.day)
      }
    },
    // 用户更改picker的列选项
    change2(e) {
      this.valueArr2 = e.detail.value
      let i = 0
      if (this.params.hour) {
        this.hour = this.hours[this.valueArr2[i++]]
        this.title2 = this.formatNumber(this.hour)
      }
      if (this.params.minute) {
        this.minute = this.minutes[this.valueArr2[i++]]
        this.title2 = this.formatNumber(this.hour) + ':' + this.formatNumber(this.minute)
      }
      if (this.params.second) {
        this.second = this.seconds[this.valueArr2[i++]]
        this.title2 = this.formatNumber(this.hour) + ':' + this.formatNumber(this.minute) + ':' + this.formatNumber(this.second)
      }
    },
    // 用户点击确定按钮
    getResult(event) {
      // #ifdef MP-WEIXIN
      if (this.moving) return;
      // #endif
      let result = {};
      // 只返回用户在this.params中配置了为true的字段
      if (this.params.year) result.year = this.formatNumber(this.year || 0);
      if (this.params.month) result.month = this.formatNumber(this.month || 0);
      if (this.params.day) result.day = this.formatNumber(this.day || 0);
      if (this.params.hour) result.hour = this.formatNumber(this.hour || 0);
      if (this.params.minute) result.minute = this.formatNumber(this.minute || 0);
      if (this.params.second) result.second = this.formatNumber(this.second || 0);
      if (event === 'confirm') {
        if (this.showInput) {
          this.dateTimeContent = this.title
          this.$emit('input', this.title)
        }
        this.$emit(event, result)
      }
      this.close();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/uview-ui/libs/css/style.components.scss";
.inputword {
  pointer-events: none;
  color: #333333;
}
.u-datetime-picker {
  position: relative;
  z-index: 999;
}

.u-picker-view {
  height: 100%;
  box-sizing: border-box;
}

.u-picker__title {
  text-align: start;
  color: #999;
  padding: 50rpx 50rpx 0 50rpx;
}

.u-picker-body {
  width: 100%;
  height: 300rpx;
  overflow: hidden;
  background-color: #fff;
  padding: 40rpx;
}

.u-column-item {
  @include vue-flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: $u-main-color;
  padding: 0 8rpx;
}

.u-text {
  font-size: 24rpx;
  padding-left: 8rpx;
}

.u-btn-picker {
  padding: 16rpx;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
}

.u-opacity {
  opacity: 0.5;
}

.u-btn-picker--primary {
  color: $u-type-primary;
}

.u-btn-picker--tips {
  color: $u-tips-color;
}

.u-model {
  height: auto;
  overflow: hidden;
  font-size: 32rpx;
  background-color: #fff;

  &__btn--hover {
    background-color: rgb(230, 230, 230);
  }

  &__title {
    padding-top: 48rpx;
    font-weight: 500;
    text-align: center;
    color: $u-main-color;
  }

  &__content {
    &__message {
      padding: 48rpx;
      font-size: 30rpx;
      text-align: center;
      color: $u-content-color;
    }
  }

  &__footer {
    @include vue-flex;

    &__button {
      flex: 1;
      height: 100rpx;
      line-height: 100rpx;
      font-size: 28rpx;
      box-sizing: border-box;
      cursor: pointer;
      text-align: center;
      border-radius: 4rpx;
    }
  }
}
</style>
```
