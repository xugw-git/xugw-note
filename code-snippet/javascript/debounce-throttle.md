## debounce

?> 防抖: n 秒后执行该事件，若在 n 秒内被重复触发，则重新计时

``` js
// 实现
let timer = null
window.onresize = () => {
    if (timer !== null) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        console.log('执行目标函数')
        timer = null
    }, 500)
}
```

``` js
// 封装debounce
function debounce(func,delay=500){
    let timer = null
    return function () {
        if (timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func()
            timer = null
        }, delay)
    }
}
```

## throttle

?> n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效

``` js
// 实现
let mark = true
window.onresize = () => {
    if (mark) {
        setTimeout(() => {
            console.log('执行目标函数')
            mark = true
        }, 500)
    }
    mark = false
}
```

``` js
// 封装throttle
function throttle(func,delay=500){
    let mark = true
    return function () {
        if (mark) {
            setTimeout(() => {
                func()
                mark = true
            }, delay)
        }
        mark = false
    }
}
```

## 库

?> <https://github.com/niksy/throttle-debounce>

``` bash
npm install throttle-debounce
```

``` js
// 防抖
import { debounce } from 'throttle-debounce';
const debounceFunc = debounce(1000, 
    () => {console.log('执行目标函数')}
);
// 节流
import { throttle } from 'throttle-debounce';
const throttleFunc = throttle(1000,
    () => {console.log('执行目标函数')},
);
```
