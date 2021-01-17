// Background.js

// function showDisplay(function()){
//   chrome.tabs.getSelected(null, function(tab){
//     alert("hello there");
//   }
// }



var pageConditions = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlContains: "/cart" } 
        //pageUrl:{ schemes: ['https','http'] }
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
      

      let condition = false;

      if (tab.url){
        condition = tab.url.includes('/cart')
        
      }
      console.log(tab);
      
      console.log(`condition=${condition}`)  
  
      

      if (condition) {
        console.log('cart found in url');
        
        // var search = document.querySelector("a-size-medium a-color-base sc-price sc-white-space-nowrap");
        // console.log(search)

        window.open("./popup/popup.html", "extension_popup", "width=700,height=640,status=no,scrollbars=yes,resizable=yes");
        
        condition = false;

        chrome.tabs.executeScript({
          file: 'contentScript.js'
        });


      }
    }
  );

  