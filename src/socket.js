import { getStorage, setStorage } from './util'
import {
    CMD_GENERATE,
    CMD_CLOSE,
    CMD_GET_CON,
    CMD_ERR_PORT,
    CMD_SERVER_PORT,
} from './constants'

const uuidv4 = require('uuid/v4')
const io = require('socket.io-client')
const httpHeaders = require('http-headers')

const SERVER_IP = 'localhost'
// const SERVER_IP = '39.104.226.149'
const ENDPOINT = `http://${SERVER_IP}:3000` // 39.104.226.149


const PORT_PUBLIC_KEY = 'port.public'
function open () {
    console.log("socket open")
    const localPort = 3001
    const _port = parseInt(localPort)
    console.log('forward local port ', _port)
    console.log('ENDPOINT ', ENDPOINT)
    const socket = io(ENDPOINT)


    socket.on('cmd', function (data) {
        console.log('cmd:', data)
        switch (data.type) {
            case CMD_ERR_PORT:
                alert('random server port in use , retry')
                break
            case CMD_SERVER_PORT:
                const serverPort = data.value
                setStorage({ [PORT_PUBLIC_KEY]: serverPort })
                console.log('server port', serverPort)
                break
            default:
                break
        }
    })
    socket.on('common', function (data) {
        console.log('common:', data.slice(1, 500))
    })
    socket.on('buffer', async function (data) {
        // console.log('local daemon onbuffer -----------\n', data)
        const headerObj = httpHeaders(data)
        console.log('origing headerObj ', headerObj)
        var bodyData = null

        var xhr = new XMLHttpRequest()
        const { method, url, headers } = headerObj
        xhr.open(method, `http://localhost:${localPort}` + url)
        // xhr.open(method, url)
        for (const header of Object.keys(headers)) {
            xhr.setRequestHeader(header, headers[header])
            // console.log(header, headers[header])
        };
        xhr.setRequestHeader('host', `localhost:${localPort}`)

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                const headers = xhr.getAllResponseHeaders()
                const { response, status, statusText } = xhr
                console.log('local headers \r\n', headers)
                console.log('local response \r\n', response)
                console.log('local status ', xhr.status)
                console.log('local statusText ', xhr.statusText)
                console.log('local responseURL ', xhr.responseURL)

                // socket.emit('buffer', 'HTTP/1.1 200 OK\r\n' + headers + '\r\n' + response)
                socket.emit(
                    'buffer',

                    'HTTP/1.1 ' +
                    status +
                    ' ' +
                    statusText +
                    ' \r\n' +
                    headers +
                    '\r\n' +
                    response +
                    '\r\n'
                )
            }
        })
        xhr.send()
    })

    const uuid = getStorage('uuid') || uuidv4()
    console.log('uuid ', uuid)

    socket.emit('cmd', { type: CMD_GENERATE, value: uuid })
    socket.on('disconnect', function () {
        console.log('disconnect ')
        setStorage('uuid', null)
    });
    console.log('finish open')
}



function close () {
    console.log('socket close')
}


const socket = {
    close,
    open
}

export default socket