chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translateText",
    title: "Translate Selected Text",
    contexts: ["selection"]
  });
});

async function translateText(text) {
  const url = "http://127.0.0.1:3010/translate";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text, from: "en", to: "vi" }),
  });
  return response.json();
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
if (info.menuItemId !== "translateText" || !info.selectionText) return;
chrome.scripting.executeScript({
  target: { tabId: tab.id },
  func: () => {
    alert(translateText(info.selectionText));
  },
});
});