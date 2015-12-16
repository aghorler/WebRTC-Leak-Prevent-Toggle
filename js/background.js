/* On install, or update. Defaults to on. */
chrome.runtime.onInstalled.addListener(function() {
	chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
		'value': false,
		scope: 'regular'
	});
	chrome.browserAction.setIcon({
		path: '/img/icon128_on.png'
	});
	chrome.privacy.network.webRTCIPHandlingPolicy.set({
		value: 'default_public_interface_only'
	});
});

chrome.browserAction.onClicked.addListener(function(activeTab) {
	try { //Uses webRTCMultipleRoutesEnabled to toggle.
		chrome.privacy.network.webRTCMultipleRoutesEnabled.get({}, function(setWebRTC) {
			if (setWebRTC.value) { //On.
				//webRTCMultipleRoutesEnabled set to false.
				chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
					'value': false,
					scope: 'regular'
				});
				//webRTCNonProxiedUdpEnabled set to user preference, same with webRTCIPHandlingPolicy.
				chrome.storage.local.get(null, function(items) {
					chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
						value: !items.nonProxiedUDP,
						scope: 'regular'
					});
					chrome.privacy.network.webRTCIPHandlingPolicy.set({
					value: items.rtcIPHandling
					});
				});
				chrome.browserAction.setIcon({
					path: '/img/icon128_on.png'
				});
			} else { //Off.
				//webRTCMultipleRoutesEnabled set to true.
				chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
					'value': true,
					scope: 'regular'
				}); 
				
				//webRTCNonProxiedUdpEnabled set to user preference. WebRTCIPHandlingPolicy set to 'default'.
				chrome.storage.local.get(null, function(items) {
					chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
						value: items.nonProxiedUDP,
						scope: 'regular'
					});
					chrome.privacy.network.webRTCIPHandlingPolicy.set({
					value: 'default'
					});
				});
				chrome.browserAction.setIcon({
					path: '/img/icon128_off.png'
				});
			}
		});
	} catch (e) {
		alert("An error occured. Is this a compatible browser? " + e);
	}
});
