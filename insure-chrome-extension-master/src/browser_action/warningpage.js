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
      const url = `${this.apiHost}?url=${host}`;

      return fetch(url).then(response => response.json());
    }

    return false;
  }
}

const params = new URLSearchParams(window.location.search);
const site = params.get("url");

if (!site) {
  document.getElementById("continue").disabled = true;
}

function continuebutton() {
  whitelistURL();
  chrome.tabs.update({ url: site });
}

function whitelistURL() {
  const api = new API();
  var element = api.getHost(site);
  var whitelist_arr = JSON.parse(localStorage.getItem("whitelist"));

  if (whitelist_arr == null) {
    whitelist_arr = [element];
  } else {
    whitelist_arr.push(element);
  }
  localStorage.setItem("whitelist", JSON.stringify(whitelist_arr));
}

document
  .getElementById("goBack")
  .addEventListener("click", () => history.go(-2));

document.getElementById("continue").addEventListener("click", continuebutton);
