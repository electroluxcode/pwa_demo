pwa 示例

### PWA |  service worker

```js
--1.定义：
fcm 不能启动意味着消息推送
移动端 安装 pwa应用需要 梯子（md。极大的心智负担）
本质安装这个就是 一个chrome_proxy。另外这个东西在手机端吃
渐进式 web 应用（Progressive Web App）
渐进式 web 应用 就是 实现了和原生应用相近的用户体验的网页应用

Service Worker 是浏览器和网络之间的虚拟代理。 运行在一个与 页面的 JavaScript 主线程 独立的线程上，它没有对 DOM 结构的访问权限，可以在不同上下文间 发送/接收 信息。因为强大，所以 Service Workers 只能在安全的上下文中执行（即 HTTPS ）

--2.示例：  
if ("serviceWorker" in navigator) {
    // 浏览器支持 Service Worker
    navigator.serviceWorker
      .register("serviceWorker.js") // 这里可以接受第二个参数，用于设置 scope 范围
      .then(function (registration) {
        // 如果存放在网站根路径下，将会收到该网站的所有 fetch 事件
        console.log("ServiceWorker注册成功: ", registration.scope);
      })
      .catch(function (err) {
        console.log("ServiceWorker注册失败: ", err);
      });
  }

--3.局限：
遇到的阻碍：
第一个是腾讯，微信/QQ——微信/QQ拥有最大的用户群，腾讯要推自家小程序，它不支持PWA就难搞，一个商业app很难无视腾讯背后的流量（除了阿里）。
第二个，国内浏览器对PWA支持很差，连百度查到的chrome下载，长久以来一直都是停留在很古老版本。
第三个阻碍，国内的GCM/FCM 基本无法用，其它厂商对web push实现很乱

Google为安卓准备了基于Google服务的GCM/FCM推送服务，APP不需要驻留后台，只需要接入到GCM/FCM中，APP就可以借助Google服务器直接向安卓机推送消息。

--4.链式启动是如何解决APP推送问题的?

APP驻留后台很容易被系统挂城墙
此景此境下，APP们只能抱团取暖了——既然单个APP很难停留在后台，那么APP之间相互唤起，那就容易多了！开启一个APP后，就拉起另一个抱团的APP，那大家的进程都激活了，推送服务也就顺理成章。(大部分的链式唤醒，都是由于APP们接入了同样的推送SDK。那么为什么会有这个apk呢？
国内APP们想要实现推送功能，需要借助第三方的推送SDK例如开发者熟知的友盟、极光、个推等等)

--4.开发过程可以在application 中的service workers 和 cache storage去查看
生命周期 
install
activate（清理比较key）
fetch （自定义缓存）
更新我们要用 cacheName

--5. 什么是CacheStorage？
CacheStorage是浏览器中的一种存储机制，用于存储和检索网络请求和响应。它以Request 为key，Response为value去存储请求和响应对象

CacheStorage不是Service Worker API，但它使SW能够缓存网络响应，以便在用户断开与网络的连接时提供脱机功能。

--6.有哪些Service Worker能做但是web worker不能的？

Web Workers——为Web内容提供在后台线程中运行脚本的简单方法。工作线程可以在不干扰用户界面的情况下执行任务。此外，它们还可以使用XMLHttpRequest执行I/O（尽管responseXML和channel属性始终为空）。创建后，工作人员可以通过将消息发布到该代码指定的事件处理程序中来向创建该代码的JavaScript代码发送消息（反之亦然）。
Service Worker——本质上是充当位于Web app与浏览器和网络（如果可用）之间的代理服务器。它们旨在（除其他外）创建有效的脱机体验，拦截网络请求并根据网络是否可用以及服务器上是否存在更新的资产(assets)来采取适当的操作。它们还允许访问推送通知和后台同步API。

作者：Earl_Lam
链接：https://juejin.cn/post/6844904052166230030
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```





serveice worker 生命周期

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d26737a3c0754b4da1e068432657306b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp">



#### 2.1.43.1 manifest.json

```js
使用PWA很简单，只需要在HTML中的head中使用link标签引用一个manifest.json文件即可.点击底部工具栏的JSON 选择 json with comments
{
  // 应用的名称
  "name": "Electrolux_docs",
  // 简称
  "short_name": "demo",
  // 显示模式 fullscreen（全屏） | standalone(独立) | standalone（最小化） | browser（浏览器）
  "display": "standalone",
  // 启动页
  "start_url": "/",  
  // 主题颜色
  "theme_color": "#313131",
  // 背景颜色
  "background_color": "#313131",
  "icons": [
    {
      "src": "e.png",
      "sizes": "256x256",
      "type": "image/png"
    }
  ]
}
<link rel="manifest" href="manifest.json" />


```



#### 2.1.43.2 sw.js 方法

