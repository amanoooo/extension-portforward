import styled from 'styled-components'

const React = require('react')
const ReactDOM = require('react-dom')

const io = require('socket.io-client')
const httpHeaders = require('http-headers')
const uuidv4 = require('uuid/v4');


const Flex = styled.div`
    display: flex;
`
const Column = styled(Flex)`
    flex-direction: column;
`
import { getStorage, setStorage, unsetStorage, socketEmitter } from './util'


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
    updateStatus = () => {
        getStorage(['uuid', 'port.public'], (result) => {
            const { uuid, 'port.public': serverPort } = result
            if (uuid) {
                this.setState({
                    status: 'connected',
                    serverPort
                })
            } else {
                this.setState({
                    status: 'disconnected',
                    serverPort: ''
                })
            }
        })
    }
    componentDidMount () {
        this.updateStatus()
        socketEmitter.onOpen = () => {
            console.log('main open')
            this.updateStatus()
        }
        socketEmitter.onClose = () => {
            console.log('main close')
            this.updateStatus()
        }
    }

    _open = () => {
        const uuid = uuidv4()
        setStorage({ uuid })
    }
    _close = () => {
        unsetStorage('uuid')
    }
    _get = () => {
        const uuid = getStorage(['uuid', 'port.public'], console.log)
        console.log('_get', uuid)
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
                    <div onClick={this._get}>get</div>
                </Flex>
            </div>
        )
    }
}

const domContainer = document.querySelector('#root')
ReactDOM.render(<Root />, domContainer)
