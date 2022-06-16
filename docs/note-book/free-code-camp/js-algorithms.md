# JavaScript 算法

## 基础算法

### 反转字符串

例：`reverseString("hello")` 应返回 `olleh`

``` javascript
//遍历
function reverseString(str) {
  let reversedStr = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversedStr += str[i];
  }
  return reversedStr;
}
//arr.reverse()
function reverseString(str) {
  return str.split('').reverse().join('');
}
```

`reverse()` 方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

### 整数的阶乘

例：`factorialize(5)` 应该返回 `120`

``` javascript
//遍历
function factorialize(num) {
  let product = 1;
  for (let i = 2; i <= num; i++) {
    product *= i;
  }
  return product;
}
//递归
function factorialize(num) {
  if (num === 0) {return 1;}
  return num * factorialize(num - 1);
}
```

### 找出字符串中的最长单词的长度

例：`findLongestWordLength("The quick brown fox jumped over the lazy dog")` 应返回 `6`

``` javascript
//for循环遍历
function findLongestWordLength(str) {
  let words = str.split(' ');
  let maxLength = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > maxLength) {
      maxLength = words[i].length;
    }
  }
  return maxLength;
}
//arr.reduce
function findLongestWordLength(s) {
  return s.split(' ')
    .reduce(function(longest, word) {
      return Math.max(longest, word.length)
    }, 0);
}
//arr.map()
function findLongestWordLength(str) {
  return Math.max(...str.split(" ").map(word => word.length));
}
//递归
function findLongestWordLength(str) {
  const words = str.split(" ");
  if (words.length == 1) {
    return words[0].length;
  }
  return Math.max(
    words[0].length,
    findLongestWordLength(words.slice(1).join(" "))
  );
}
```

### 找出多个数组中的最大数字

请返回一个数组，该数组由参数中每个子数组中的最大数字组成。 为简单起见，给出的数组总会包含 4 个子数组。
例：`largestOfFour([[13, 27, 18, 26], [4, 5, 1, 3], [32, 35, 37, 39], [1000, 1001, 857, 1]])` 应返回 `[27, 5, 39, 1001]`

``` javascript
//遍历
function largestOfFour(arr) {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    let largestNumber = arr[i][0];
    for (let j = 1; j < arr[i].length; j++) {
      if (arr[i][j] > largestNumber) {
        largestNumber = arr[i][j];
      }
    }
    results[i] = largestNumber;
  }
  return results;
}
//arr.map()
function largestOfFour(arr) {
  return arr.map(function(group) {
    return group.reduce(function(prev, current) {
      return current > prev ? current : prev;
    });
  });
}
//递归
function largestOfFour(arr, finalArr = []) {
  return !arr.length
    ? finalArr
    : largestOfFour(arr.slice(1), finalArr.concat(Math.max(...arr[0])))
}
```

### 确认结尾

检查字符串（第一个参数 str）是否以给定的目标字符串（第二个参数 target）结束。  
这个挑战可以用 ES2015 引入的 `str.endsWith(searchString[, length])` 方法来解决。  
例：`confirmEnding("Congratulation", "on")` 应返回 `true`

``` javascript
//str.slice()
function confirmEnding(str, target) {
  return str.slice(str.length - target.length) === target;
}

function confirmEnding(str, target) {
  return str.slice(-target.length) === target
}
//正则
function confirmEnding(str, target) {
  let re = new RegExp(target + "$", "i");
  return re.test(str);
}
```

### 重复输出字符串

将一个给定的字符串 str（第一个参数）重复输出 num（第二个参数）次。 如果 num 不是正数，返回空字符串。  
不要使用 JavaScript 内置的 `str.repeat(count)` 方法。  
例：`repeatStringNumTimes("abc", 3)` 应返回 `abcabcabc`

``` javascript
//循环
function repeatStringNumTimes(str, num) {
  let accumulatedStr = "";
  for (let i = 0; i < num; i++) {
    accumulatedStr += str;
  }
  return accumulatedStr;
}
//递归
function repeatStringNumTimes(str, num) {
  if (num < 1) {
    return "";
  } else {
    return str + repeatStringNumTimes(str, num - 1);
  }
}
```

### 截断字符串

如果传入的字符串（第一个参数）的长度大于传入的值（第二个参数），请在这个位置截断它， 并在后面加上 `...`，然后返回结果。  
例：`truncateString("A-tisket a-tasket A green and yellow basket", 8)` 应返回 `A-tisket...`

``` javascript
function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}
```

### 按参数过滤数组

请写一个函数来检查数组（第一个参数 `arr`）中的元素，并返回数组中第一个通过校验测试的元素。 其中，“通过校验测试”指的是对于数组中的一个元素 `x`，若 `func(x)` 返回的结果为 `true`，则校验测试通过。 如果没有元素通过测试，请返回 `undefined`。  
例：`findElement([1, 3, 5, 8, 9, 10], function(num) { return num % 2 === 0; })` 应返回 `8`

``` javascript
//遍历
function findElement(arr, func) {
  let num = 0;
  for (let i = 0; i < arr.length; i++) {
    num = arr[i];
    if (func(num)) {return num;}
  }
  return undefined;
}
//arr.find()
function findElement(arr, func) {
  return arr.find(func);
}
//arr.map()
function findElement(arr, func) {
  return arr[arr.map(func).indexOf(true)];
}
//递归
//(如果arr===[]或func(arr[0])===true)=>arr[0]
function findElement(arr, func) {
  return arr.length && !func(arr[0]) 
    ? findElement(arr.slice(1), func)
    : arr[0];
}
```

### 句中单词首字母大写

请将传入的字符串中，每个单词的第一个字母变成大写并返回。 注意除首字母外，其余的字符都应是小写的。
例：`titleCase("I'm a little tea pot")` 应返回 `I'm A Little Tea Pot`

