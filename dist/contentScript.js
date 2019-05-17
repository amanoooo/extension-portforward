

var uuid = 'test-uuid-sdaddaadasdad'

chrome.storage.local.set({ uuid }, function () {
    console.log('Value is set to ' + value);
});

chrome.storage.local.get(['uuid'], function (result) {
    console.log('Value currently is ' + result.uuid);
});