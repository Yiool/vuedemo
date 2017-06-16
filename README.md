# toutiao-vue

> toutiao-vue

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Vue开发过程中所遇到的坑。技术栈(Vue2、Vue-router2、axios、Vuex2、Mint-ui)，采用官方提供的Vue-cli搭建项目主体结构。

> 特别说明：以下问题皆是我采用官方Vue-cli脚手架配合webpack2（不是webpack-simple）开发时所遇到的问题，并没有代表性，可能有人会出现以下的坑，也可能不会出现，仅供参考！！！仅供参考！！！仅供参考！！！

### 1. 如何解决开发过程中跨域问题(原文链接：http://www.jianshu.com/p/95b2caf7e0da)
  在开发时所用到的数据借口来源是api商店、并不支持跨域请求。在论坛中找到一种解决办法：
  在config配置文件夹`index.js`中（如果使用的Vue-cli搭建的项目环境）修改`proxyTable`配置，里面有一个changeOrigin参数，接收一个布尔值，如果设置为true,那么本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题了，当然这只适用于**开发环境**。开发时需要请求数据的地方直接可以使用`'/api'`，就相当于请求的`'http://api.jisuapi.com/news'`,当然后面可以添加相应参数。再次强调该方法只适用于开发环境！！
  详情可参考`https://vuejs-templates.github.io/webpack/proxy.html`

  ```
    dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://api.jisuapi.com/news',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  ```
### 2. 在使用Mint-ui时引入css时报错问题
   如果是完整引入整个Mint-ui，则有这样一行代码 `import 'mint-ui/lib/style.css'`，但编译时会报错，大致意思是找不到该css文件。原因是配置css编译规则时并没用包含`node_modules`文件夹中的文件，不会去编译该文件中的css文件，解决该问题方法是配置loader规则时增加`include`选项，增加`/node_modules/mint-ui/lib/`目录。

  ```
    {
        test: /\.css$/,
        include: [  
          /src/,//表示在src目录下的css需要编译  
          '/node_modules/mint-ui/lib/'   //增加此项  
        ],
        loader: 'style-loader!css-loader'
      },
  ```

  > 但是如果你使用的是按需引入则没有该问题，正常按官方文档操作即可正常使用。

### 3. 使用 `[].push.apply()` 向data中数据数组添加数据时不能触发视图更新。
   在做该项目首页时有一个上拉加载更多(10条)数据功能，刚开始思路是数据请求回来后向data中的数据数组中`push`数据，因为请求回来的数据也是一个数组，故而想到了`[].push.apply()`,但是这样做后数据是push进去了，但并没有触发视图更新。但如果我使用`for`循环依次push，而不用`apply`则能成功触发更新。官方文档上是这样写的：
   
   ```
      Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：
      push()
      pop()
      shift()
      unshift()
      splice()
      sort()
      reverse()
   ```

  上述几种方法并不是原生js方法，实质上是经过Vue底层封装的，经过包装后的这几种方法改变数组数据是可以被Vue监听到的，但是如果使用了`apply` 则调用的是原生的`push()`方法，这样就会被Vue的监听机制跳过(忽略)，从而不能触发视图实时更新。所以我的解决办法就是使用`for`循环，然后在循环中使用`push()`方法一项一项的向数组中添加数据。活生生聪明反被聪明误的例子。

### 4. 使用Mint-ui中Loadmore组件时浏览器卡死崩溃问题
   项目首页新闻列表的上拉加载更多，下拉刷新功能是使用的Mint-ui中的Loadmore组件，在使用时出现浏览器卡死问题。查文档是有这样一句话`“loadmore 在初始化时会自动检测它的高度是否能够撑满其容器，如果不能则会调用 bottom-method，直到撑满容器为止。如果不希望使用这一机制，可以将 auto-fill 设为 false。”` 问题的根源便是来源于此。项目首页的列表数据刚开始是没有任何数据的，而是在组件的`created`钩子函数中通过`ajax`请求获取的，也就是Loadmore组件初始化时，容器中并没有数据，根据上述的特性，便会一直调用`bottom-method`方法，而我定义的方法是发送`ajax`请求更多的数据，所以就导致不停的在发送请求，导致浏览器崩溃。
   解决办法就是将`auto-fill`设为`false`。

### 5. img标签中src属性如果是动态绑定的相对路径，则出现找不到资源错误。可能表述不清楚，举个例子吧。

```
<!--伪代码-->
html..
<div>
  <img :src="imgUrl">
</div>

script...
export default {
  data(){
    return {
      imgUrl:'../images/eg.png'  //假设在上层文件夹中有一张eg.png图片
    }
  }
}
```

   如果这样书写则会报错，并不能成功加载图片。解决办法如下：
```
<!--伪代码-->
html..
<div>
  <img :src="imgUrl">
</div>

script...
export default {
  data(){
    return {
      imgUrl:require('../images/eg.png')  //在这里使用`require`引入文件。即可正常渲染
    }
  }
}
```

### 6. 在优化路由组件时采用了`keep-alive`优化缓存遇到的问题点

  ```
  <!--伪代码-->
  html片段
  <template>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </template>
  ```
   官方文档中是这样表述`keep-alive`的：`“<keep-alive> 包裹动态组件时,会缓存不活动的组件实例，而不是销毁它们。主要用于保留组件状态或避免重新渲染。”` 如果不使用`keep-alive`时、每次切换路由进入组件时都会重新渲染DOM然后再获取数据更新DOM,依次触发`created-> mounted-> activated`钩子函数,退出时触发`deactivated`。 当引入keep-alive的时候，页面第一次进入，钩子的触发顺序`created-> mounted-> activated`,退出时触发`deactivated`。当再次进入（前进或者后退）时，只触发`activated`.那么问题来了,如果在`created`钩子函数中通过`ajax`获取数据,第一次进入组件数据是能获取到的,但如果重复进入时并不能触发`created`钩子函数,数据也就获取不到了.

   所以如果要使用`keep-alive`优化缓存的话,在数据获取时机上要有些许改动：

   - 方法1:在组件的`activated`钩子进行数据请求.
   ```
   <!--伪代码-->

   js片段：
   export default {
     activated(){
       //在这里发送数据请求
     }
   }

   ```
   - 方法2:使用组件中的`watch`属性,监测`$route`的变化,路由变化时进行数据请求.

   ```
   export default {
     watch: {
        '$route': function (to, from) {
          //在这里发送数据请求
        }
    },
   }
   ```

### 7. Vuex2中使用mapGetters/mapActions报错

   vuex2增加了 mapGetters 和 mapActions 的方法，借助对象展开符,可以写出下面代码：

   ```
  export default {
  // ...
  methods: {
      ...mapActions([
        'doSomething'
      ])
    },
  computed: {
  // 使用对象展开运算符将 getters 混入 computed属性中
    ...mapGetters([
      'something',
      // ...
      ])
    }
  }
   ```

   编译时会报错：`BabelLoaderError: SyntaxError: Unexpected token`

   解决方法很简单了，可以安装babel插件 `babel-plugin-transform-object-rest-spread` 。并对`.babelrc`做以下配置：

   ```
  {
  "presets": [
      ["es2015", { "modules": false }]
    ],
    "plugins": ["transform-object-rest-spread"]
  }
   ```

   参考文档连接：`http://www.tuicool.com/articles/ea2QF3z`

  

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
