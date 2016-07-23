function getMajorVerison(){
	var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
	return raw ? parseInt(raw[2], 10) : false;
}

function displayContent(){
	var divContent = document.getElementById('content');
	var divNew = document.getElementById('new');
	var divLegacyRoutes = document.getElementById('legacyRoutes');
	var divLegacyProxy = document.getElementById('legacyProxy');
	var divFail = document.getElementById('fail');
	var divIncognito = document.getElementById('incognito');
	var divApply = document.getElementById('applyButton');
	
	if(getMajorVerison() > 47){
		divLegacyProxy.style.display = 'none';
		divLegacyRoutes.style.display = 'none';
		divFail.style.display = 'none';
		chrome.extension.isAllowedIncognitoAccess();
	}
	else if(getMajorVerison() > 41 && getMajorVerison() < 47){
		divNew.style.display = 'none';
		divFail.style.display = 'none';
		divLegacyProxy.style.display = 'none';
		chrome.extension.isAllowedIncognitoAccess();
	}
	else if(getMajorVerison() == 47){
		divNew.style.display = 'none';
		divFail.style.display = 'none';
		chrome.extension.isAllowedIncognitoAccess();
	}
	else{
		divContent.style.display = 'none';
		divIncognito.style.display = 'none';
		divApply.style.display = 'none';
	}
}

chrome.extension.isAllowedIncognitoAccess(function(isAllowedAccess){
	var incognitoAllowed = document.getElementById('incognitoAllowed');
	var incognitoDisallowed = document.getElementById('incognitoDisallowed');
	
	if(isAllowedAccess == true){
		incognitoDisallowed.style.display = 'none';
	}
	else{
		incognitoAllowed.style.display = 'none';
	}
});

function saveOptions(){
	if(getMajorVerison() > 47){
		var policy = document.getElementById('policy').value;
		chrome.storage.local.set({
			rtcIPHandling: policy
		}, function(){
			var status = document.getElementById('status');
			status.textContent = 'Options saved.';
			chrome.storage.local.get('toggleStatus', function(items) {
				if (items.toggleStatus){
					chrome.storage.local.get('rtcIPHandling', function(items){
						chrome.privacy.network.webRTCIPHandlingPolicy.set({
							value: items.rtcIPHandling
						});
					});
				}
			});
			setTimeout(function(){
				status.textContent = '';
			}, 750);
		});
	}
	else if(getMajorVerison() == 47){
		var nonProxiedUDP = document.getElementById('proxy').checked;
		var rtcMultipleRoutes = document.getElementById('multipleroutes').checked;
		chrome.storage.local.set({
			nonProxiedUDP: nonProxiedUDP,
			rtcMultipleRoutes: rtcMultipleRoutes
		}, function(){
			var status = document.getElementById('status');
			status.textContent = 'Options saved.';
			chrome.storage.local.get('toggleStatus', function(items) {
				if (items.toggleStatus){
					chrome.storage.local.get('rtcMultipleRoutes', function(items){
						chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
							value: !items.rtcMultipleRoutes,
							scope: 'regular'
						});
					});
					chrome.storage.local.get('nonProxiedUDP', function(items){
						chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
							value: !items.nonProxiedUDP,
							scope: 'regular'
						});
					});
				}
			});
			setTimeout(function(){
				status.textContent = '';
			}, 750);
		});
	}
	else if(getMajorVerison() > 41 && getMajorVerison() < 47){
		var rtcMultipleRoutes = document.getElementById('multipleroutes').checked;
		chrome.storage.local.set({
			rtcMultipleRoutes: rtcMultipleRoutes
		}, function(){
			var status = document.getElementById('status');
			status.textContent = 'Options saved.';
			chrome.storage.local.get('toggleStatus', function(items) {
				if (items.toggleStatus){
					chrome.storage.local.get('rtcMultipleRoutes', function(items){
						chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
							value: !items.rtcMultipleRoutes,
							scope: 'regular'
						});
					});
				}
			});
			setTimeout(function(){
				status.textContent = '';
			}, 750);
		});
	}
}

function restoreOptions(){
	if(getMajorVerison() > 47){
		chrome.storage.local.get({
			rtcIPHandling: 'default_public_interface_only'
		}, function(items){
			document.getElementById('policy').value = items.rtcIPHandling;
		});
	}
	else if(getMajorVerison() == 47){
		chrome.storage.local.get({
			nonProxiedUDP: false,
			rtcMultipleRoutes: true
		}, function(items){
			document.getElementById('proxy').checked = items.nonProxiedUDP;
			document.getElementById('multipleroutes').checked = items.rtcMultipleRoutes;
		});
	}
	else if(getMajorVerison() > 41 && getMajorVerison() < 47){
		chrome.storage.local.get({
			rtcMultipleRoutes: true
		}, function(items){
			document.getElementById('multipleroutes').checked = items.rtcMultipleRoutes;
		});
	}
}

document.addEventListener('DOMContentLoaded', displayContent);
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