``` javascript
//拆成数组后遍历
function titleCase(str) {
  const newTitle = str.split(" ");
  const updatedTitle = [];
  for (let st in newTitle) {
    updatedTitle[st] = newTitle[st][0].toUpperCase() + newTitle[st].slice(1).toLowerCase();
  }
  return updatedTitle.join(" ");
}
//arr.map()
function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(val => val.replace(val.charAt(0), val.charAt(0).toUpperCase()))
    .join(" ");
}
//正则
function titleCase(str) {
  return str
    .toLowerCase()
    .replace(/(^|\s)\S/g, L => L.toUpperCase());
}
```

### Slice 与 Splice

本挑战的输入参数为两个数组和一个索引值。将第一个数组中的所有元素依次复制到第二个数组中。请注意，你需要从第二个数组索引值为 n 的地方开始插入。最后，请返回插入元素后的数组。 作为输入参数的两个数组在函数执行前后应保持不变。
例：`frankenSplice([1, 2, 3], [4, 5], 1)` 应返回 `[4, 1, 2, 3, 5]`

``` javascript
function frankenSplice(arr1, arr2, n) {
  let localArr = arr2.slice();
  localArr.splice(n, 0, ...arr1);
  return localArr;
}
```

### 过滤数组中的假值

从数组中移除所有假值（falsy values）。
JavaScript 中的假值有 `false`、`null`、`0`、`""`、`undefined`、`NaN`。
提示：可以考虑将每个值都转换为布尔值（boolean）。
例：`bouncer([7, "ate", "", false, 9])` 应返回 `[7, "ate", 9]`

``` javascript
//遍历
function bouncer(arr) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) newArray.push(arr[i]);
  }
  return newArray;
}
//
function bouncer(arr) {
  return arr.filter(Boolean);
}
```

### 找出元素在排序后数组中的索引

数组（第一个参数）在排序后，将一个值（第二个参数）插入该数组，并使数组保持有序。返回这个新插入元素的最小索引值。 返回值应为一个数字。
例：`getIndexToIns([10, 20, 30, 40, 50], 35)` 应返回 `3`

``` javascript
//遍历
function getIndexToIns(arr, num) {
  arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= num)
      return i;
  }
  return arr.length;
}
//arr.filter()
function getIndexToIns(arr, num) {
  return arr.filter(val => num > val).length;
}
//arr.findIndex()
function getIndexToIns(arr, num) {
  let index = arr
    .sort((curr, next) => curr - next)
    .findIndex(currNum => num <= currNum);
  return index === -1 ? arr.length : index;
}
//先合并排序再使用arr.indexOf()
function getIndexToIns(arr, num) {
  return arr
    .concat(num)
    .sort((a, b) => a - b)
    .indexOf(num);
}
```

### 比较字符串

如果数组里的第一个字符串包含了第二个字符串中的所有字母（忽略大小写），则返回 true。
例：`mutation(["hello", "Hello"])` 应返回 `true`  
`mutation(["hello", "hey"])` 应返回 `false`

``` javascript
//遍历
function mutation(arr) {
  let test = arr[1].toLowerCase();
  let target = arr[0].toLowerCase();
  for (let i = 0; i < test.length; i++) {
    if (target.indexOf(test[i]) < 0) return false;
    //if (!target.includes(test[i])) return false;
  }
  return true;
}
//arr.every()
function mutation(arr) {
  return arr[1]
    .toLowerCase()
    .split("")
    .every(function(letter) {
      return arr[0].toLowerCase().indexOf(letter) !== -1;
    });
}
```

### 分割数组

请编写一个函数，该函数将一个数组（第一个参数）拆分成若干长度为 `size`（第二个参数）的子数组，并将它们作为二维数组返回。  
例：`chunkArrayInGroups(["a", "b", "c", "d"], 2)` 应返回 `[["a", "b"], ["c", "d"]]`

``` javascript
//for遍历
function chunkArrayInGroups(arr, size) {
  let newArr = [];
  for (let i = 0; i < arr.length; i += size) {
    newArr.push(arr.slice(i, i + size));
  }
  return newArr;
}
//while遍历
function chunkArrayInGroups(arr, size) {
  let newArr = [];
  let i = 0;
  while (i < arr.length) {
    newArr.push(arr.slice(i, i + size));
    i += size;
  }
  return newArr;
}
//while遍历 使用arr.splice()
function chunkArrayInGroups(arr, size) {
  let newArr = [];
  while (arr.length > 0) {
    newArr.push(arr.splice(0, size));
  }
  return newArr;
}
//递归
function chunkArrayInGroups(arr, size) {
  if (arr.length <= size) {
    return [arr];
  } else {
    return [arr.slice(0, size)].concat(
      chunkArrayInGroups(arr.slice(size), size)
    );
  }
}
```

## 中级算法

### 范围内的数字求和

我们会传入一个由两个数字组成的数组。我们需要写一个函数，让它返回这两个数字间所有数字（包含这两个数字）的总和。 最低的数字并不总是第一位。
例：`sumAll([4,1])` 应返回 `10`

``` javascript
//先比较大小再遍历
function sumAll(arr) {
  let max = Math.max(arr[0], arr[1]);
  let min = Math.min(arr[0], arr[1]);
  let sumBetween = 0;
  for (let i = min; i <= max; i++) {
    sumBetween += i;
  }
  return sumBetween;
}
//Math.abs()返回绝对值，等差数列求和
const sumAll = arr => {
  const startNum = arr[0];
  const endNum = arr[1];
  const numCount = Math.abs(startNum - endNum) + 1;
  const sum = ((startNum + endNum) * numCount) / 2;
  return sum;
};
//遍历
function sumAll(arr) {
  let sumBetween = 0;
  for (let i = Math.min(...arr); i <= Math.max(...arr); i++) {
    sumBetween += i;
  }
  return sumBetween;
}
//递归
function sumAll(arr) {
  const [first, last] = [...arr].sort((a, b) => a - b);
  return first !== last
    ? first + sumAll([first + 1, last])
    : first;
}
```

### 数组的对称差