```js
html 的 script标签 中写入.Add to Home Screen，即添加到主屏幕


console.log('Script loaded!')
/**
 * self: 表示 Service Worker 作用域, 也是全局变量
 * caches: 表示缓存
 * skipWaiting: 表示强制当前处在 waiting 状态的脚本进入 activate 状态
 * clients: 表示 Service Worker 接管的页面
 * 
 */



//重要：这里定义一个key，如果变化了 那么也会变
var cacheStorageKey = 'min'

var cacheList = [
  "/docs/main.css",
  "/docs/e.png",
  "/docs/pwa-fonts.png",
]
//重点：可以在注册完成安装 Service Worker 时, 抓取静态资源写入缓存:
self.addEventListener('install', function(e) {
  console.log('Cache event!')
  e.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      //写入内存 
      console.log('Adding to Cache:', cacheList)
      return cache.addAll(cacheList)
    }).then(function() {
      console.log('Skip waiting!')
      //skipwaiting为了在页面更新的过程当中,
      // 新的 Service Worker 脚本能立即激活和生效。
      return self.skipWaiting()
    })
  )
})

//重要：更新静态资源 可以遍历所有的缓存名称逐一判断决决定是否清除
self.addEventListener('activate', function(e) {
  console.log('Activate event')
  e.waitUntil(
    console.log("sdsd")
    // Promise.all(
    //   caches.keys().then(cacheNames => {
    //     return cacheNames.map(name => {
    //       if (name !== cacheStorageKey) {
    //         return caches.delete(name)
    //       }
    //     })
    //   })
    // ).then(() => {
    //   console.log('Clients claims.')
    //   //在新安装的 Service Worker 中通过调用 self.clients.claim() 
    //   //取得页面的控制权, 这样之后打开页面都会使用版本更新的缓存。
    //   //旧的 Service Worker 脚本不再控制着页面之后会被停止
    //   return self.clients.claim()
    // })
  )
})

//重要：处理动态缓存
self.addEventListener('fetch', function(e) {
  // console.log('Fetch event:', e.request.url)
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response != null) {
        console.log('Using cache for:', e.request.url)
        return response
      }
      console.log('Fallback to fetch:', e.request.url)
      return fetch(e.request.url)
    })
  )
})


//重要：消息推送

// self.showNotification('Hello World!', {
//   body: 'This is a notification!',
//   icon: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/703a0cee8b0b494eadd27adc61883956~tplv-k3u1fbpfcp-watermark.image?',
//   actions: [{
//       action: 'yes',
//       title: 'Yes'
//   }, {
//       action: 'no',
//       title: 'No'
//   }]
// });

// self.addEventListener('notificationclick', (event) => {
//   // 判断点击的是哪个按钮
//   if (event.action === 'yes') {
//       console.log('yes');
//   } else if (event.action === 'no') {
//       console.log('no');
//   }
// });




```





#### 2.1.43.3 html方法

```html
在安装Service Worker且用户转至其他页面或刷新当前页面后，Service Worker将开始接收fetch事件


<head>
  <title>Electrolux demo</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=no" />
  <link rel="manifest" href="/docs/manifest.json" />
  <link rel="stylesheet" type="text/css" href="/docs/main.css">
  <link rel="icon" href="/docs/e.png" type="image/png" />
</head>

<body>
  <div class="revision">测试</div>
  <img src="/docs/pwa-fonts.png">
  <div class="main-text">
    Electrolux demo 示例
  </div>
  <div class="network-message">
    Network:
    <span id="network-status" class="">Good</span>
    <button id="notifications" onclick="addToDesktop()">安装</button>
  </div>




  <script>
    //这里是进行sw.js 离线缓存的设置，注册service worker
    if (navigator.serviceWorker != null) {
      navigator.serviceWorker.register('/docs/sw.js')
        .then(function (registration) {
          console.log('Registered events at scope: ', registration.scope);
        });
    }

   

    var statusEl = document.querySelector('#network-status')
    if (!navigator.onLine) {
      statusEl.classList = ['is-offline']
      statusEl.innerText = 'Offline'
    }
  </script>

  <script>

    //首先进行授权
    Notification.requestPermission().then(function (result) {
      if (result === 'granted') {
        console.log("已经授权")
      }
    });

    
    var deferredPrompt = null;

    // 监听beforeinstallprompt事件，该事件在网站满足PWA安装条件时触发，保存安装事件
    window.addEventListener("beforeinstallprompt", e => {
        e.preventDefault();
        deferredPrompt = e;
    });

    // 监听appinstalled事件，该事件在用户同意安装后触发，清空安装事件
    window.addEventListener("appinstalled", () => {
        deferredPrompt = null;
    });

    // 手动触发PWA安装
    function addToDesktop() {
      
        deferredPrompt.prompt();
    }


    
  </script>
</body>
```

