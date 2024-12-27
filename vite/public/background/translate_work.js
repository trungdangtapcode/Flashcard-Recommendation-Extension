chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "saveText",
      title: "http://192.168.1.1:3010",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveText" && info.selectionText) {
      chrome.storage.local.get({ savedTexts: [] }, (data) => {
        const updatedTexts = [...data.savedTexts, info.selectionText];
        chrome.storage.local.set({ savedTexts: updatedTexts }, () => {
          console.log("Text saved:", info.selectionText);
        });
      });
    }
  });