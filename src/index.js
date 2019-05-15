import styled from 'styled-components'
const React = require('react')
const ReactDOM = require('react-dom')


function addQuote (item) {
    return typeof item !== 'number' ? `"${item}"` : item
}
const chromeLog = (...args) => {
    if (chrome.tabs) {
        console.log('chrome ', chrome)
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, {
                code: 'console.log(' + args.map(addQuote).join(',') + ')'
            })
        })
    } else {
        console.log(...args)
    }
}

const Flex = styled.div`
    display: flex;
`

class Root extends React.Component {
    state = {
        localPort: 3001,
        status: 'disconnected' // disconnected | connected
    }
    _updateValue = (e) => {
        this.setState({
            localPort: e.target.value
        })
    }
    _open = () => {
        // console.log('try open')
        chromeLog('open', 2)
        const { localPort } = this.state
    }
    _close = () => {
        console.log('try close')
        const { localPort } = this.state
    }
    render () {
        const { localPort, status } = this.state
        return (
            <div>
                <Flex>
                    <label htmlFor="changeColor">change color</label><button id="changeColor"></button>
                </Flex>
                <Flex> {`socket status: ${status}`} </Flex>
                <Flex>
                    <label htmlFor="input">local port: </label>
                    <input
                        value={localPort}
                        id="localPort" onChange={e => { this._updateValue('localPort', e) }} type="text" />
                </Flex>
                <Flex>
                    <div>
                        <div onClick={this._open}>open</div>
                        <div onClick={this._close}>close</div>
                    </div>
                </Flex>
            </div>
        )
    }
}

const domContainer = document.querySelector('#root')
ReactDOM.render(<Root />, domContainer)
