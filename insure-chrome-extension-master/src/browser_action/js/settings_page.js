//Initialize local lists on refresh
if (localStorage.getItem("whitelist") != null) {
  updateWhitelist();
}
if (localStorage.getItem("blacklist") != null) {
  updateBlacklist();
}

//Submit Buttons
document
  .getElementById("submit_to_whitelist_btn")
  .addEventListener("click", submitToWhitelist);
document
  .getElementById("submit_to_blacklist_btn")
  .addEventListener("click", submitToBlacklist);

//When button clicked, push new URL to localStorage
function submitToWhitelist() {
  var whitelist_arr = JSON.parse(localStorage.getItem("whitelist"));
  var element = document.getElementById("local_whitelist_text").value;
  element = element.replace(/\n/g, " ");
  var parse_wl_input = element.split(/\s+/);
  //console.log(parse_wl_input);
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  for (var i = 0; i < parse_wl_input.length; i++) {
    var url = parse_wl_input[i].match(expression);
    if (whitelist_arr == null) {
      if (url !== null) {
        whitelist_arr = [url];
      }
    } else {
      if (url !== null) {
        var count = 0;
        for (var h = 0; h < whitelist_arr.length; h++) {
          if (whitelist_arr[h].toString() == url.toString()) {
            count++;
          }
        }
        if (count == 0) {
          whitelist_arr.push(url);
        }
      }
    }
  }
  localStorage.setItem("whitelist", JSON.stringify(whitelist_arr));
  updateWhitelist();
}

//Display the current localStorage to HTML
function updateWhitelist() {
  //clear local_whitelist_table
  var ul = document.getElementById("local_whitelist_table");
  var lis = ul.getElementsByTagName("li");
  while (lis.length > 0) {
    ul.removeChild(lis[0]);
  }
  var whitelist_arr = JSON.parse(localStorage.getItem("whitelist"));
  //loop through whitelist_arr and append elements to local_whitelist_table
  if (whitelist_arr !== null) {
    for (var i = 0; i < whitelist_arr.length; i++) {
      var node = document.createElement("LI");
      var button = document.createElement("SPAN");
      button.setAttribute("id", "close_button");
      button.setAttribute("class", "wl_close");
      //TODO: button.addEventListener("click", removeElement);
      var textnode = document.createTextNode(whitelist_arr[i]);
      node.appendChild(textnode);
      node.appendChild(button);
      button.innerHTML = "&times;";
      document.getElementById("local_whitelist_table").appendChild(node);
    }
  }

  var wl_closebtns = document.getElementsByClassName("wl_close");

  //Assign clicklisteners to x buttons in whitelist
  for (var i = 0; i < wl_closebtns.length; i++) {
    wl_closebtns[i].addEventListener("click", function removeWLItem() {
      var temparr = JSON.parse(localStorage.getItem("whitelist"));
      var unparsed_html = this.parentElement.innerHTML;
      var parsed_html = unparsed_html.substring(
        0,
        unparsed_html.search("<span")
      );
      for (var j = 0; j < temparr.length; j++) {
        if (parsed_html == temparr[j]) {
          temparr.splice(j, 1);
        }
      }
      localStorage.setItem("whitelist", JSON.stringify(temparr));
      updateWhitelist();
    });
  }
}
//When button clicked, push new URL to localStorage
function submitToBlacklist() {
  var blacklist_arr = JSON.parse(localStorage.getItem("blacklist"));
  var element = document.getElementById("local_blacklist_text").value;
  element = element.replace(/\n/g, " ");
  var parse_bl_input = element.split(/\s+/);
  //console.log(parse_bl_input);
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  for (var i = 0; i < parse_bl_input.length; i++) {
    var url = parse_bl_input[i].match(expression);
    if (blacklist_arr == null) {
      if (url !== null) {
        blacklist_arr = [url];
      }
    } else {
      if (url !== null) {
        var count = 0;
        for (var h = 0; h < blacklist_arr.length; h++) {
          if (blacklist_arr[h].toString() == url.toString()) {
            count++;
          }
        }
        if (count == 0) {
          blacklist_arr.push(url);
        }
      }
    }
  }
  localStorage.setItem("blacklist", JSON.stringify(blacklist_arr));
  updateBlacklist();
}

//Display the current blacklist to HTML
function updateBlacklist() {
  //clear local_blacklist_table
  var ul = document.getElementById("local_blacklist_table");
  var lis = ul.getElementsByTagName("li");
  while (lis.length > 0) {
    ul.removeChild(lis[0]);
  }
  var blacklist_arr = JSON.parse(localStorage.getItem("blacklist"));
  //loop through blacklist_arr and append elements to local_blacklist_table
  if (blacklist_arr !== null) {
    for (var i = 0; i < blacklist_arr.length; i++) {
      var node = document.createElement("LI");
      var button = document.createElement("SPAN");
      button.setAttribute("id", "close_button");
      button.setAttribute("class", "bl_close");
      //TODO: button.addEventListener("click", removeElement);
      var textnode = document.createTextNode(blacklist_arr[i]);
      node.appendChild(textnode);
      node.appendChild(button);
      button.innerHTML = "&times;";
      document.getElementById("local_blacklist_table").appendChild(node);
    }
  }
  var bl_closebtns = document.getElementsByClassName("bl_close");
  //Assign clicklisteners to x buttons in blacklist
  for (var i = 0; i < bl_closebtns.length; i++) {
    bl_closebtns[i].addEventListener("click", function removeBLItem() {
      var temparr = JSON.parse(localStorage.getItem("blacklist"));
      var unparsed_html = this.parentElement.innerHTML;
      var parsed_html = unparsed_html.substring(
        0,
        unparsed_html.search("<span")
      );
      for (var j = 0; j < temparr.length; j++) {
        if (parsed_html == temparr[j]) {
          temparr.splice(j, 1);
        }
      }
      localStorage.setItem("blacklist", JSON.stringify(temparr));
      updateBlacklist();
    });
  }
}
