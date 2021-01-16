// Background.js

var pageConditions = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { schemes: ['https','http'] } //probably something along the lines of {baseURL}/cart
      })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }
  
  chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([pageConditions]);
    });
  });