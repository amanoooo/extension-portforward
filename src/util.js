export function addQuote (item) {
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
export const chromeLog = (...args) => {
    if (chrome.tabs) {
        console.log('chrome ', chrome)
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, {
                code: 'console.log(' + args.map(addQuote).join(',') + ')'
            })
        })
    } else {
        console.log(...args)
        // console.log('eval ', 'console.log(' + args.map(addQuote).join(',') + ')')
        // eval('console.log(' + args.map(addQuote).join(',') + ')')
    }
}

