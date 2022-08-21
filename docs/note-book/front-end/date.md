# Date 对象

``` js
new Date('2022/5/28 13:00:00').toLocaleString('zh-CN')
// 2022/5/28 13:00:00

new Date('2022/5/28 13:00:00').toLocaleString('zh-CN', {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false}).replaceAll('/', '-')
// 2022-05-28 13:00:00
```

``` js
new Date('2022/5/28 13:00:00').toLocaleDateString('zh-CN')
// 2022/5/28
new Date('2022/5/28 13:00:00').toLocaleDateString('zh-CN', {year: "numeric", month: "long", day: "numeric"})
// 2022年5月28日
```

``` js
new Date('2022/5/28 13:00:00').toLocaleTimeString('zh-CN', {hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false})
// 13:00:00
```

``` js
Date.parse('2022/5/28 13:00:00')
// 1653714000000
new Date('2022/5/28 13:00:00').getTime()
// 1653714000000
// 表示从 1970年1月1日0时0分0秒（UTC，即协调世界时）距离该日期对象所代表时间的毫秒数
// Unix 时间戳是从 1970年1月1日（UTC/GMT的午夜）开始所经过的秒数，需要再/1000
```

``` js
new Date().getTime()
Date.now()
// 自 1970年1月1日 00:00:00 (UTC) 到当前时间的毫秒数
```

## dayjs 库

> <https://github.com/iamkun/dayjs>

``` bash
npm install dayjs
```

``` js
import dayjs from 'dayjs'

dayjs('2022/5/28 13:00:00').format('yyyy-MM-DD hh:mm:ss')
// 2022-05-28 13:00:00
dayjs('2022/5/28 13:00:00').valueOf()
// 1653714000000
```