比较两个数组并返回一个新数组，包含所有只在其中一个数组中出现的元素，排除两个数组都存在的元素。 换言之，我们需要返回两个数组的对称差。  
例：`[1, 2, 3, 5], [1, 2, 3, 4, 5]` 应返回 `[4]`

``` javascript
//遍历筛选
function diffArray(arr1, arr2) {
  const newArr = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.indexOf(arr1[i]) === -1) {
        newArr.push(arr1[i]);
      }
    }
    for (let i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) === -1) {
        newArr.push(arr2[i]);
      }
    }
  return newArr;
}
//先合并再arr.filter()
function diffArray(arr1, arr2) {
  return arr1
    .concat(arr2)
    .filter(item => !arr1.includes(item) || !arr2.includes(item));
}
//先arr.filter()再合并
function diffArray(arr1, arr2) {
  return [...diff(arr1, arr2), ...diff(arr2, arr1)];
  function diff(a, b) {
    return a.filter(item => b.indexOf(item) === -1);
  }
}
```

### 过滤数组元素

你将获得一个初始数组（destroyer 函数中的第一个参数），后跟一个或多个参数。 从初始数组中移除所有与后续参数相等的元素。  
例：`destroyer([1, 2, 3, 1, 2, 3], 2, 3)` 应返回 `[1, 1]`。

``` javascript
//Array.from()获取参数
function destroyer(arr) {
  var valsToRemove = Array.from(arguments).slice(1);
  return arr.filter(function(val) {
    return !valsToRemove.includes(val);
  });
}
//Rest参数...
function destroyer(arr, ...valsToRemove) {
  return arr.filter(elem => !valsToRemove.includes(elem));
}
//Object.values()方法返回一个给定对象自身的所有可枚举属性值的数组
function destroyer(arr) {
  let valsToRemove = Object.values(arguments).slice(1);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < valsToRemove.length; j++) {
      if (arr[i] === valsToRemove[j]) {
        delete arr[i];
      }
    }
  }
  return arr.filter(item => item !== null);
}
```

### 找出包含特定键值对的对象

创建一个查看对象数组（第一个参数）的函数，并返回具有匹配的名称和值对（第二个参数）的所有对象的数组。 如果要包含在返回的数组中，则源对象的每个名称和值对都必须存在于集合中的对象中。  
例：`whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" })` 应返回 `[{ first: "Tybalt", last: "Capulet" }]`

``` javascript
//
function whatIsInAName(collection, source) {
  const souceKeys = Object.keys(source);
  return collection.filter(obj => {
    for (let i = 0; i < souceKeys.length; i++) {
      if (!obj.hasOwnProperty(souceKeys[i]) ||
          obj[souceKeys[i]] !== source[souceKeys[i]]) {
        return false;
      }
    }
    return true;
  });
}
//
function whatIsInAName(collection, source) {
  const sourceKeys = Object.keys(source);
  return collection
    .filter(obj => sourceKeys
                     .every(key => obj.hasOwnProperty(key) &&
                            obj[key] === source[key]));
}
//
function whatIsInAName(collection, source) {
  const souceKeys = Object.keys(source);
  return collection.filter(obj => souceKeys
      .map(key => obj.hasOwnProperty(key) && obj[key] === source[key])
      .reduce((a, b) => a && b));
}
```

### 短线连接格式

将字符串转换为短线连接格式。 短线连接格式是小写单词全部小写并以破折号分隔。字符串中单词之间以空格、`_`或者首字母大写的形式区分。  
例：`spinalCase("thisIsSpinalTap")` 应返回 `this-is-spinal-tap`。

``` javascript
//
function spinalCase(str) {
  var regex = /\s+|_+/g;
  str = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  return str.replace(regex, "-").toLowerCase();
}
//
function spinalCase(str) {
  str = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  return str
    .toLowerCase()
    .split(/_| /)
    .join("-");
}
//
function spinalCase(str) {
  str = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  return str
    .toLowerCase()
    .split(/(?:_| )+/)
    .join("-");
}
```

### 儿童黑话

一种英语语言游戏。 规则如下：

- 如果单词以辅音开头，就把第一个辅音字母或第一组辅音簇移到单词的结尾，并在后面加上 ay。
- 如果单词以元音开头，只需要在结尾加上 way。

请把传入的字符串根据上述规则翻译成儿童黑话并返回结果。 输入的字符串一定是一个小写的英文单词。  
例：`translatePigLatin("california")` 应该返回字符串 `aliforniacay`。

``` javascript
//
function translatePigLatin(str) {
  if (str.match(/^[aeiou]/)) return str + "way";
  const consonantCluster = str.match(/^[^aeiou]+/)[0];
  return str.substring(consonantCluster.length) + consonantCluster + "ay";
}
//
function translatePigLatin(str) {
  return str
    .replace(/^[aeiou]\w*/, "$&way")
    .replace(/(^[^aeiou]+)(\w*)/, "$2$1ay");
}
//
function translatePigLatin(str, charPos = 0) {
  return ['a', 'e', 'i', 'o', 'u'].includes(str[0])
    ? str + (charPos === 0 ? 'way' : 'ay')
    : charPos === str.length
      ? str + 'ay'
      : translatePigLatin(str.slice(1) + str[0], charPos + 1);
}
```

### 搜索与替换

在这道题目中，我们需要写一个字符串的搜索与替换函数，它的返回值为完成替换后的新字符串。

- 这个函数接收的第一个参数为待替换的句子。
- 第二个参数为句中需要被替换的单词。
- 第三个参数为替换后的单词。

注意： 在更换原始单词时保留原始单词中第一个字符的大小写。 即如果传入的第二个参数为 Book，第三个参数为 dog，那么替换后的结果应为 Dog。  
例：`myReplace("Let us go to the store", "store", "mall")` 应返回 `Let us go to the mall`。

