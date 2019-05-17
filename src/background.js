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

import socket from './socket'
import { socketEmitter } from './util'

socketEmitter.onOpen = socket.open
socketEmitter.onClose = socket.close