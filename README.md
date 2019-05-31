# INSuRE Chrome Extension
Authors: Daniel Schwarz, Taylor McLaughlin, Chance Brilz, Deep Patel, and Anthony Panei
## General
ThirdEye Detection is an extension built for the popular web browser Google Chrome. The point of the extension is to filter malcious URLs through three tiers of detection. 
- First we check a user-defined blacklist/whitelist which is stored on the browser's local storage.
- Next, the fetched URL gets run through our personal master blacklist, which is hosted on a Node Server(https://github.com/chancebrilz/insure-chrome-extension-server) and contains almost 2 million entries.
- Finally, the URL in question is examined by our "Recurrent Neural Network," which is an A.I. that cross references the URL with other malcious URLs that the A.I. has been trained on, to determine if there are any similarities.
### Local Blacklist and Whitelist
Upon clicking the logo embedded in the Google Chrome toolbar, users are given the option to enable/disable extension, as well as local preferences which takes the user to the settings page. Here the user can add or remove websites from either their local whitelist or blacklist.
### Warning Page
If a user attempts to access a site that has been deemed malicious by either the master or local blacklist, the user will then be redirected to our warning page. There the user has the option to either continue or to go back. If the user decides to continue, then the URL they attempted to access will be added to their local whitelist, thus preventing any further warning prompts should they attempt to access it in the future.