``` javascript
//
function myReplace(str, before, after) {
  var index = str.indexOf(before);
  if (str[index] === str[index].toUpperCase()) {
    after = after.charAt(0).toUpperCase() + after.slice(1);
  } else {
    after = after.charAt(0).toLowerCase() + after.slice(1);
  }
  str = str.replace(before, after);
  return str;
}
//
function myReplace(str, before, after) {
  if (/^[A-Z]/.test(before)) {
    after = after[0].toUpperCase() + after.substring(1)
  } else {
    after = after[0].toLowerCase() + after.substring(1)
  }
  return str.replace(before, after);
}
```

### DNA 配对

给出的 DNA 链上缺少配对元素。 请基于每个字符，获取与其配对的元素，并将结果作为二维数组返回。
DNA 的碱基对 有两种形式：一种是 A 与 T，一种是 C 与 G。 请为参数中给出的每个字符配对相应的碱基。
注意，参数中给出的字符应作为每个子数组中的第一个元素返回。  
例：`pairElement("ATCGA")` 应返回 `[["A","T"],["T","A"],["C","G"],["G","C"],["A","T"]]`。

``` javascript
//
function pairElement(str) {
  var paired = [];
  var search = function(char) {
    switch (char) {
      case "A":
        paired.push(["A", "T"]);
        break;
      case "T":
        paired.push(["T", "A"]);
        break;
      case "C":
        paired.push(["C", "G"]);
        break;
      case "G":
        paired.push(["G", "C"]);
        break;
    }
  };
  for (var i = 0; i < str.length; i++) {
    search(str[i]);
  }
  return paired;
}
//
function pairElement(str) {
  var pairs = {
    A: "T",
    T: "A",
    C: "G",
    G: "C"
  };
  var arr = str.split("");
  return arr.map(x => [x, pairs[x]]);
}
```

### 寻找缺失的字母

在这道题目中，我们需要写一个函数，找出传入的字符串里缺失的字母并返回它。
如果所有字母都在传入的字符串范围内，返回 undefined。  
例：`fearNotLetter("abce")` 应该返回字符串 `d`。

``` javascript
//
function fearNotLetter(str) {
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    if (code !== str.charCodeAt(0) + i) {
      return String.fromCharCode(code - 1);
    }
  }
  return undefined;
}
//
function fearNotLetter(str) {
  let currCharCode = str.charCodeAt(0);
  let missing = undefined;
  str
    .split("")
    .forEach(letter => {
      if (letter.charCodeAt(0) === currCharCode) {
        currCharCode++;
      } else {
        missing = String.fromCharCode(currCharCode);
      }
    });
  return missing;
}
//
function fearNotLetter(str) {
  for (let i = 1; i < str.length; ++i) {
    if (str.charCodeAt(i) - str.charCodeAt(i - 1) > 1) {
      return String.fromCharCode(str.charCodeAt(i - 1) + 1);
    }
  }
}
//
function fearNotLetter(str) {
  var allChars = "";
  var notChars = new RegExp("[^" + str + "]", "g");
  for (var i = 0; allChars[allChars.length - 1] !== str[str.length - 1]; i++)
    allChars += String.fromCharCode(str[0].charCodeAt(0) + i);
  return allChars.match(notChars)
    ? allChars.match(notChars).join("")
    : undefined;
}
```

### 集合排序

编写一个带有两个或更多数组的函数，并按原始提供的数组的顺序返回一个新的唯一值数组。  
换句话说，所有数组中出现的所有值都应按其原始顺序包括在内，但最终数组中不得重复。  
去重后的数字应按其出现在参数中的原始顺序排序，最终数组不应按数字大小进行排序。  
例：`uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1])` 应返回 `[1, 3, 2, 5, 4]`

``` javascript
//
function uniteUnique(arr1, arr2, arr3) {
  const finalArray = [];
  for (let i = 0; i < arguments.length; i++) {
    const arrayArguments = arguments[i];
    for (let j = 0; j < arrayArguments.length; j++) {
      let indexValue = arrayArguments[j];
      if (finalArray.indexOf(indexValue) < 0) {
        finalArray.push(indexValue);
      }
    }
  }
//
function uniteUnique(arr) {
  const args = [...arguments];
  const result = [];
  for (let i = 0; i < args.length; i++) {
    for (let j = 0; j < args[i].length; j++) {
      if (!result.includes(args[i][j])) {
        result.push(args[i][j]);
      }
    }
  }
  return result;
}
//
function uniteUnique(...arr) {
  return [...new Set(arr.flat())];
}
//
function uniteUnique() {
  return [...arguments]
    .flat()
    .filter((item, ind, arr) => arr.indexOf(item) === ind);
}
```

### 转换 HTML 字符实体

请将字符串中的 `&`、`<`、`>`、`"`（双引号）和 `'`（单引号）转换为相应的 HTML 字符实体。  
例：`convertHTML("Dolce & Gabbana")` 应返回 `Dolce &amp; Gabbana`

``` javascript
//
function convertHTML(str) {
  var temp = str.split("");
  for (var i = 0; i < temp.length; i++) {
    switch (temp[i]) {
      case "<":
        temp[i] = "&lt;";
        break;
      case "&":
        temp[i] = "&amp;";
        break;
      case ">":
        temp[i] = "&gt;";
        break;
      case '"':
        temp[i] = "&quot;";
        break;
      case "'":
        temp[i] = "&apos;";
        break;
    }
  }
  temp = temp.join("");
  return temp;
}
//
function convertHTML(str) {
  const htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  };
  return str.replace(/([&<>\"'])/g, match => htmlEntities[match]);
}
//
function convertHTML(str) {
  const htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  };
  return str
    .split("")
    .map(entity => htmlEntities[entity] || entity)
    .join("");
}
```

### 求斐波那契数列中的奇数之和

在这道题目中，我们需要写一个函数，参数为一个正整数 num，返回值为斐波那契数列中，小于或等于 num 的奇数之和。
斐波那契数列中，第一和第二个数字都是 1。 后面的每个数字由之前两数相加得出。 斐波那契数列的前六个数字分别为：1、1、2、3、5、8。  
例：`sumFibs(4)` 应返回 `5`

