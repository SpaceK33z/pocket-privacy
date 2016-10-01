const POCKET_SAVE_URL = 'https://getpocket.com/save?url=';

function saveUrl(rawUrl) {
	const url = encodeURI(rawUrl);
	chrome.tabs.create({
		url: `${POCKET_SAVE_URL}${url}`,
	});
}

chrome.browserAction.onClicked.addListener(function (tab) {
	saveUrl(tab.url);
});
