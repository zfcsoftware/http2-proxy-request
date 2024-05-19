# HTTP2 Proxy Request

This library allows you to send requests using a proxy with the http2 protocol. If you don't need to use it with a proxy, check the node:http2 library.

![image](https://github.com/zfcsoftware/puppeteer-real-browser/assets/123484092/101a550a-caa7-4353-b69b-19c8f3b47525)

## Sample GET Request

```js
const { request } = require('http2-proxy-request')

request({
    url: 'https://example.com/',
    proxy: {
        host: '<proxy-host>',
        port: '<proxy-port>',
        username: '<proxy-username>',
        password: '<proxy-password>'
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    },
    method: 'GET'
}).then(console.log).catch(console.error)

```

## Sample POST Request

If body is of type json, you should add “Content-Type”: “application/json”.

```js
const { request } = require('http2-proxy-request')

request({
    url: 'https://example.com/',
    proxy: {
        host: '<proxy-host>',
        port: '<proxy-port>',
        username: '<proxy-username>',
        password: '<proxy-password>'
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        "Content-Type": "application/json"
    },
    method: 'POST',
    body: { a: 1 }
}).then(console.log).catch(console.error)

```

## Sample Response

3 Variables are returned. headers, body and statusCode. 

```js

{
  headers: {
    ':status': 200,
    date: 'Sun, 19 May 2024 19:40:01 GMT',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '631',
    etag: 'W/"277-iwLpZpUMj/RkeVdx4zq8Q3MAdP4"',
    'x-cache': 'MISS',
    'cf-cache-status': 'DYNAMIC',
    'report-to': '{"endpoints":[{"url":"https:\\/\\/a.nel.cloudflare.com\\/report\\/v4?s=3xI91mPw6QjqJ86H2qDcSNUpRsbSv6aAcLf1WiTHEj3tH6x%2FNalvBpy6ohSNuUlM6Z4BXptATDl%2Bmm9qJPzRvo9C51dNdWyzTo6xN1PM8TyGCfV5bd54o2YBC15xLNZdqQ%3D%3D"}],"group":"cf-nel","max_age":604800}',
    nel: '{"success_fraction":0,"report_to":"cf-nel","max_age":604800}',
    server: 'cloudflare',
    'cf-ray': '88668e69ce712850-OTP',
    'alt-svc': 'h3=":443"; ma=86400'
  },
  body: {
    headers: {
      host: 'example.com',
      connection: 'upgrade',
      'cdn-loop': 'cloudflare',
      'cf-ipcountry': 'GB',
      'accept-encoding': 'gzip, br',
      'cf-ray': '88668e69ce712850-OTP',
      'x-forwarded-proto': 'https',
      'cf-visitor': '{"scheme":"https"}',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'content-type': 'application/json',
    },
    body: {},
    method: 'GET',
    url: '/',
    query: {},
    params: {},
    path: '/',
    httpVersion: '1.1'
  },
  statusCode: 200
}

```


## Why Did I Create This Library?

Due to the waf rules added to some sites protected with Cloudflare, we are recognized as bots when we send htttp/1.1 requests. Currently, most libraries don't support sending http2 requests using a proxy. If they did, it was very complicated. I wanted to simplify this.

## Thank You
After searching for a long time I saw this answer and made this code into a library, thanks.

[stackoverflow](https://stackoverflow.com/a/71503063/24054325)# http2-proxy-request
