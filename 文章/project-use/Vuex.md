# Vuex-状态管理模式

## 前言

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

?> 官网：<https://vuex.vuejs.org/zh/>

## 安装

- CDN 引用

``` html
<script src="https://unpkg.com/vuex@4.0.0/dist/vuex.global.js"></script>
```

- npm

``` bash
npm install vuex
```

## 核心概念

- State
    vuex的基本数据，用来存储变量；存储在 Vuex 中的数据和 Vue 实例中的 `data` 遵循相同的规则。
- Getter
    从 store 中的 state 中派生出一些状态，可以认为是 store 的计算属性。
- Mutation
  - 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
  - 每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。
  - mutation 必须是同步函数。
- Action
    Action 类似于 mutation，不同在于：
  - Action 提交的是 mutation，而不是直接变更状态。
  - Action 可以包含任意异步操作。
- Module
  - Vuex 允许我们将 store 分割成模块（module）。
  - 每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。

> 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。Vuex 和单纯的全局对象有以下两点不同：
>
> 1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
> 2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

## 初步使用

- 创建 store 实例

``` javascript
//src\store\index.js
import { createStore } from 'vuex'
export default createStore({
  state: {
    fruits: [
      { name: '苹果', price: 3.3, quantity: 0 },
      { name: '香蕉', price: 2.2, quantity: 0 },
      { name: '鸭梨', price: 1.1, quantity: 0 },
    ],
  },

  getters: {
    total(state) {
      return (
        Math.round(
          state.fruits.reduce(
            (prev, curr) => prev + curr["quantity"] * curr["price"],
            0
          ) * 10
        ) / 10
      );
    },
  },

  actions: {
    sub(context, value) {
      if (context.state.fruits[value]["quantity"] > 0) {
        context.commit('SUB', value)
      }
    },
  },

  mutations: {
    ADD(state, value) {
      state.fruits[value]["quantity"]++
    },
    SUB(state, value) {
      state.fruits[value]["quantity"]--;
    },
    RESET(state) {
      state.fruits.forEach((i) => (i["quantity"] = 0));
    }
  },
})
```

- 将 store 实例作为插件安装

``` javascript
// src\main.js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
createApp(App).use(store).mount('#app')
```

- State

``` html
<!-- src\components\carts.vue -->
<ul>
    <li v-for="(item, index) in $store.state.fruits" :key="index">
      {{ item.name }} 单价:{{ item.price }}
      <counter :qu="item.quantity" :i="index" />
    </li>
</ul>
```

- Getter

``` html
<!-- src\components\carts.vue -->
<div>总价:{{ $store.getters.total }}</div>
```

- Action

``` javascript
// src\components\counter.vue
methods: {
    // ...
    sub() {
      this.$store.dispatch("sub", this.i);
    },
  },
```

- Mutation

``` javascript
// src\components\control.vue
methods: {
    reset() {
      this.$store.commit("RESET");
    },
  },

// src\components\counter.vue
methods: {
    add() {
      this.$store.commit("ADD", this.i);
    },
    // ...
  },

```
