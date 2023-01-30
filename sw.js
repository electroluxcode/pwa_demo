
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
  "main.css",
  "e.png",
  "pwa-fonts.png",
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
    Promise.all(
      caches.keys().then(cacheNames => {
        return cacheNames.map(name => {
          if (name !== cacheStorageKey) {
            return caches.delete(name)
          }
        })
      })
    ).then(() => {
      console.log('Clients claims.')
      //在新安装的 Service Worker 中通过调用 self.clients.claim() 
      //取得页面的控制权, 这样之后打开页面都会使用版本更新的缓存。
      //旧的 Service Worker 脚本不再控制着页面之后会被停止
      return self.clients.claim()
    })
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



