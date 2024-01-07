# JavaScript

## 基础 JavaScript

### arr.push()

`push()` 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

### arr.pop()

`pop()`方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

### arr.shift()

`shift()` 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。

### arr.unshift()

`unshift()` 方法将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。

### 生成随机数

`Math.random()` 函数返回一个浮点型伪随机数字，在0（包括0）和1（不包括）之间。  
`Math.floor()` 返回小于或等于一个给定数字的最大整数。
`Math.floor(Math.random() * (max - min + 1)) + min` 生成某个范围内的随机整数。

### parseInt()

`parseInt(string, radix)` 解析一个字符串并返回指定基数的十进制整数， `radix` 是2-36之间的整数，表示被解析字符串的基数。

### 三元运算符 `?`

``` javascript
let result = condition ? value1 : value2;
```

计算条件结果，如果结果为真，则返回 `value1`，否则返回 `value2`。

### 使用递归来创建一个数字序列

``` javascript
function rangeOfNumbers(startNum, endNum) {
  if (endNum - startNum === 0) {
    return [startNum];
  } else {
    var numbers = rangeOfNumbers(startNum, endNum - 1);
    numbers.push(endNum);
    return numbers;
  }
}
```

## ES6

### 变量声明的三种方式

`let` `const` `var`

### Object.freeze()

`Object.freeze(obj)` 方法可以冻结一个对象，被冻结对象自身的所有属性都不可能以任何方式被修改。

### 箭头函数

``` javascript
let func = (arg1, arg2, ..., argN) => expression;
```

等同于匿名函数：

