const http = require('http');
const http2 = require('http2');


function request({
    method = 'GET',
    url = '',
    body = null,
    headers = {},
    proxy
}) {
    return new Promise((resolve, reject) => {
        var parseUrl = new URL(url),
            TARGET_HOST = `${parseUrl.host}:${url.startsWith('https') ? 443 : 80}`,
            pathAndQuery = parseUrl.pathname + parseUrl.search,
            response = { headers: {}, body: '', statusCode: 1001 }
        method = String(method).toUpperCase()

        const request = http.request({
            method: 'CONNECT',
            host: proxy.host,
            port: proxy.port,
            path: TARGET_HOST,
            headers: {
                'Host': TARGET_HOST,
                ...((proxy && proxy.username && proxy.password) ? ({ 'Proxy-Authorization': `Basic ${Buffer.from(`${proxy.username}:${proxy.password}`).toString('base64')}` }) : {})
            }
        })

        request.on('connect', (res, socket) => {

            if (res.statusCode !== 200) throw new Error('Connection rejected by the proxy')

            const client = http2.connect(parseUrl.origin, { socket })

            const req = client.request({
                ':path': pathAndQuery,
                ':method': method,
                ":authority": parseUrl.host,
                ":scheme": String(parseUrl.protocol).replace(':', ''),
                ...headers,
            })
            req.on('response', (headers) => {
                response.headers = headers
                response.statusCode = headers[':status'];
            })

            const buffers = []
            req.on('data', (buffer) => {
                buffers.push(buffer)
            })

            req.on('end', () => {
                response.body = Buffer.concat(buffers).toString('utf-8')
                try { response.body = JSON.parse(response.body) } catch (e) { }
                resolve(response)
                client.close()
            })
            if (body && typeof body == 'object') try { body = JSON.stringify(body) } catch (e) { console.log(e); }
            if (body) req.write(body)
            req.end()
        })
        request.end()

    })
}

module.exports = {
    request
}