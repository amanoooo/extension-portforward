import Socket from './socket'
import { localEmitter } from './util'

chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'developer.chrome.com' }
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }
  ])
})

localEmitter.onOpen = Socket.open
localEmitter.onClose = Socket.close

fetch('https://www.baidu.com')
  .then(res => res.text())
  .then(res => console.log('baidu res', res.slice(0, 100)))
