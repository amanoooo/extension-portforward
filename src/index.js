import styled from 'styled-components'

const React = require('react')
const ReactDOM = require('react-dom')

const io = require('socket.io-client')
const httpHeaders = require('http-headers')
const uuidv4 = require('uuid/v4');

import {
    CMD_GENERATE,
    CMD_CLOSE,
    CMD_GET_CON,
    CMD_ERR_PORT,
    CMD_SERVER_PORT,
} from './constants'

import { addQuote, chromeLog } from './util'

const Flex = styled.div`
    display: flex;
`
const Column = styled(Flex)`
    flex-direction: column;
`
setInterval(() => {
    console.log('cron job')
}, 1000);

// const ENDPOINT = 'http://localhost:3000' // 39.104.226.149
const SERVER_IP = 'localhost'
// const SERVER_IP = '39.104.226.149'
const ENDPOINT = `http://${SERVER_IP}:3000` // 39.104.226.149

class Root extends React.Component {
    socket = null
    state = {
        localPort: 3001,
        status: 'disconnected', // disconnected | connected
        serverPort: ''
    }
    _updateValue = (type, e) => {
        this.setState({
            localPort: e.target.value
        })
    }
    _open = () => {
        const { localPort } = this.state
        const _this = this
        const _port = parseInt(localPort)
        chromeLog('forward local port ', _port)
        chromeLog('ENDPOINT ', ENDPOINT)
        const socket = io(ENDPOINT)
        this.setState({
            status: 'connected'
        })

        this.socket = socket

        socket.on('cmd', function (data) {
            chromeLog('cmd:', data)
            switch (data.type) {
                case CMD_ERR_PORT:
                    alert('random server port in use , retry')
                    break
                case CMD_SERVER_PORT:
                    const serverPort = data.value
                    chromeLog('server port', serverPort)
                    _this.setState({ serverPort })
                    break
                default:
                    break
            }
        })
        socket.on('common', function (data) {
            chromeLog('common:', data.slice(1, 500))
        })
        socket.on('buffer', async function (data) {
            // chromeLog('local daemon onbuffer -----------\n', data)
            const headerObj = httpHeaders(data)
            // chromeLog('origing headerObj ', headerObj)
            var bodyData = null

            var xhr = new XMLHttpRequest()
            const { method, url, headers } = headerObj
            xhr.open(method, `http://localhost:${localPort}` + url)
            // xhr.open(method, url)
            for (const header of Object.keys(headers)) {
                xhr.setRequestHeader(header, headers[header])
                // chromeLog(header, headers[header])
            };
            xhr.setRequestHeader('host', `localhost:${localPort}`)

            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    const headers = xhr.getAllResponseHeaders()
                    const { response, status, statusText } = xhr
                    // chromeLog('local headers \r\n', headers)
                    // chromeLog('local response \r\n', response)
                    chromeLog('local status ', xhr.status)
                    chromeLog('local statusText ', xhr.statusText)
                    chromeLog('local responseURL ', xhr.responseURL)

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
        socket.emit('cmd', { type: CMD_GENERATE, value: uuidv4() })
        socket.on('disconnect', function () {
            chromeLog('disconnect ')
            _this.setState({
                status: 'disconnected',
                serverPort: ''
            })
            this.socket = null
        });
        chromeLog('finish open')
    }
    _close = () => {
        chromeLog('_close1', this.socket)
        this.socket && this.socket.close()
    }
    render () {
        const { localPort, status, serverPort } = this.state
        return (
            <div>
                <Flex>
                    <label htmlFor="changeColor">change color</label><button id="changeColor"></button>
                </Flex>
                <Column>
                    <div>{`socket status: ${status}`}</div>
                    {/* {serverPort && <div>{`your server port: ${serverPort}`}</div>} */}
                    {serverPort && <div >{`your endpoint: http://${SERVER_IP}:${serverPort}`}</div>}
                </Column>
                <Flex>
                    <label htmlFor="input">local port: </label>
                    <input
                        value={localPort}
                        id="localPort"
                        onChange={e => { this._updateValue('localPort', e) }}
                        type="text"
                    />
                </Flex>
                <Flex>
                    <div onClick={this._open}>open</div>
                    <div onClick={this._close}>close</div>
                </Flex>
            </div>
        )
    }
}

const domContainer = document.querySelector('#root')
ReactDOM.render(<Root />, domContainer)
