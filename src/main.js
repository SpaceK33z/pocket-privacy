const POCKET_SAVE_URL = 'https://getpocket.com/save?url=';

function showNotification() {
	chrome.notifications.create('added-to-pocket', {
		type: 'basic',
		iconUrl: 'img/128.png',
		title: 'Saved to Pocket',
		message: 'You have successfully saved this item to Pocket.',
	}, () => {
		setTimeout(() => {
			chrome.notifications.clear('added-to-pocket');
		}, 1500);
	});
}

function saveUrl(rawUrl) {
	const url = encodeURIComponent(rawUrl);
	const fullUrl = `${POCKET_SAVE_URL}${url}`;

	fetch(fullUrl, {
		credentials: 'include',
	})
	.then(res => res.text())
	.then((text) => {
		if (text.includes('<title>Pocket: Add Item</title>')) {
			showNotification();
		} else {
			// If saving the URL was unsuccessful, the user probably needs to login.
			chrome.tabs.create({ url: fullUrl });
		}
	});
}

chrome.browserAction.onClicked.addListener(function (tab) {
	saveUrl(tab.url);
});
