/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["./static/css/10.cac9c8b2.chunk.css","398af8d416441e8a68398558124a17fb"],["./static/css/8.e798bc1a.chunk.css","6158a8a6e9ca2fa0aa4352ce5d5f5f33"],["./static/css/9.8842e76d.chunk.css","18add75b73aaa59c4484c4f478ed5915"],["./static/css/main.1d7108ff.chunk.css","f8f9b31f73ea3964a0bc2e07ffad622d"],["./static/css/src~main.7127f931.chunk.css","4cbb92ab4f0e9df869a3440a4c7159df"],["./static/js/10.a6684685.chunk.js","b955239465ae347434b00116a41a2d65"],["./static/js/10.a6684685.chunk.js.br","2f0309ac0c6eb8ecaec069250f763495"],["./static/js/10.a6684685.chunk.js.gz","4e70d28d4a1cd5d6215fb21c41cc3f32"],["./static/js/11.f8310fa2.chunk.js","45f8818b01b9a5ab358a13d375c3c205"],["./static/js/11.f8310fa2.chunk.js.br","d8325210fa27a422576b616d4a4960fd"],["./static/js/11.f8310fa2.chunk.js.gz","bb61fef05a45fbae6f379f67a0218064"],["./static/js/12.f4c5221d.chunk.js","3d83d9a4b1de51bb5dc77774979c1f53"],["./static/js/12.f4c5221d.chunk.js.br","51c32df770781a4bf14a5039fe3ef85c"],["./static/js/12.f4c5221d.chunk.js.gz","2f14810f72944a4e875379147d1e4a3b"],["./static/js/13.4f7e47e2.chunk.js","79483d0ab92011580467140fd464d345"],["./static/js/13.4f7e47e2.chunk.js.br","292fcf8624dd08695cc8f5753735afdd"],["./static/js/13.4f7e47e2.chunk.js.gz","367be5216beae2a5628afbdfa5904c28"],["./static/js/8.637a5762.chunk.js","27cdd9b959274e3cf1a7c1068e2cb9f1"],["./static/js/8.637a5762.chunk.js.LICENSE.txt","941c19020738b6711e1652a801a90b60"],["./static/js/8.637a5762.chunk.js.br","ff25c1f18338c47fbc1160a6554a1df4"],["./static/js/8.637a5762.chunk.js.gz","5ccc9fd3afac21e375db9f70e35cd51e"],["./static/js/9.9a8d4d59.chunk.js","2786b93deb9b45971fd9f499791ac9b7"],["./static/js/9.9a8d4d59.chunk.js.br","7bddb27ca931b42d8bea0f1b436a95f0"],["./static/js/9.9a8d4d59.chunk.js.gz","94138ca465599285eec82798bc07ba63"],["./static/js/dingtalk~main.d1ad3f2e.chunk.js","afba88619b0e294742df36ea45cb6208"],["./static/js/dingtalk~main.d1ad3f2e.chunk.js.br","1fea86daef71ee3be74dadc88e2a31c2"],["./static/js/dingtalk~main.d1ad3f2e.chunk.js.gz","9856c3337241ac6a9c8f5cb68f9b8c77"],["./static/js/elliptic~main.f6ff6688.chunk.js","62fc80b8b5383de9cd30144703489705"],["./static/js/elliptic~main.f6ff6688.chunk.js.br","f876b293cb4fb6f2508ddc769a41664e"],["./static/js/elliptic~main.f6ff6688.chunk.js.gz","399803b388dbb86a116e08039fd2c495"],["./static/js/feb~main.22cc1bde.chunk.js","7fa9994e5e243a4999343e77210efcb2"],["./static/js/feb~main.22cc1bde.chunk.js.LICENSE.txt","63aabe1cb43f8c75e57e712260cc97fb"],["./static/js/feb~main.22cc1bde.chunk.js.br","a7e819c368a1cedab0a913c4190fb9ac"],["./static/js/feb~main.22cc1bde.chunk.js.gz","05b63617741d3b2652f30cf05055a6f8"],["./static/js/main.0d867043.chunk.js","7bdd49398f053c1900e4aac6496647e2"],["./static/js/main.0d867043.chunk.js.LICENSE.txt","270263c9417f9ab3e9bbb984ef105f62"],["./static/js/main.0d867043.chunk.js.br","4a21984dc108f741269f9c90e9a8cee5"],["./static/js/main.0d867043.chunk.js.gz","e8682b3acbe5125f8a545d2113b70e0f"],["./static/js/moment~main.50836daa.chunk.js","189b6ebc7302bfe15b36bfd6f1716bf3"],["./static/js/moment~main.50836daa.chunk.js.LICENSE.txt","cf51d4e75eed513421c2579151e1ad6a"],["./static/js/moment~main.50836daa.chunk.js.br","e8e5dfc9b8734e81006c84245871b9d2"],["./static/js/moment~main.50836daa.chunk.js.gz","9dbe7888b3097f561ab71ca0ce7378c3"],["./static/js/react~main.990138a6.chunk.js","c5e38aacf2a3ec87ce371c37e5d1ddf2"],["./static/js/react~main.990138a6.chunk.js.LICENSE.txt","1c45e20b056c399582d5f6e78bdff624"],["./static/js/react~main.990138a6.chunk.js.br","a62a01240e709b080f6f9f4ece0f8173"],["./static/js/react~main.990138a6.chunk.js.gz","05e411a272d66d1191bb5cd56b464a08"],["./static/js/runtime-main.20d4d98b.js","c140ad796f9691ddc97952f79c3f6cd0"],["./static/js/runtime-main.20d4d98b.js.br","206a0b87ac5093eea46c7fd3afddd63d"],["./static/js/runtime-main.20d4d98b.js.gz","85ec575641cbe54d77b42e2b5fe362b2"],["./static/js/src~main.5906def1.chunk.js.br","f4f9de3d9b23258a46fd506cf2537c42"],["./static/js/src~main.5906def1.chunk.js.gz","c080cc88e85456ee91f4c94013846eec"],["./static/media/KaTeX_AMS-Regular.b1489df1.woff","7f06b4e30317f784d61d26686aed0ab2"],["./static/media/KaTeX_AMS-Regular.d4531cf7.woff2","e78e28b4834954df047e4925e9dbf354"],["./static/media/KaTeX_AMS-Regular.f80d9eaf.ttf","aaf4eee9fba9907d61c3935e0b6a54ae"],["./static/media/KaTeX_Caligraphic-Bold.0c96bc8f.ttf","021dd4dc61ee5f5cdf315f43b48c094b"],["./static/media/KaTeX_Caligraphic-Bold.7ce7636b.woff","1e802ca9dedc4ed4e3c6f645e4316128"],["./static/media/KaTeX_Caligraphic-Bold.f046a374.woff2","4ec58befa687e9752c3c91cd9bcf1bcb"],["./static/media/KaTeX_Caligraphic-Regular.35f3c951.ttf","d49f2d55ce4f40f982d8ba63d746fbf9"],["./static/media/KaTeX_Caligraphic-Regular.4519ba4c.woff2","7edb53b6693d75b8a2232481eea1a52c"],["./static/media/KaTeX_Caligraphic-Regular.4a559f36.woff","d3b46c3a530116933081d9d74e3e9fe8"],["./static/media/KaTeX_Fraktur-Bold.069514d4.ttf","a31e7cba7b7221ebf1a2ae545fb306b2"],["./static/media/KaTeX_Fraktur-Bold.2ea3916b.woff","c4c8cab7d5be97b2bb283e531c077355"],["./static/media/KaTeX_Fraktur-Bold.5b8749ee.woff2","d5b59ec9764e10f4a82369ae29f3ac58"],["./static/media/KaTeX_Fraktur-Regular.0d90113d.woff","b7d9c46bff5d51da6209e355cc4a235d"],["./static/media/KaTeX_Fraktur-Regular.2c629b06.woff2","32a5339eb809f381a7357ba56f82aab3"],["./static/media/KaTeX_Fraktur-Regular.96556db6.ttf","a48dad4f58c82e38a10da0ceebb86370"],["./static/media/KaTeX_Main-Bold.07e762d0.ttf","9ceff51b3cb7ce6eb4e8efa8163a1472"],["./static/media/KaTeX_Main-Bold.20b90c20.woff2","8e1e01c4b1207c0a383d9a2b4f86e637"],["./static/media/KaTeX_Main-Bold.a9cdbc85.woff","22086eb5d97009c3e99bcc1d16ce6865"],["./static/media/KaTeX_Main-BoldItalic.7649d52f.woff","4c57dbc44bfff1fdf08a59cf556fdab3"],["./static/media/KaTeX_Main-BoldItalic.b345de5b.woff2","284a17fe5baf72ff8217d4c7e70c0f82"],["./static/media/KaTeX_Main-BoldItalic.bc8d96e9.ttf","e8b44b990516dab7937bf240fde8b46a"],["./static/media/KaTeX_Main-Italic.44a32ae6.ttf","29c86397e75cdcb3135af8295f1c2e28"],["./static/media/KaTeX_Main-Italic.ab751a9e.woff2","e533d5a2506cf053cd671b335ec04dde"],["./static/media/KaTeX_Main-Italic.e3954fe9.woff","99be0e10c38cd42466e6fe1665ef9536"],["./static/media/KaTeX_Main-Regular.13b3f852.woff2","5c734d78610fa35282f3379f866707f2"],["./static/media/KaTeX_Main-Regular.9e75cd60.woff","b741441f6d71014d0453ca3ebc884dd4"],["./static/media/KaTeX_Main-Regular.af7fc7b3.ttf","5c94aef490324b0925dbe5f643e8fd04"],["./static/media/KaTeX_Math-BoldItalic.4d6241be.ttf","9a2834a9ff8ab411153571e0e55ac693"],["./static/media/KaTeX_Math-BoldItalic.94810ff6.woff","b13731ef4e2bfc3d8d859271e39550fc"],["./static/media/KaTeX_Math-BoldItalic.d5d35e84.woff2","d747bd1e7a6a43864285edd73dcde253"],["./static/media/KaTeX_Math-Italic.11278d36.woff","f0303906c2a67ac63bf1e8ccd638a89e"],["./static/media/KaTeX_Math-Italic.cae7ea26.ttf","291e76b8871b84560701bd29f9d1dcc7"],["./static/media/KaTeX_Math-Italic.ffda8803.woff2","4ad08b826b8065e1eab85324d726538c"],["./static/media/KaTeX_SansSerif-Bold.2946bdb5.woff","3fb419559955e3ce75619f1a5e8c6c84"],["./static/media/KaTeX_SansSerif-Bold.5a20a475.woff2","6e0830bee40435e72165345e0682fbfc"],["./static/media/KaTeX_SansSerif-Bold.f0ad0abc.ttf","7dc027cba9f7b11ec92af4a311372a85"],["./static/media/KaTeX_SansSerif-Italic.c7feacd5.ttf","4059868e460d2d2e6be18e180d20c43d"],["./static/media/KaTeX_SansSerif-Italic.c834ba6d.woff","727a9b0d97d72d2fc0228fe4e07fb4d8"],["./static/media/KaTeX_SansSerif-Italic.e5fc2aef.woff2","fba01c9c6fb2866a0f95bcacb2c187a5"],["./static/media/KaTeX_SansSerif-Regular.5af9e1cf.ttf","5c58d168c0b66d2c32234a6718e74dfb"],["./static/media/KaTeX_SansSerif-Regular.5bf28900.woff2","d929cd671b19f0cfea55b6200fb47461"],["./static/media/KaTeX_SansSerif-Regular.a4fd0563.woff","2555754a67062cac3a0913b715ab982f"],["./static/media/KaTeX_Script-Regular.a1c15978.woff2","755e2491f13b5269f0afd5a56f7aa692"],["./static/media/KaTeX_Script-Regular.cd3b0634.woff","d524c9a5b62a17f98f4a97af37fea735"],["./static/media/KaTeX_Script-Regular.dd0db7ae.ttf","d12ea9efb375f9dc331f562e69892638"],["./static/media/KaTeX_Size1-Regular.1876361f.woff2","048c39cba4dfb0460682a45e84548e4b"],["./static/media/KaTeX_Size1-Regular.bbd9552c.ttf","7342d45b052c3a2abc21049959fbab7f"],["./static/media/KaTeX_Size1-Regular.c4ae0d25.woff","08b5f00e7140f7a10e62c8e2484dfa5a"],["./static/media/KaTeX_Size2-Regular.635e9324.woff","af24b0e4b7e52656ca77914695c99930"],["./static/media/KaTeX_Size2-Regular.d1e8ff17.ttf","eb130dcc661de766c999c60ba1525a88"],["./static/media/KaTeX_Size2-Regular.f516b73c.woff2","81d6b8d5ca77d63d5033d6991549a659"],["./static/media/KaTeX_Size3-Regular.1ef7adae.woff2","b311ca09df2c89a10fbb914b5a053805"],["./static/media/KaTeX_Size3-Regular.5d632274.ttf","7e02a40c41e52dc3b2b6b197bbdf05ea"],["./static/media/KaTeX_Size3-Regular.f32a9fde.woff","0d8926405d832a4b065e516bd385d812"],["./static/media/KaTeX_Size4-Regular.1d132596.ttf","ad7672524b64b730dfd176140a8945cb"],["./static/media/KaTeX_Size4-Regular.4f012d6a.woff2","6a3255dfc1ba41c46e7e807f8ab16c49"],["./static/media/KaTeX_Size4-Regular.f668d566.woff","68895bb880a61a7fc019dbfaa5121bb4"],["./static/media/KaTeX_Typewriter-Regular.4f31d033.woff2","6cc31ea5c223c88705a13727a71417fa"],["./static/media/KaTeX_Typewriter-Regular.b1d1af1a.ttf","257023560753aeb0b89b7e434d3da17f"],["./static/media/KaTeX_Typewriter-Regular.d3c8e68f.woff","3fe216d2a5f736c560cde71984554b64"],["./static/media/WeCom.7ed2e9e9.svg","c69e72261af27c2aaae6afeef3dcb6bf"],["./static/media/banner-square.a7da4194.svg","f32dfa50a308147f4fd05ae4b4b3b30a"],["./static/media/default-avatar.c3d66646.svg","d56f6c99afa985d92f3d60c6267125a4"],["./static/media/ding-talk-icon.75402cc1.svg","721b74d676ff124afda1bbbed1e57c0b"],["./static/media/lark-icon.82de0918.svg","fd02f37275587e0a373d79f2f99813d9"],["./static/media/logo-white.a9a92d6e.svg","86e51fec25cbf12090125ca9168033d7"],["./static/media/refresh-icon.f7d1e7b0.svg","861203d967559d6e59468ee624a20a7b"],["./static/media/space-icon.e516efef.svg","85fb7db52081464dc1565ecda5bcdaab"]];
var cacheName = 'sw-precache-v3-my-project-name-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, /\.\w{8}\./);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'PUBLIC_PATH999999999/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







