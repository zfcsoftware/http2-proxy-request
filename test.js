const { request } = require('./index')



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