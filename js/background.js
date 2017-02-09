function getMajorVerison(){
	var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
	return raw ? parseInt(raw[2], 10) : false;
}

chrome.storage.local.get(null, function(items){
	if(items.toggleStatus == undefined){
		chrome.storage.local.set({
			toggleStatus: true
		});
		chrome.browserAction.setIcon({
			path: '/img/icon32_on.png'
		});
	}
	if(getMajorVerison() > 47){
		if(items.rtcIPHandling == undefined){
			try{
				chrome.storage.local.set({
					rtcIPHandling: 'default_public_interface_only'
				}, function(){
					chrome.privacy.network.webRTCIPHandlingPolicy.set({
						value: 'default_public_interface_only'
					});
				})
			}
			catch(e){
				console.log("Error: " + e.message);
			}
		}
	}
	else if(getMajorVerison() > 41 && getMajorVerison() < 48){
		if(items.rtcMultipleRoutes == undefined){
			try{
				chrome.storage.local.set({
					rtcMultipleRoutes: true
				}, function(){
					chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
						value: false,
						scope: 'regular'
					});
				})
			}
			catch(e){
				console.log("Error: " + e.message);
			}
		}
	}
});

chrome.browserAction.onClicked.addListener(function(activeTab){
	try{
		chrome.storage.local.get('toggleStatus', function(setWebRTC){
			var passCheck = false;
			if(setWebRTC.toggleStatus){
				if(getMajorVerison() > 47){
					chrome.privacy.network.webRTCIPHandlingPolicy.set({
						value: 'default'
					});
					passCheck = true;
				}
				else if(getMajorVerison() > 41 && getMajorVerison() < 47){
					chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
						value: true,
						scope: 'regular'
					});
					passCheck = true;
				}
				else if(getMajorVerison() == 47){
					chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
						value: true,
						scope: 'regular'
					});
					chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
						value: true,
						scope: 'regular'
					});
					passCheck = true;
				}
				if(passCheck){
					chrome.browserAction.setIcon({
						path: '/img/icon32_off.png'
					});
					chrome.storage.local.set({
						toggleStatus: false
					});
				}
				else{
					throw "Unsupported browser version.";
				}
			} 
			else{
				if(getMajorVerison() > 47){
					chrome.storage.local.get('rtcIPHandling', function(items){
						chrome.privacy.network.webRTCIPHandlingPolicy.set({
							value: items.rtcIPHandling
						});
					});
					passCheck = true;
				}
				else if(getMajorVerison() > 41 && getMajorVerison() < 47){
					chrome.storage.local.get('rtcMultipleRoutes', function(items){
						chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
							value: !items.rtcMultipleRoutes,
							scope: 'regular'
						});
					});
					passCheck = true;
				}
				else if(getMajorVerison() == 47){
					chrome.storage.local.get('null', function(items){
						chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
							value: !items.rtcMultipleRoutes,
							scope: 'regular'
						});
						chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
							value: !items.nonProxiedUDP,
							scope: 'regular'
						});
					});
					passCheck = true;
				}
				if(passCheck){
					chrome.browserAction.setIcon({
						path: '/img/icon32_on.png'
					});
					chrome.storage.local.set({
						toggleStatus: true
					});
				}
				else{
					throw "Unsupported browser version.";
				}

			}
		});
	} 
	catch (e){
		alert("Error: " + e);
	}
});

chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install"){
		chrome.runtime.openOptionsPage();
	}
});
