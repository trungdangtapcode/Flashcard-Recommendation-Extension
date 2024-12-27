chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "saveText",
      title: "Save Selected Text",
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