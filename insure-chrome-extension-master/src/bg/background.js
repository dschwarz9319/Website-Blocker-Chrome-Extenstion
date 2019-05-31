const DISABLED_KEY = "THIRD_EYE_DISABLED";

class API {
  apiHost = "http://cosc490.chance.sh/";

  protocols = ["http:", "https:"];

  getHost(url) {
    var pathArray = url.split("/");

    if (this.protocols.indexOf(pathArray[0]) !== -1) {
      return pathArray[2];
    }

    return null;
  }

  lookup(lookupUrl) {
    const host = this.getHost(lookupUrl);

    if (host !== null) {
      const url = `${this.apiHost}?url=${host}&fullUrl=${lookupUrl}`;

      return fetch(url).then(response => response.json());
    }

    return false;
  }
}

chrome.tabs.onUpdated.addListener((tabId, info) => {
  const enabled = localStorage.getItem(DISABLED_KEY) != "true";

  if (enabled) {
    chrome.tabs.get(tabId, async tab => {
      const { url } = tab;

      var site = url;
      chrome.runtime.sendMessage({ site });

      if (url) {
        // Check if the URL is the whitelist or blacklist

        const api = new API();
        const host = api.getHost(url);

        //Fetch and parse whitelist and blacklist from local storage
        var wl_arr = JSON.parse(localStorage.getItem("whitelist"));
        var bl_arr = JSON.parse(localStorage.getItem("blacklist"));

        if (host !== null) {
          if (wl_arr !== null) {
            //Search whitelist for matching url
            for (var i = 0; i < wl_arr.length; i++) {
              if (wl_arr[i] == host || host == "www." + wl_arr[i]) {
                //URL is in whitelist, so disregard
                return;
              }
            }
          }
          if (bl_arr !== null) {
            //Search blacklist for matching url
            for (var j = 0; j < bl_arr.length; j++) {
              if (bl_arr[j] == host || host == "www." + bl_arr[j]) {
                //Redirect to warning page
                chrome.tabs.update(tabId, {
                  url: "/src/browser_action/warning_page.html"
                });
              }
            }
          }
        }

        const response = await api.lookup(url);

        if (response && response.malicious === true) {
          chrome.tabs.update(tabId, {
            url: `/src/browser_action/warning_page.html?url=${url}`
          });
        }
      }
    });
  }
});
