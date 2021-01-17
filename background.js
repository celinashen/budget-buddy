// Background.js

// function showDisplay(function()){
//   chrome.tabs.getSelected(null, function(tab){
//     alert("hello there");
//   }
// }



chrome.storage.local.set({budget: 0.00}, function(){
});



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

  /**
  chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    const url = detail.url
    console.log(url)
  });**/


  chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
      // read changeInfo data and do something with it (like read the url)
      

      var condition = false;

      if (tab.url){
        condition = tab.url.includes('/cart')
        
      }
      console.log(tab);
      
      console.log(`condition=${condition}`)  
  
      

      if (condition && changeInfo.status == 'complete') {
        console.log('cart found in url');
        
        chrome.tabs.executeScript({
          file: 'contentScript.js'
        });



        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse){
            console.log(request.amount)
            var newTotal = request.amount;
            console.log(newTotal);

            let totalBudget = 0.00;

            chrome.storage.local.get(['budget'], function(result){
              totalBudget = result.budget;
              console.log(result.budget);

              if(newTotal > totalBudget){
                window.open("./popup/popup.html", "extension_popup", "width=700,height=640,status=no,scrollbars=yes,resizable=yes");
              }
            });

            // console.log(result.budget);

            // console.log(totalBudget);

            
          }
        )

        //console.log(newTotal);

        //const hardBudget = 25.00;


/**
        if (newTotal > hardBudget){
          console.log("hello");
          window.open("./popup/popup.html", "extension_popup", "width=700,height=640,status=no,scrollbars=yes,resizable=yes");
        }*/


      }
    }
  );

  