``` javascript
//
function sumFibs(num) {
  let prevNumber = 0;
  let currNumber = 1;
  let result = 0;
  while (currNumber <= num) {
    if (currNumber % 2 !== 0) {
      result += currNumber;
    }
    currNumber += prevNumber;
    prevNumber = currNumber - prevNumber;
  }
  return result;
}
//
function sumFibs(num) {
  if (num <= 0) return 0;
  const arrFib = [1, 1];
  let nextFib = 0;
  while ((nextFib = arrFib[0] + arrFib[1]) <= num) {
    arrFib.unshift(nextFib);
  }
  return arrFib.filter(x => x % 2 != 0).reduce((a, b) => a + b);
}
```

### 质数求和

质数（prime number）是大于 1 且仅可以被 1 和自己整除的数。 比如，2 就是一个质数，因为它只可以被 1 和 2（它本身）整除。 相反，4 不是质数，因为它可以被 1, 2 和 4 整除。  
请完成 `sumPrimes` 方法，使其返回小于等于传入参数数字的所有质数之和。  
例：`sumPrimes(10)` 应返回 `17`

``` javascript
//
function sumPrimes(num) {
  function isPrime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i == 0)
        return false;
    }
    return true;
  }
  let sum = 0;
  for (let i = 2; i <= num; i++) {
    if (isPrime(i))
      sum += i;
  }
  return sum;
}
//
function sumPrimes(num) {
  let primes = [];
  for (let i = 2; i <= num; i++) {
    if (primes.every((prime) => i % prime !== 0))
      primes.push(i);
  }
  return primes.reduce((sum, prime) => sum + prime, 0);
}
//
function sumPrimes(num) {
  let isPrime = Array(num + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= num; j += i)
        isPrime[j] = false;
    }
  }
  return isPrime.reduce(
    (sum, prime, index) => prime ? sum + index : sum, 0
  );
}
```

### 找出数字范围内的最小公倍数

找到给定参数的最小公倍数，可以被这两个参数整除，也可以被指定范围内的所有整数整除。注意，较小数不一定总是出现在数组的第一个元素。  
例：`smallestCommons([1, 5])` 应返回 `60`

``` javascript
//
function smallestCommons(arr) {
  const [min, max] = arr.sort((a, b) => a - b);
  const numberDivisors = max - min + 1;
  let upperBound = 1;
  for (let i = min; i <= max; i++) {
    upperBound *= i;
  }
  for (let multiple = max; multiple <= upperBound; multiple += max) {
    let divisorCount = 0;
    for (let i = min; i <= max; i++) {
      if (multiple % i === 0) {
        divisorCount += 1;
      }
    }
    if (divisorCount === numberDivisors) {
      return multiple;
    }
  }
}
//
function smallestCommons(arr) {
  const [min, max] = arr.sort((a, b) => a - b);
  const range = Array(max - min + 1)
    .fill(0)
    .map((_, i) => i + min);
  const upperBound = range.reduce((prod, curr) => prod * curr);
  for (let multiple = max; multiple <= upperBound; multiple += max) {
    const divisible = range.every((value) => multiple % value === 0);
    if (divisible) {
      return multiple;
    }
  }
}
//
function smallestCommons(arr) {
  const [min, max] = arr.sort((a, b) => a - b);
  const range = Array(max - min + 1)
    .fill(0)
    .map((_, i) => i + min);
  const gcd = (a, b) => (b === 0) ? a : gcd(b, a % b);
  const lcm = (a, b) => a * b / gcd(a, b);
  return range.reduce((multiple, curr) => lcm(multiple, curr));
}
//
function smallestCommons(arr) {
  let primeFactors = {};
  const [min, max] = arr.sort((a, b) => a - b);
  for (let i = min; i <= max; i++) {
    let primes = getPrimeFactors(i);
    for (let j in primes) {
      if (!primeFactors[j] || primes[j] > primeFactors[j]) {
        primeFactors[j] = primes[j]
      }
    }
  }
  let multiple = 1;
  for (let i in primeFactors) {
    multiple *= i ** primeFactors[i]
  }
  return multiple;
}

function getPrimeFactors(num) {
  const factors = {};
  for (let prime = 2; prime <= num; prime++) {
    while ((num % prime) === 0) {
      factors[prime] = (factors[prime]) ? factors[prime] + 1 : 1;
      num /= prime;
    }
  }
  return factors;
}
```

### 根据参数删除数组元素

给定数组 arr，从数组的第一个元素开始，用函数 func 来检查数组的每个元素是否返回 true。 如果返回 false，就把这个元素删除。 持续执行删除操作，直到某个元素传入 func 时返回 true 为止。  
然后在条件满足后返回数组的其余部分，否则， arr 应作为空数组返回。  
例：`dropElements([1, 2, 3, 4], function(n) {return n >= 3;})` 应返回 `[3, 4]`

``` javascript
//
function dropElements(arr, func) {
  while (arr.length > 0 && !func(arr[0])) {
    arr.shift();
  }
  return arr;
}
//
function dropElements(arr, func) {
  let sliceIndex = arr.findIndex(func);
  return arr.slice(sliceIndex >= 0 ? sliceIndex : arr.length);
}
//
function dropElements(arr, func) {
  let originalLen = arr.length;
  for (let i = 0; i < originalLen; i++) {
    if (func(arr[0])) {
      break;
    } else {
      arr.shift();
    }
  }
  return arr;
}
//
function dropElements(arr, func, i = 0) {
  return i < arr.length && !func(arr[i])
    ? (dropElements(arr.slice(i + 1), func, i))
    : arr;
}
```

### 数组扁平化

嵌套数组扁平化成一维数组。 必须考虑到各种深度的嵌套层级。  
例：`steamrollArray([1, [2], [3, [[4]]]])` 应返回 `[1, 2, 3, 4]`