```javascript
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

具体有两种：
不带花括号：`(...args) => expression`
— 右侧是一个表达式：函数计算表达式并返回其结果。
带花括号：`(...args) => { body }`  
— 花括号允许我们在函数中编写多个语句，但是我们需要显式地 `return` 来返回一些内容。

### Rest 参数 `...`

Rest 参数可以通过使用三个点 ... 并在后面跟着包含剩余参数的数组名称，来将它们包含在函数定义中。这些点的字面意思是“将剩余参数收集到一个数组中”。  
Rest 参数用于创建可接受任意数量参数的函数。

### Spread 语法

当在函数调用中使用 `...arr` 时，它会把可迭代对象 `arr` “展开”到参数列表中。`arr` 不仅仅是数组，任何可迭代对象都可以。  
Spread 语法用于将数组传递给通常需要含有许多参数的列表的函数。

### 解构赋值

解构赋值可以立即将一个对象或数组映射到多个变量上。

``` javascript
//对象解构
const user = { name: 'John Doe', age: 34 };
const { name, age } = user;
//解构数组
const [a, b,,, c] = [1, 2, 3, 4, 5, 6];
console.log(a, b, c);  //1, 2, 5
const [a, b, ...arr] = [1, 2, 3, 4, 5, 7];
console.log(arr);  //[3, 4, 5, 7]
```

### 模板字符串

``` javascript
const person = {
  name: "Zodiac Hasbro",
  age: 56
};
const greeting = `Hello, my name is ${person.name}!
I am ${person.age} years old.`;
console.log(greeting);
```

### 简洁的函数声明

``` javascript
// const person = {
//   name: "Taylor",
//   sayHello: function() {
//     return `Hello! My name is ${this.name}.`;
//   }
// };
const person = {
  name: "Taylor",
  sayHello() {
    return `Hello! My name is ${this.name}.`;
  }
};
```

### 简洁的对象字面量声明

``` javascript
// const getMousePosition = (x, y) => ({x: x, y: y});
const getMousePosition = (x, y) => ({ x, y });
```

### “class” 语法

``` javascript
class MyClass {
  // class 方法
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

然后使用 `new MyClass()` 来创建具有上述列出的所有方法的新对象。
`new` 会自动调用 `constructor()` 方法，因此我们可以在 `constructor()` 中初始化对象。

### getters 和 setters

你可以从对象中获得一个值，也可以给对象的属性赋值。  
这些操作通常被称为 getters 以及 setters。  
Getter 函数的作用是可以让对象返回一个私有变量，而不需要直接去访问私有变量。  
Setter 函数的作用是可以基于传进的参数来修改对象中私有变量。这些修改可以是计算，或者是直接替换之前的值。

``` javascript
class Book {
  constructor(author) {this._author = author;}
  // getter
  get writer() {return this._author;}
  // setter
  set writer(updatedAuthor) {this._author = updatedAuthor;}
}

const novel = new Book('anonymous');
console.log(novel.writer);  //anonymous
novel.writer = 'newAuthor';
console.log(novel.writer);  //newAuthor
```

### 导出和导入

``` javascript
// 导出数组
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// 导出 const 声明的变量
export const MODULES_BECAME_STANDARD_YEAR = 2015;
// 导出类
export class User {
  constructor(name) {
    this.name = name;
  }
}
```

``` javascript
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}
tion sayBye(user) {
  alert(`Bye, ${user}!`);
}
export {sayHi, sayBye}; // 导出变量列表
```

``` javascript
import {sayHi, sayBye} from './say.js';
```

`export default` 用于为模块或文件声明一个返回值，在每个文件或者模块中应当只默认导出一个值。不能将 export default 与 var、let 或 const 同时使用。

``` javascript
// 📁 user.js
export default class User { // 只需要添加 "default" 即可
  constructor(name) {
    this.name = name;
  }
}
//然后将其导入而不需要花括号：
// 📁 main.js
import User from './user.js'; // 不需要花括号 {User}，只需要写成 User 即可
new User('John');
```

### Promise

`Promise` 是异步编程的一种解决方案 - 它在未来的某时会生成一个值。  
`Promise` 是构造器函数，需要通过 new 关键字来创建。 构造器参数是一个函数，该函数有两个参数 - `resolve` 和 `reject`。 通过它们来判断 promise 的执行结果。

``` javascript
const myPromise = new Promise((resolve, reject) => {});
```

Promise 有三个状态：`pending`、`fulfilled` 和 `rejected`。 Promise 成功时调用 resolve，promise 执行失败时调用 reject。

``` javascript
const myPromise = new Promise((resolve, reject) => {
  if(condition here) {
    resolve("Promise was fulfilled");
  } else {
    reject("Promise was rejected");
  }
});
```

当 promise 完成 resolve 时会触发 then 方法。  

``` javascript
promise.then(
  function(result) { /* handle a successful result */ },
  function(error) { /* handle an error */ }
);
```

`.then` 的第一个参数是一个函数，该函数将在 `promise resolved` 后运行并接收结果。  
`.then` 的第二个参数也是一个函数，该函数将在 `promise rejected` 后运行并接收 error。  
如果我们只对成功完成的情况感兴趣，那么我们可以只为 `.then` 提供一个函数参数。
如果我们只对 error 感兴趣，那么我们可以使用 `null` 作为第一个参数：`.then(null, errorHandlingFunction)`。或者我们也可以使用 `.catch(errorHandlingFunction)`，其实是一样的：

``` javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});
// .catch(f) 与 promise.then(null, f) 一样
promise.catch(alert); // 1 秒后显示 "Error: Whoops!"
```

`.catch(f)` 调用是 `.then(null, f)` 的完全的模拟，它只是一个简写形式。

## 正则表达式

### regexp.test(str)

方法 `regexp.test(str)` 查找匹配项，然后返回 true/false 表示是否存在。

### 选择（OR）`|`

### 修饰符

- `i` - 使用此修饰符后，搜索时不区分大小写: A 和 a 没有区别。
- `g` - 使用此修饰符后，搜索时会查找所有的匹配项，而不只是第一个。
- `m` - 多行模式（详见章节 Flag "m" — 多行模式）。
- `s` - 启用 “dotall” 模式，允许点 `.` 匹配换行符 `\n`。

### str.match(regexp)

- `match()` 方法检索返回一个字符串匹配正则表达式的结果。
如果未使用g标志，则仅返回第一个完整匹配及其相关的捕获组（Array）。 在这种情况下，返回的项目将具有如下所述的其他属性。
- `groups`: 一个捕获组数组 或 undefined（如果没有定义命名捕获组）。
- `index`: 匹配的结果的开始位置
- `input`: 搜索的字符串str

``` javascript
const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/;
const found = paragraph.match(regex);
console.log(found);        //Array ["T"]
console.log(found.groups)  //undefined
console.log(found.index);  //0
console.log(found.input);  //"The quick brown fox jumps over the lazy dog. It barked."
```

如果使用g标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组。

``` javascript
const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const found = paragraph.match(regex);
console.log(found);    //Array ["T", "I"]
```

如果没有匹配项，则无论是否带有标记 g ，都将返回 `null`。  
如果没有匹配项，我们得到的不是一个空数组，而是 `null`。

### 字符类

- `\d`（“d” 来自 “digit”） - 数字：从 0 到 9 的字符。
- `\s`（“s” 来自 “space”） - 空格符号：包括空格，制表符 `\t`，换行符 `\n` 和其他少数稀有字符，例如 `\v`，`\f` 和 `\r`。
- `\w`（“w” 来自 “word”） - “单字”字符：拉丁字母或数字或下划线 _。非拉丁字母（如西里尔字母或印地文）不属于 \w。
- `\D` - 非数字：除 `\d` 以外的任何字符，例如字母。
- `\S` - 非空格符号：除 `\s` 以外的任何字符，例如字母。
- `\W` - 非单字字符：除 `\w` 以外的任何字符，例如非拉丁字母或空格。
- `.` - 是一种特殊字符类，它与 “除换行符之外的任何字符” 匹配。在“dotall” 模式下匹配任何字符。

### 集合和范围 [...]

在方括号 `[…]` 中的几个字符或者字符类意味着“搜索给定的字符中的任意一个”。

- 比如说，`[eao]` 意味着查找在 3 个字符 'a'、'e' 或者 'o' 中的任意一个。这被叫做一个集合。
- 方括号也可以包含字符范围。比如说，`[a-z]` 会匹配从 a 到 z 范围内的字母，`[0-5]` 表示从 0 到 5 的数字。
- 除了普通的范围匹配，还有类似 `[^…]` 的“排除”范围匹配。比如 `[^aeyo]` 匹配任何除了 'a'、'e'、'y' 或者 'o' 之外的字符。
- 在方括号 `[…]` 表示中，绝大多数特殊字符可以在不转义的情况下使用。

### 量词 `+,*,?` 和 `{n}`

- 数量 `{n}`
  - 确切的位数：`{5}`
  - 某个范围的位数：`{3,5}`
- 缩写
  - `+` - 代表“一个或多个”，相当于 `{1,}`
  - `*` - 代表着“零个或多个”，相当于 `{0,}`。
  - `?` - 代表“零个或一个”，相当于 `{0,1}`。

### 转义

`[` `\` `^` `$` `.` `|` `?` `*` `+` `(` `)` `/` 等需要在它们前面加上反斜杠 `\`（“转义它们”）

### 懒惰模式

- 默认情况下，正则表达式引擎会尝试尽可能多地重复量词。例如，`\d+` 检测所有可能的字符。
- 通过在量词后添加问号 `?` 来启用。如`\d+?`

### 锚点：字符串开始 `^` 和末尾 `$`

### 捕获组

模式的一部分可以用括号括起来 `(...)`。这称为“捕获组（capturing group）”。  
这有两个影响：  
它允许将匹配的一部分作为结果数组中的单独项。  
如果我们将量词放在括号后，则它将括号视为一个整体。
>不带括号，模式 `go+` 表示 g 字符，其后 o 重复一次或多次。例如 `goooo` 或 `gooooooooo`。
>括号将字符组合，所以 `(go)+` 匹配 `go`，`gogo`，`gogogo`等。

``` javascript
//域名
let regexp = /(\w+\.)+\w+/g;
alert( "site.com my.site.com".match(regexp) ); // site.com,my.site.com

//邮箱
let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
alert("my@mail.com @ his@site.com.uk".match(regexp)); // my@mail.com, his@site.com.uk
```

更多内容：https://zh.javascript.info/regexp-groups

### 前瞻断言与后瞻断言

- 前瞻肯定断言 `x(?=y)`，它表示“匹配 x, 仅在后面是 y 的情况”。

``` javascript
let str = "1 turkey costs 30€";
alert( str.match(/\d+(?=€)/) ); // 30 （正确地跳过了单个的数字 1）
```

- 前瞻否定断言 `x(?!y)`，意思是 “匹配 x, 但是仅在不被 y 跟随的情况下匹配成功”。

``` javascript
let str = "2 turkeys cost 60€";
alert( str.match(/\d+(?!€)/) ); // 2（正确地跳过了价格）
```

- 后瞻肯定断言：`(?<=y)x`, 匹配 x, 仅在前面是 y 的情况。
- 后瞻否定断言：`(?<!y)x`, 匹配 x, 仅在前面不是 y 的情况。
- 捕获组:
  环视断言括号中（前瞻和后瞻的通用名称）的内容不会成为匹配到的一部分结果。例如：在模式 `\d+(?!€)` 中，€ 符号就不会出现在匹配结果中。
  但是如果我们想要捕捉整个环视表达式或其中的一部分，那也是有可能的。只需要将其包裹在另加的括号中。

  ``` javascript
  let str = "1 turkey costs 30€";
  let reg = /\d+(?=(€|kr))/; // €|kr 两边有额外的括号
  alert( str.match(reg) ); // 30, €
  ```

### str.replace(str|regexp, str|func)

`replace()` 方法返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。如果pattern是字符串，则仅替换第一个匹配项。  
该方法并不改变调用它的字符串本身，而只是返回一个新的替换后的字符串。  
在进行全局的搜索替换时，正则表达式需包含 g 标志。

### str.trim()

`trim()` 方法会从一个字符串的两端删除空白字符。  
`trim()` 方法返回一个从两头去掉空白字符的字符串，并不影响原字符串本身。
>使用正则表达式和 `str.replace()` 实现：

``` javascript
let result = str.replace(/^\s+|\s+$/g, "");
```

## 基础数据结构

### arr.splice()

`splice()` 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
语法：`array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`  

``` javascript
const numbers = [10, 11, 12, 12, 15];
numbers.splice(3, 1, 13, 14);
console.log(numbers);  //[ 10, 11, 12, 13, 14, 15 ]
```

### arr.slice()

`arr.slice([begin[, end]])` 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。

``` javascript
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]
console.log(animals.slice(-2));
// expected output: Array ["duck", "elephant"]
console.log(animals.slice());
// expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
```

展开运算符（spread operator）`[...arr]`可以实现和`arr.slice()`一样的复制数组的效果。

### arr.indexOf()

`arr.indexOf(searchElement[, fromIndex])` 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

``` javascript
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
console.log(beasts.indexOf('bison'));
// expected output: 1
console.log(beasts.indexOf('bison', 2));
// expected output: 4
console.log(beasts.indexOf('giraffe'));
// expected output: -1
```

### delete 操作符

`delete` 操作符用于删除对象的某个属性；如果没有指向这个属性的引用，那它最终会被释放。
`delete expression`  
`expression` 的计算结果应该是某个属性的引用，例如：

``` javascript
delete object.property
delete object['property']
```

### 使用 for...in 语句遍历对象

``` javascript
for (let user in users) {
  console.log(user);
}
```

将在控制台打印 Alan、Jeff、Sarah 和 Ryan - 每个值占一行。

### obj.hasOwnProperty()

`obj.hasOwnProperty(prop)` 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

``` javascript
const object1 = {};
object1.property1 = 42;
console.log(object1.hasOwnProperty('property1'));
// expected output: true
console.log(object1.hasOwnProperty('property2'));
// expected output: false
```

### Object.keys()

`Object.keys(obj)` 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。

``` javascript
// simple array
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']
// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']
// array like object with random key ordering
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']
```

## 面向对象编程

### 对象

我们可以通过使用带有可选 属性列表 的花括号 `{…}` 来创建对象。一个属性就是一个键值对（`“key: value”`），其中键（`key`）是一个字符串（也叫做属性名），值（`value`）可以是任何值。  
我们可以用下面两种语法中的任一种来创建一个空的对象:

``` javascript
let user = new Object(); // “构造函数” 的语法
let user = {};  // “字面量” 的语法
```

通常，我们用花括号。这种方式我们叫做字面量。

### 方法

``` javascript
let user = {
  name: "John",
  age: 30
};
user.sayHi = function() {
  alert("Hello!");
};
user.sayHi(); // Hello!
```

这里我们使用函数表达式创建了一个函数，并将其指定给对象的 `user.sayHi` 属性。随后我们像这样 `user.sayHi()` 调用它。  
作为对象属性的函数被称为 方法。

### 方法中的this

通常，对象方法需要访问对象中存储的信息才能完成其工作。
例如，`user.sayHi()` 中的代码可能需要用到 `user` 的 `name` 属性。  
为了访问该对象，方法中可以使用 `this` 关键字。  
`this` 的值就是在点之前的这个对象，即调用该方法的对象。

``` javascript
let user = {
  name: "John",
  age: 30,
  sayHi() {
    // "this" 指的是“当前的对象”
    alert(this.name);
  }
};
user.sayHi(); // John
```

### 构造器

构造函数在技术上是常规函数。不过有两个约定：  
它们的命名以大写字母开头。  
它们只能由 "`new`" 操作符来执行。  

``` javascript
function User(name) {
  this.name = name;
  this.isAdmin = false;
}
let user = new User("Jack");
```

这和使用字面量创建是一样的：

``` javascript
let user = {
  name: "Jack",
  isAdmin: false
};
```

构造器的主要目的 —— 实现可重用的对象创建代码。
让我们再强调一遍 —— 从技术上讲，任何函数（除了箭头函数，它没有自己的 this）都可以用作构造器。即可以通过 new 来运行，它会执行上面的算法。“首字母大写”是一个共同的约定，以明确表示一个函数将被使用 new 来运行。

### 使用 instanceof 验证对象的构造函数

`object instanceof constructor` 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。返回值是返回 true 或者 false。

### 自有属性和原型属性

直接在实例对象上定义的属性叫自有属性（own properties）；  
`prototype` 是一个可以在所有`构造函数`的实例之间共享的对象。  
JavaScript 中几乎所有的对象都有一个 prototype 属性，这个属性是属于它所在的构造函数。

### 迭代所有属性

``` javascript
function Bird(name) {
  this.name = name;  //own property
}
Bird.prototype.numLegs = 2; // prototype property
let duck = new Bird("Donald");

