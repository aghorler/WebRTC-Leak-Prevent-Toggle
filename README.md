## WebRTC Leak Prevent Toggle
Allows for the WebRTC privacy options in Chromium to be toggled between values that **prevent** and **do not prevent** [WebRTC leaks](https://diafygi.github.io/webrtc-ips/).

The only required permissions are 'privacy' and 'storage'.

#####Issues

[chrome.privacy API](https://developer.chrome.com/extensions/privacy) options apply to the whole browser, not just the tab you are currently using. Therefore toggling WebRTC leak prevention off affects the whole browser - affectively leaving you vulnerable to WebRTC leaks in any tab you have open.

#####Download

[Chrome Web Store](https://chrome.google.com/webstore/detail/webrtc-leak-prevent-toggl/kignegkkmknfpincglcjggfbgghpamim)

[Opera Addons](https://addons.opera.com/en/extensions/details/webrtc-leak-prevent-toggle/)
