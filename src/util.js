export const chromeLog = (...args) => {
  function addQuote (item) {
    let _item = item
    console.log('item ', item, typeof item)
    switch (typeof item) {
      case 'object':
        _item = `'${JSON.stringify(item)}'`
        break
      case 'number':
        _item = item
        break
      default:
        _item = `"${item}"`
    }
    return _item
  }
  if (chrome.tabs) {
    console.log('chrome ', chrome)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(tabs[0].id, {
        code: 'console.log(' + args.map(addQuote).join(',') + ')'
      })
    })
    console.log(...args)
    // console.log('eval ', 'console.log(' + args.map(addQuote).join(',') + ')')
    // eval('console.log(' + args.map(addQuote).join(',') + ')')
  }
}

export function getStorage (keys, cb) {
  if (!(typeof keys === 'string' || [] instanceof Array)) {
    console.error('getStorage invalid keys', keys)
    throw new Error('getStorage invalid keys')
  }
  chrome.storage.local.get(keys, function (result) {
    console.log('getStorage ', keys, result)
    typeof cb === 'function' && cb(result)
  })
}

export function setStorage (obj, cb) {
  if (!(typeof obj === 'object')) {
    console.error('setStorage invalid obj', obj)
    throw new Error('setStorage object')
  }
  chrome.storage.local.set(obj, function (result) {
    console.log('setStorage ', obj, result)
    typeof cb === 'function' && cb(result)
  })
}
export function unsetStorage (keys) {
  if (!(typeof keys === 'string' || [] instanceof Array)) {
    console.error('unsetStorage invalid keys', keys)
    throw new Error('getStorage invalid keys')
  }
  chrome.storage.local.remove(keys, function (result) {
    console.log('unsetStorage %s', keys, result)
  })
}

export const localEmitter = {
  onOpen: () => {},
  onClose: () => {}
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key]
    const { oldValue, newValue } = storageChange
    console.log(
      'Storage key "%s" in namespace "%s" changed. ' +
        'Old value was "%s", new value is "%s".',
      key,
      namespace,
      oldValue,
      newValue
    )

    if (key === 'uuid' && oldValue && !newValue) {
      localEmitter.onClose()
    } else if (key === 'uuid' && !oldValue && newValue) {
      localEmitter.onOpen()
    }
  }
})