let ownProps = [];
let prototypeProps = [];
for (let property in duck) {
  if(duck.hasOwnProperty(property)) {
    ownProps.push(property);
  } else {
    prototypeProps.push(property);
  }
}

console.log(ownProps);   //["name"]
console.log(prototypeProps);  //["numLegs"]
```

### 构造函数属性

`Object.prototype.constructor` 返回创建实例对象的 Object 构造函数的引用。注意，此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。

### 将原型更改为新对象

到目前为止，你已经可以单独给 prototype 添加属性了：

``` javascript
Bird.prototype.numLegs = 2;
```

需要添加多个属性的，这未免会显得拖沓。

``` javascript
Bird.prototype.eat = function() {
  console.log("nom nom nom");
}
Bird.prototype.describe = function() {
  console.log("My name is " + this.name);
}
```

一种更有效的方法就是给对象的 prototype 设置为一个已经包含了属性的新对象。 这样一来，所有属性都可以一次性添加进来：

``` javascript
Bird.prototype = {
  numLegs: 2, 
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name);
  }
};
```

### 更改原型时，记得设置构造函数属性

手动设置一个新对象的原型有一个重要的副作用。 它清除了 constructor 属性！  
此属性可以用来检查是哪个构造函数创建了实例，但由于该属性已被覆盖，它现在给出了错误的结果：

``` javascript
duck.constructor === Bird;   //false
duck.constructor === Object;   //true
duck instanceof Bird;   //true
```

为了解决这个问题，凡是手动给新对象重新设置过原型对象的，都别忘记在原型对象中定义一个 constructor 属性:

``` javascript
Bird.prototype = {
  constructor: Bird,
  numLegs: 2,
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name); 
  }
};
```

### prototypeObj.isPrototypeOf(object)

`isPrototypeOf()` 方法用于测试一个对象是否存在于另一个对象的原型链上。
>isPrototypeOf() 与 instanceof 运算符不同。在表达式 "object instanceof AFunction"中，object 的原型链是针对 AFunction.prototype 进行检查的，而不是针对 AFunction 本身。

``` javascript
function Bird(name) {
  this.name = name;
}
let duck = new Bird("Donald");
Bird.prototype.isPrototypeOf(duck);  //true
```

duck 从 Bird 构造函数那里继承了它的 prototype。

### 原型链

JavaScript 中所有的对象（除了少数例外）都有自己的 prototype。 而且，对象的 prototype 本身也是一个对象。所以 prototype 对象也有它自己的 prototype。  
`supertype` 超类或父类，`subtype`亚类或子类。  
Object 是 JavaScript 中所有对象的 supertype，也就是原型链的最顶层。 因此，所有对象都可以访问 `Object.prototype` 上的方法，如`hasOwnProperty`。

### 从超类继承

我们创建了一个Animal 超类（supertype），用来定义所有动物共有的行为：

``` javascript
function Animal() { }
Animal.prototype.eat = function() {
  console.log("nom nom nom");
};
```

第一步：创建一个超类 supertype（或者叫父类）的实例。

``` javascript
let animal = Object.create(Animal.prototype);
```

`Object.create(obj)` 创建了一个新对象，并指定了 obj 作为新对象的 prototype。  
第二步：给子类设置 prototype。

``` javascript
Bird.prototype = Object.create(Animal.prototype);
```

这样一来，Bird 就是 Animal 的一个实例了。

### 重置一个继承的构造函数属性

当一个对象从另一个对象那里继承了其 prototype 时，那它也继承了父类的 constructor 属性。

``` javascript
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
let duck = new Bird();
duck.constructor
```

但是 duck 和其他所有 Bird 的实例都应该表明它们是由 Bird 创建的，而不是由 Animal 创建的。 为此，你可以手动将 Bird 的构造函数属性设置为 Bird 对象：

``` javascript
Bird.prototype.constructor = Bird;
duck.constructor
```

### 继承后添加方法

``` javascript
function Animal() { }
Animal.prototype.eat = function() {
  console.log("nom nom nom");
};
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
Bird.prototype.constructor = Bird;
```

除了从 Animal 构造函数继承的行为之外，还需要给 Bird 对象添加它独有的行为。 这里，我们给 Bird 对象添加一个 fly() 函数。 函数会以一种与其他构造函数相同的方式添加到 Bird's 的 prototype 中：

``` javascript
Bird.prototype.fly = function() {
  console.log("I'm flying!");
};
```

### 重写继承的方法

我们学习了一个对象可以通过引用另一个对象的 prototype 来继承其属性和行为（或方法）：

``` javascript
ChildObject.prototype = Object.create(ParentObject.prototype);
```

然后，ChildObject 将自己的方法链接到它的 prototype中：

``` javascript
ChildObject.prototype.methodName = function() {...};
```

我们还可以重写继承的方法。 以同样的方式 - 通过使用一个与需要重写的方法相同的方法名，向`ChildObject.prototype` 中添加方法。

``` javascript
function Animal() { }
Animal.prototype.eat = function() {
  return "nom nom nom";
};
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
Bird.prototype.eat = function() {
  return "peck peck peck";
};
```

如果你有一个实例：`let duck = new Bird()`;，然后你调用了 `duck.eat()`，以下就是 JavaScript 在 duck 的 prototype 链上寻找方法的过程：
duck => eat() 是定义在这里吗？ 不是。
Bird => eat() 是定义在这里吗？ => 是的。 执行它并停止往上搜索。
Animal => 这里也定义了 eat() 方法，但是 JavaScript 在到达这层原型链之前已停止了搜索。
Object => JavaScript 在到达这层原型链之前也已经停止了搜索。

### 使用 Mixin 在不相关对象之间添加共同行为

正如你所见，行为是可以通过继承来共享的。 然而，在有些情况下，继承不是最好的解决方案。 继承不适用于不相关的对象，比如 Bird 和 Airplane。 虽然它们都可以飞行，但是 Bird 并不是一种 Airplane，反之亦然。  
对于不相关的对象，更好的方法是使用 mixins。 mixin 允许其他对象使用函数集合。

``` javascript
let flyMixin = function(obj) {
  obj.fly = function() {
    console.log("Flying, wooosh!");
  }
};
```

flyMixin 能接受任何对象，并为其提供 fly 方法。

``` javascript
let bird = {
  name: "Donald",
  numLegs: 2
};
let plane = {
  model: "777",
  numPassengers: 524
};
flyMixin(bird);
flyMixin(plane);
```

里的 flyMixin 接收了bird 和 plane 对象，然后将 fly 方法分配给了每一个对象。 现在 bird 和 plane 都可以飞行了：

``` javascript
bird.fly();
plane.fly();
```

### 使用闭包保护对象内的属性不被外部修改

在上一次挑战中，bird 有一个公共属性 name。 公共属性的定义就是：它可以在 bird 的定义范围之外被访问和更改。  
因此，代码的任何地方都可以轻松地将 bird 的 name 属性更改为任意值。使属性私有化最简单的方法就是在构造函数中创建变量。 可以将该变量范围限定在构造函数中，而不是全局可用。 这样，属性只能由构造函数中的方法访问和更改。

``` javascript
function Bird() {
  let hatchedEgg = 10;
  this.getHatchedEggCount = function() { 
    return hatchedEgg;
  };
}
let ducky = new Bird();
ducky.getHatchedEggCount();
```

这里的 `getHatchedEggCount` 是一种特权方法，因为它可以访问私有属性 `hatchedEgg`。 这是因为 `hatchedEgg` 是在与 `getHatchedEggCount` 相同的上下文中声明的。 在 JavaScript 中，函数总是可以访问创建它的上下文。 这就叫做 闭包(closure)。

### 立即调用函数表达（IIFE）

函数没有名称，也不存储在变量中。 函数表达式末尾的两个括号（）会让它被立即执行或调用。 这种模式被叫做立即调用函数表达式（immediately invoked function expression) 。

``` javascript
(function () {
  console.log("Chirp, chirp!");
})();
```

一个 IIFE 通常用于将相关功能分组到单个对象或者是 module 中。例如，先前的挑战中定义了两个 mixins：

``` javascript
function glideMixin(obj) {
  obj.glide = function() {
    console.log("Gliding on the water");
  };
}
function flyMixin(obj) {
  obj.fly = function() {
    console.log("Flying, wooosh!");
  };
}
```

我们可以将这些 mixins 分成以下模块：

``` javascript
let motionModule = (function () {
  return {
    glideMixin: function(obj) {
      obj.glide = function() {
        console.log("Gliding on the water");
      };
    },
    flyMixin: function(obj) {
      obj.fly = function() {
        console.log("Flying, wooosh!");
      };
    }
  }
})();
```

一个 IIFE 返回了一个 motionModule 对象。 返回的这个对象包含了作为对象属性的所有 mixin 行为。 module 模式的优点是，所有的运动相关的行为都可以打包成一个对象，然后由代码的其他部分使用。 下面是一个使用它的例子：

``` javascript
motionModule.glideMixin(duck);
duck.glide();
```

## 函数式编程

函数式编程是一种方案简单、功能独立、对作用域外没有任何副作用的编程范式：INPUT -> PROCESS -> OUTPUT。  
函数式编程：  
1）功能独立——不依赖于程序的状态（比如可能发生变化的全局变量）；  
2）纯函数——同一个输入永远能得到同一个输出；  
3）有限的副作用——可以严格地限制函数外部对状态的更改。

### 函数式编程术语

`Callbacks` 是被传递到另一个函数中调用的函数。  
函数就像其他正常值一样，可以赋值给变量、传递给另一个函数，或从其它函数返回，这种函数叫做`头等 (first-class) 函数`。 在 JavaScript 中，所有函数都是头等函数。  
将函数为参数或返回值的函数叫做`高阶 (higher order) 函数`。
当函数被传递给另一个函数或从另一个函数返回时，那些传入或返回的函数可以叫做 `lambda`。

### 命令式编程的危害

命令式编程常常改变程序状态，例如更新全局变量。一个典型的例子是编写 for 循环，它为一个数组的索引提供了准确的迭代方向。
函数式编程是声明式编程的一种形式。JavaScript 提供了许多处理常见任务的方法，所以你无需写出计算机应如何执行它们。 例如，你可以用 map 函数替代上面提到的 for 循环来处理数组迭代。

### 函数式编程的核心原则

- 不要更改变量或对象 - 创建新变量和对象，并在需要时从函数返回它们。

>变化会导致错误。如果一个函数不改变传入的参数、全局变量等数据，那么它造成问题的可能性就会小很多。

- 声明函数参数 - 函数内的任何计算仅取决于参数，而不取决于任何全局对象或变量。

>这样做会有很多好处：
>
>- 其中一点是让函数更容易测试，因为你确切地知道参数是什么，并且这个参数也不依赖于程序中的任何其他内容。
>- 其次，这样做可以让你更加自信地更改，删除或添加新代码。 因为你很 清楚哪些是可以改的，哪些是不可以改的，这样你就知道哪里可能会有潜在的 陷阱。
>- 最后，无论代码的哪一部分执行它，函数总是会为同一组输入生成相同的输出。

### 在原型上实现 map 方法

``` javascript
Array.prototype.myMap = function(callback) {
  var newArray = [];
  for (let i = 0; i < this.length; i++) {
    newArray.push(callback(this[i]));
  }
  return newArray;
};
```

### arr.filter()

`filter()` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

### 在原型上实现 filter 方法

``` javascript
Array.prototype.myFilter = function(callback) {
  var newArray = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i]) === true) {
      newArray.push(this[i]);
    }
  }
  return newArray;
};
```

### arr.slice()

`slice()` 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。

### arr.concat()

`concat()` 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

### arr.reduce()

`reduce()` 方法对数组中的每个元素按序执行一个由您提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

### arr.sort()

`sort()` 方法用原地算法对数组的元素进行排序，并返回数组。

### str.split()

`split()` 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。

### arr.join()

`join()` 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

### arr.every()

`every()` 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

### arr.some()

`some()` 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回一个布尔值。

### 函数柯里化和局部调用

arity（参数个数）是函数所需的形参的数量。 函数柯里化（Currying）意思是把接受多个 arity 的函数变换成接受单一 arity 的函数。  
换句话说，就是重构函数让它接收一个参数，然后返回接收下一个参数的函数，依此类推。

``` javascript
function unCurried(x, y) {
  return x + y;
}

function curried(x) {
  return function(y) {
    return x + y;
  }
}

const curried = x => y => x + y
curried(1)(2)  //3
```

柯里化在不能一次为函数提供所有参数情况下很有用。 因为它可以将每个函数的调用保存到一个变量中，该变量将保存返回的函数引用，该引用在下一个参数可用时接受该参数。
柯里化 是一种转换，将 `f(a,b,c)` 转换为可以被以 `f(a)(b)(c)` 的形式进行调用。JavaScript 实现通常都保持该函数可以被正常调用，并且如果参数数量不足，则返回偏函数。
