class Root extends React.Component {
    state = {
        localPort: 3001
    }
    _updateValue = (e) => {
        this.setState({
            localPort: e.target.value
        })
    }
    _open = () => {

    }
    _close = () => {

    }
    render () {
        return (
            <div>
                <button id="changeColor"></button>
                localPort: <input onChange={e => { this._updateValue('localPort', e) }} type="text" />
                <button onClick={this._open}>open</button>
                <button onClick={this._close}>close</button>
            </div>
        )
    }
}

const domContainer = document.querySelector('#root')
ReactDOM.render(<Root />, domContainer)