``` javascript
//
function steamrollArray(arr) {
  return arr.flat();
}
//
function steamrollArray(arr) {
  const flattenedArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flattenedArray.push(...steamrollArray(arr[i]));
    } else {
      flattenedArray.push(arr[i]);
    }
  }
  return flattenedArray;
};
//
function steamrollArray(arr) {
  const flat = [].concat(...arr);
  return flat.some(Array.isArray) ? steamrollArray(flat) : flat;
}
//
function steamrollArray(arr) {
  return arr
    .toString()
    .replace(",,", ",") // "1,2,,3" => "1,2,3"
    .split(",") // ['1','2','3']
    .map(function(v) {
      if (v == "[object Object]") {
        return {};
      } else if (isNaN(v)) {
        return v;
      } else {
        return parseInt(v); 
      }
    });
}
//
function steamrollArray(val,flatArr=[]) {
  val.forEach(item => {
    if (Array.isArray(item)) steamrollArray(item, flatArr);
    else flatArr.push(item);
  });
  return flatArr;
}
//
function steamrollArray(arr, flatArr = []) {
  const elem = arr.pop();
  return elem
    ? !Array.isArray(elem)
      ? steamrollArray(arr, [elem, ...flatArr])
      : steamrollArray(arr.concat(elem), flatArr)
    : flatArr;
}
```

### 翻译二进制字符串

请实现一个函数，把传入的二进制字符串转换成英文句子。二进制字符串会以空格分隔。  
例：`binaryAgent("01001001 00100000 01101100 01101111 01110110 01100101 00100000 01000110 01110010 01100101 01100101 01000011 01101111 01100100 01100101 01000011 01100001 01101101 01110000 00100001")` 应返回 `I love FreeCodeCamp!`

``` javascript
//
function binaryAgent(str) {
  var biString = str.split(" ");
  var uniString = [];
  for (var i = 0; i < biString.length; i++) {
    uniString.push(String.fromCharCode(parseInt(biString[i], 2)));
  }
  return uniString.join("");
}
//
function binaryAgent(str) {
  str = str.split(" ");
  var power;
  var decValue = 0;
  var sentence = "";
  for (var s = 0; s < str.length; s++) {
    for (var t = 0; t < str[s].length; t++) {
      if (str[s][t] == 1) {
        power = Math.pow(2, +str[s].length - t - 1);
        decValue += power;
      }
    }
    sentence += String.fromCharCode(decValue);
    decValue = 0;
  }
  return sentence;
}
//
function binaryAgent(str) {
  return String.fromCharCode(
    ...str.split(" ").map(function(char) {
      return parseInt(char, 2);
    })
  );
}
```

### 一切都是True

检查谓词（第二个参数）在集合（第一个参数）的所有元素是否为 truthy。  
换句话说，你将获得一个对象的数组集合。 如果数组中的每个对象里，pre 对应属性值均为 truthy，则返回 true。 否则，返回 false 。  
JavaScript 中，如果一个值在 Boolean 的上下文中的执行结果为 true，那么我们称这个值是 truthy 的。  
例：`truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "isBot")` 应该返回 `false`

``` javascript
//
function truthCheck(collection, pre) {
  return collection.every(function (element) {
    return element.hasOwnProperty(pre) && Boolean(element[pre]);
  });
}
//
function truthCheck(collection, pre) {
  let counter = 0;
  for (let c in collection) {
    if (collection[c].hasOwnProperty(pre) && Boolean(collection[c][pre])) {
      counter++;
    }
  }
  return counter == collection.length;
}
//
function truthCheck(collection, pre) {
  return collection.every(obj => obj[pre]);
}
```

### 可选参数

创建一个将两个参数相加的函数。 如果只提供了一个参数，则返回一个需要一个参数并返回总和的函数。  
比如，`addTogether(2, 3)` 应该返回 `5`。 而 `addTogether(2)` 应该返回一个函数。  
调用这个返回的函数，为它传入一个值，会返回两个值的总和：`var sumTwoAnd = addTogether(2);`
`sumTwoAnd(3)` 应返回 `5`。  
如果任一参数不是有效数字，则返回 `undefined`。  

``` javascript
//
function addTogether() {
  const [first, second] = arguments;
  if (typeof(first) !== "number")
    return undefined;
  if (second === undefined)
    return (second) => addTogether(first, second);
  if (typeof(second) !== "number")
    return undefined;
  return first + second;
}
//
function addTogether() {
  const [first, second] = arguments;
  if (typeof(first) !== "number") {
    return undefined;
  }
  else if (second === undefined) {
    function addSecond(second) {
      if (typeof(second) !== "number") {
        return undefined;
      }
      else {
        return first + second;
      }
    }
    return addSecond;
  }
  else if (typeof(second) !== "number") {
    return undefined;
  }
  else {
    return first + second;
  }
}
```

### 创建一个人员对象

``` javascript
const Person = function(firstAndLast) {
  // 完成下面的方法，其余的执行类似
  this.getFullName = function() {
    return "";
  };
  return firstAndLast;
};

const bob = new Person('Bob Ross');
```

用以下方法填充对象构造函数：

``` javascript
getFirstName()
getLastName()
getFullName()
setFirstName(first)
setLastName(last)
setFullName(firstAndLast)
```

运行测试以查看每个方法的预期输出。 方法接收一个参数，因此必须要有一个参数，并且其类型应该为字符串。 这些方法必须是与对象交互的唯一可用方法。
例：`bob.getFirstName()` 应该在 `bob.setFullName("Haskell Curry")` 之后返回字符串 `Haskell`

``` javascript
var Person = function(firstAndLast) {
  let fullName = firstAndLast;
  this.getFirstName = function() {
    return fullName.split(" ")[0];
  };
  this.getLastName = function() {
    return fullName.split(" ")[1];
  };
  this.getFullName = function() {
    return fullName;
  };
  this.setFirstName = function(name) {
    fullName = name + " " + fullName.split(" ")[1];
  };
  this.setLastName = function(name) {
    fullName = fullName.split(" ")[0] + " " + name;
  };
  this.setFullName = function(name) {
    fullName = name;
  };
};
```

