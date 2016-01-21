/*	Set webRTCIPHandlingPolicy to 'disable_non_proxied_udp'
	if user has previously selected the equivalent legacy 
	option.
	
	This will prevent the default webRTCIPHandlingPolicy
	option from overriding webRTCNonProxiedUdpEnabled: 
	false.
	
	This will only run on update, and will only be
	included in version 1.0.4. */
chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == "update") {
		chrome.storage.local.get('nonProxiedUDP', function(items) {
			if (items.nonProxiedUDP == true) {
				chrome.storage.local.set({
					rtcIPHandling: 'disable_non_proxied_udp'
				}, function() {
					chrome.storage.local.get('toggleStatus', function(items) {
						if (items.toggleStatus == true) {
							chrome.privacy.network.webRTCIPHandlingPolicy.set({
								value: 'disable_non_proxied_udp'
							});
						}
					});
				})
			}
		});

	}
});

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
