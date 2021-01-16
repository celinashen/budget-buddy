// Background.js

// function showDisplay(function()){
//   chrome.tabs.getSelected(null, function(tab){
//     alert("hello there");
//   }
// }



var pageConditions = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        //pageUrl: { schemes: ['https://*/cart', 'http://*/cart'] } 
        pageUrl: { urlContains: "/cart" } 
      })
    ],
    actions: [
      new chrome.declarativeContent.ShowPageAction()
      //window.open("./popup/popup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no")
      //chrome.windows.create({url: "./popup/popup.html"})
    ]
  }

  chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([pageConditions]);
    });
  });

  /**
  const condition = window.location.href.contains('/cart')

  if (condition) {
      window.open("./popup/popup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");
  }**/


  chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
      // read changeInfo data and do something with it (like read the url)
      const condition = changeInfo.url.includes('/cart')
      console.log(`condition=${condition}`)  
  
      if (condition) {
         window.open("./popup/popup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");
      }
    }
  );