### 计算轨道周期

我们需要写一个计算天体轨道周期（单位是秒）的函数。
它接收一个对象数组参数 `arr`，对象中包含表示天体名称的 `name` 属性，及表示天体表面平均海拔的 `avgAlt` 属性。 就像这样：`{name: 'name', avgAlt: avgAlt}`。  
轨道周期的计算公式：T=2π√(R^3/GM),  
最终的计算结果应取整到最接近的整数。 在这里计算地球的轨道周期。  
地球半径为 6367.4447 公里，地球的 GM 值为 398600.4418 km 3 s -2 。  
例：`orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}])` 应返回 `[{name : "iss", orbitalPeriod: 5557}, {name: "hubble", orbitalPeriod: 5734}, {name: "moon", orbitalPeriod: 2377399}]`

``` javascript
//
function orbitalPeriod(arr) {
  const GM = 398600.4418;
  const earthRadius = 6367.4447;
  const a = 2 * Math.PI;
  const newArr = [];
  const getOrbPeriod = function(obj) {
    const c = Math.pow(earthRadius + obj.avgAlt, 3);
    const b = Math.sqrt(c / GM);
    const orbPeriod = Math.round(a * b);
    return {name: obj.name, orbitalPeriod: orbPeriod};
  };
  for (let elem in arr) {
    newArr.push(getOrbPeriod(arr[elem]));
  }
  return newArr;
}
//
function orbitalPeriod(arr) {
  const GM = 398600.4418;
  const earthRadius = 6367.4447;
  const newArr = [];
  for (let elem in arr) {
    const orbitalPer = Math.round(
      2 * Math.PI * Math.sqrt(Math.pow(arr[elem].avgAlt + earthRadius, 3) / GM)
    );
    newArr.push({name: arr[elem].name, orbitalPeriod: orbitalPer});
  }
  return newArr;
}
//
function orbitalPeriod(arr) {
  const GM = 398600.4418;
  const earthRadius = 6367.4447;
  const newArr = JSON.parse(JSON.stringify(arr));
  newArr.forEach(function(item) {
    const tmp = Math.round(
      2 * Math.PI * Math.sqrt(Math.pow(earthRadius + item.avgAlt, 3) / GM)
    );
    delete item.avgAlt;
    item.orbitalPeriod = tmp;
  });

  return newArr;
}
//
function orbitalPeriod(arr) {
  const GM = 398600.4418;
  const earthRadius = 6367.4447;
  return arr.map(({ name, avgAlt }) => {
    const earth = earthRadius + avgAlt;
    const orbitalPeriod = Math.round(2 * Math.PI * Math.sqrt(Math.pow(earth, 3)/GM));
    return { name, orbitalPeriod };
  });
}
```

## 认证算法题

### 回文检查器

如果传入的字符串是回文字符串，则返回 true。 否则返回 false。  
回文 palindrome，指在忽略标点符号、大小写和空格的前提下，正着读和反着读一模一样。  
注意：检查回文时，你需要先去除所有非字母数字的字符（标点、空格和符号），并将所有字母都转换成大写或都转换成小写。  
例：`palindrome("eye")` 应返回 `true`  
`palindrome("_eye")` 应返回 `true`

``` javascript
//双指针(对撞指针)
function palindrome(str) {
  str=str.replace(/[\W_]/g,'').toLowerCase();
  for(let i=0;i<str.length/2;i++){
    if(str[i]!==str[str.length-i-1]){return false}
  }
  return true
}
//转换成数组，使用arr.reverse()
function palindrome (str) {
    if (str.length === 1) {
        return true;
    }
    str = str.replace(/[\W_]/g, '').toLowerCase();
    return str === str.split('').reverse().join('');
}
//递归比较首尾字符
function palindrome(str) {
    str = str.replace(/[\W_]/g, '').toLowerCase();
    if (str.length < 2) {
        return true;
    }
    if (str[0] !== str[str.length - 1]) {
        return false;
    }
    return palindrome(str.slice(1, -1));
}
```

### 罗马数字转换器

把传入的数字转为罗马数字。  
转换后的罗马数字字母必须都是大写。  
例：`convertToRoman(2)` 应该返回字符串 `II`  
`convertToRoman(3999)` 应该返回字符串 `MMMCMXCIX`

``` javascript
//将罗马数字与十进制数字一一对应
function convertToRoman(num) {
  const arr=[["","I","II","III","IV","V","VI","VII","VIII","IX"],
  ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],
  ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],
  ["","M","MM","MMM"]];
  let str='';
  let thousandnum=Math.floor(num/1000);
  let hundrednum=Math.floor((num-thousandnum*1000)/100);
  let tennum=Math.floor((num-thousandnum*1000-hundrednum*100)/10);
  let digitnum=num%10;
  return str.concat(arr[3][thousandnum],arr[2][hundrednum],arr[1][tennum],arr[0][digitnum]);
}
//将罗马数字中的特殊数字列举出来，将参数从大到小匹配
function convert(num) {
    const arr = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
    const strArr = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];
    let result = '';
    while (num > 0) {
        var i = arr.length;
        while (i >= 0) {
            if (num >= arr[i]) {
                result += strArr[i];
                num -= arr[i];
            } else {
                i--;
            }
        }
    }
    return result;
}
```

### 凯撒密码

凯撒密码（ Caesar cipher）是最简单且最广为人知的密码（ciphers），也被称为移位密码（shift cipher）。 在移位密码中，明文中的字母通过按照一个固定数目进行偏移后被替换成新的字母。  
ROT13 是一个被广泛使用的加密技术，明文中的所有字母都被移动 13 位。 也就是， A ↔ N，B ↔ O 等等。  
编写一个函数，它将 ROT13 编码的字符串作为输入并返回解码字符串。  
所有解码后的字母都必须为字母大写。 请不要解码非字母的字符（例如，空格、标点符号），但你需要在结果中保留它们。  
例：`rot13("SERR PBQR PNZC")` 应解码为 `FREE CODE CAMP`
`rot13("SERR CVMMN!")` 应解码为 `FREE PIZZA!`

