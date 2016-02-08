## WebRTC Leak Prevent Toggle
#####Version 1.0.4 | January 21 2016

Allows for the WebRTC privacy options in Chromium to be toggled between values that **prevent** and **do not prevent** [WebRTC leaks](https://diafygi.github.io/webrtc-ips/).

The only required permissions are 'privacy' and 'storage'.

#####Issues

The WebRTC [chrome.privacy API](https://developer.chrome.com/extensions/privacy) options apply to the whole browser, rather than just the active tab. Toggling WebRTC leak prevention off therefore effectively leaves the user vulnerable to WebRTC leaks in any open tab.

#####Download

[Chrome Web Store](https://chrome.google.com/webstore/detail/webrtc-leak-prevent-toggl/kignegkkmknfpincglcjggfbgghpamim)

[Opera Addons](https://addons.opera.com/en/extensions/details/webrtc-leak-prevent-toggle/)

You may also run the extension unpacked via Developer mode. Just download or clone the repository.

---

#####Privacy

WebRTC Leak Prevent Toggle does not collect any user data. 

The extension is hosted entirely on GitHub, the Chrome Web Store, and Opera Addons. These services may collect user data.

#####License

Copyright 2016 rentamob

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
