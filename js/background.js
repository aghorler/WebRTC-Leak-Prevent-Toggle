/* Check for undefined values and set defaults. */ 
chrome.storage.local.get(null, function(items) {
	//webRTCIPHandlingPolicy 
	if (items.rtcIPHandling == undefined) {
		chrome.storage.local.set({
			rtcIPHandling: 'default_public_interface_only'
		}, function() {
			chrome.privacy.network.webRTCIPHandlingPolicy.set({
				value: 'default_public_interface_only'
			});
		})
	}
	//webRTCMultipleRoutesEnabled 
	if (items.rtcMultipleRoutes == undefined) {
		chrome.storage.local.set({
			rtcMultipleRoutes: true
		}, function() {
			chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
				value: false,
				scope: 'regular'
			});
		})
	}
	//Toggle status
	if (items.toggleStatus == undefined) {
		chrome.storage.local.set({
			toggleStatus: true
		});
		chrome.browserAction.setIcon({
			path: '/img/icon32_on.png'
		});
	}
});

chrome.browserAction.onClicked.addListener(function(activeTab) {
	try {
		chrome.storage.local.get('toggleStatus', function(setWebRTC) {
			if (setWebRTC.toggleStatus) {
				chrome.storage.local.get('rtcIPHandling', function(items) {
					chrome.privacy.network.webRTCIPHandlingPolicy.set({
						value: 'default'
					});
				});
				chrome.storage.local.get('rtcMultipleRoutes', function(items) {
					chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
						value: true,
						scope: 'regular'
					});
				});
				chrome.storage.local.get('nonProxiedUDP', function(items) {
					chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
						value: true,
						scope: 'regular'
					});
				});
				chrome.browserAction.setIcon({
					path: '/img/icon32_off.png'
				});
				chrome.storage.local.set({
					toggleStatus: false
				});
			} else {
				chrome.storage.local.get('rtcIPHandling', function(items) {
					chrome.privacy.network.webRTCIPHandlingPolicy.set({
						value: items.rtcIPHandling
					});
				});
				chrome.storage.local.get('rtcMultipleRoutes', function(items) {
					chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
						value: !items.rtcMultipleRoutes,
						scope: 'regular'
					});
				});
				chrome.storage.local.get('nonProxiedUDP', function(items) {
					chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
						value: !items.nonProxiedUDP,
						scope: 'regular'
					});
				});
				chrome.browserAction.setIcon({
					path: '/img/icon32_on.png'
				});
				chrome.storage.local.set({
					toggleStatus: true
				});
			}
		});
	} catch (e) {
		alert("A toggle error occured. " + e);
	}
});