``` javascript
//对照加密前后的字母列表替换相同索引处的字母
function rot13(str) {
  const arrbefore='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const arrafter='NOPQRSTUVWXYZABCDEFGHIJKLM'.split('');
  return str.replace(/[A-Z]/g,function(letter){return arrafter[arrbefore.indexOf(letter)]})
}
//大写字母 A-Z 在 UTF-16 代码单元中的索引为 65-90
function rot13(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        let currentCode = str[i].charCodeAt();
        if (currentCode > 90 || currentCode < 65) {
            result += String.fromCharCode(currentCode);
        } else if (currentCode < 78) {
            result += String.fromCharCode(currentCode + 13);
        } else {
            result += String.fromCharCode(currentCode - 13);
        }
    }
    return result;
}
//对于正整数 n 与 m，n % m 的结果应该始终为 0 至 m - 1 中的一个数。
//n % 26 刚好偏移是 13，所以 String.fromCharCode(n) % 26 + 65 就是加密后的结果
function rot13(str) {
    return str.replace(/[A-Z]/g, char => String.fromCharCode(char.charCodeAt() % 26 + 65));
}
```

### 电话号码检查器

如果传入的字符串是一个有效的美国电话号码格式，则返回 true。
以下是一些正确的例子：

``` javascript
555-555-5555
(555)555-5555
（555）555-5555
555 555 5555
5555555555
1 555 555 5555
```

在这个挑战中，参数可能是 `800-692-7753` 或者 `8oo-six427676;laskdjf` 的号码。 你的任务是根据上面不同的格式组合，判断它是否为有效的电话号码。 其中，地区码（电话号码中的前三位）是必须的。 如果提供国家代码，则国家代码只能为 `1`。 如果传入的参数是有效的美国电话号码就返回 true，否则返回 false。  
例：`telephoneCheck("1 555-555-5555")` 应返回 `true`

``` javascript
//正则
function telephoneCheck(str) {
  return /^1?\s?(\(\d{3}\)|\d{3})(\s|-)?\d{3}(\s|-)?\d{4}$/.test(str);
}
//穷举排除
function telephoneCheck(str) {
  if(str.search(/[^\d\s-()]/)!=-1)return false;
  if(str.indexOf(")") >= 0 && str.indexOf("(") < 0)return false;
  if(str.indexOf("(") >= 0 && str.indexOf(")") < 0)return false;
  if(str.indexOf("(") >= 0 && str.indexOf(")") != str.indexOf("(") + 4 )return false;
  let strArr = str.split('');
  if(strArr[0] == "-"|strArr[str.length+1] == "-"|strArr[str.length] == "-"|strArr[str.length-1] == "-"|strArr[str.length-2] == "-")return false;
  let numStr = str.replace(/[^\d]/g,"");
  if(numStr.length !=10 && numStr.length != 11)return false;
  if(numStr.length == 11 && numStr[0] !== "1")return false;
  return true;
}
```

### 计算找零

请编写一个用于收银机的函数 `checkCashRegister()`：它的第一个参数为售价 `price`、第二个参数为支付金额 `cash`、第三个参数为收银机內的金额 `cid`。
`cid` 是包含货币面值的二维数组。  
函数 `checkCashRegister()` 应返回含有 `status` 属性和 `change` 属性的对象。  
如果收银机內的金额少于应找回的零钱数，或者你无法返回确切的数目时，返回 `{status: "INSUFFICIENT_FUNDS", change: []}`。  
如果收银机內的金额恰好等于应找回的零钱数，返回 `{status: "CLOSED", change: [...]}`，其中 `change` 的属性值就是收银机內的金额。
否则，返回 `{status: "OPEN", change: [...]}`，其中 `change` 键值是应找回的零钱数，并将找零的面值由高到低排序。  
|货币单位 Unit|面值|
|:-|:-|
|Penny |0.01 美元（PENNY）|
|Nickel |0.05 美元（NICKEL）
|Dime |0.1 美元（DIME）
|Quarter |0.25 美元（QUARTER）
|Dollar |1 美元（ONE）
|Five Dollars |5 美元（五）
|Ten Dollars |10 美元（TEN）
|Twenty Dollars |20 美元（TWENTY）
|One-hundred Dollars |100美元（ONE HUNDRED）
下面是 `cid` 数组示例：

``` javascript
[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
```

例：`checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])` 应返回 `{status: "OPEN", change: [["QUARTER", 0.5]]}`  
`checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])` 应返回 `{status: "INSUFFICIENT_FUNDS", change: []}`

``` javascript
function checkCashRegister(price, cash, cid) {
  let change=[];
  let changetotal=(cash-price)*100;
  let denomarr=[1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
  let denomaname=[];
  let cidarr=[];
  for(let i=0;i<cid.length;i++){
    cidarr.push(Math.round(cid[i][1]*100));
    denomaname.push(cid[i][0])
  };
  let cidtotal=cidarr.reduce((sum,i)=>sum+i);
  if(changetotal>cidtotal){
    return {status: "INSUFFICIENT_FUNDS", change: []}
    };
  if(changetotal===cidtotal){
      return {status: "CLOSED", change: cid}
    };
  for(let i=denomarr.length-1;i>=0;i--){
    let currentneed=changetotal-changetotal%denomarr[i];
    if(currentneed>cidarr[i]&&cidarr[i]>0){
      change.push([denomaname[i],cidarr[i]/100])
      changetotal=changetotal-cidarr[i];
    }else if(currentneed<=cidarr[i]&&currentneed>0){
      change.push([denomaname[i],currentneed/100])
      changetotal=changetotal-currentneed;
    };
}
    if(changetotal===0){
      return {status: "OPEN", change:change}
      }else{
        return {status: "INSUFFICIENT_FUNDS", change: []}
      }
}
```
