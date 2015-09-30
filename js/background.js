/* On install, or update. Defaults to on. */
chrome.runtime.onInstalled.addListener(function() {
	chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
		'value': false
	});
	chrome.browserAction.setIcon({
		path: '/img/icon128_on.png'
	});
});

chrome.browserAction.onClicked.addListener(function(activeTab) {
	try {
		chrome.privacy.network.webRTCMultipleRoutesEnabled.get({}, function(setWebRTC) {
			if (setWebRTC.value) {
				chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
					'value': false
				});
				chrome.browserAction.setIcon({
					path: '/img/icon128_on.png'
				});
			} else {
				chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
					'value': true
				});
				chrome.browserAction.setIcon({
					path: '/img/icon128_off.png'
				});
			}
		});
	} catch (e) {
		alert("Something happened. Please file an issue on GitHub. " + e);
	}
});