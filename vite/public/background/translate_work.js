chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translateText",
    title: "Translate Selected Text",
    contexts: ["selection"]
  });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
if (info.menuItemId !== "translateText" || !info.selectionText) return;
chrome.scripting.executeScript({
  target: { tabId: tab.id },
  func: async (info, tab) => {
    async function translateText(text) {
      body = { text: text, from: "en", to: "vi" }
      const url = "http://127.0.0.1:3010/translate";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const translatedText = await response.json()
      return translatedText.text;
    }
    function addLovePopup(translatedText) {
      // Get the selection position if text is selected
      const selection = window.getSelection();
      let popupTop = '50%';
      let popupLeft = '50%';
      let useSelectionPosition = false;
      
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        if (rect.top || rect.left) { // Ensure rect has valid coordinates
            popupTop = `${rect.top + window.scrollY}px`;
            popupLeft = `${rect.left + window.scrollX}px`;
            useSelectionPosition = true;
        }
      }

      // Create the popup container
      const popup = document.createElement('div');
      // popup.style.position = 'fixed';
      // popup.style.top = '50%';
      // popup.style.left = '50%';
      // popup.style.transform = 'translate(-50%, -50%)';
      popup.style.position = 'absolute';
      popup.style.top = useSelectionPosition ? popupTop : '50%';
      popup.style.left = useSelectionPosition ? popupLeft : '50%';
      popup.style.transform = useSelectionPosition ? 'translate(0, 0)' : 'translate(-50%, -50%)';
      
      popup.style.padding = '20px';
      popup.style.backgroundColor = '#fff';
      popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      popup.style.borderRadius = '8px';
      popup.style.zIndex = '1000';
      popup.style.textAlign = 'center';
      popup.style.transition = 'opacity 3s linear';
      popup.style.opacity = '0.85';
  
      // Add the message
      const message = document.createElement('p');
      message.textContent = translatedText;
      message.style.margin = '0';
      message.style.fontSize = '18px';
      message.style.color = '#333';
      popup.appendChild(message);
  
      // Create the close button
      const closeButton = document.createElement('button');
      closeButton.textContent = '×';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '5px';
      closeButton.style.right = '5px';
      closeButton.style.background = 'none';
      closeButton.style.border = 'none';
      closeButton.style.fontSize = '16px';
      closeButton.style.cursor = 'pointer';
      closeButton.style.color = '#888';
  
      closeButton.addEventListener('mouseenter', () => {
          closeButton.style.color = '#333';
      });
  
      closeButton.addEventListener('mouseleave', () => {
          closeButton.style.color = '#888';
      });
      
      // Add close functionality
      closeButton.onclick = () => {
          document.body.removeChild(popup);
      };
  
      popup.appendChild(closeButton);
  
      // Add the popup to the DOM
      document.body.appendChild(popup);

      setTimeout(() => {
        if (document.body.contains(popup))
          document.body.removeChild(popup);
      }, 5000);
    }
    
    localStorage.setItem("savedEnglishHistoryUrl", "Tom");
    const LENGHT_LIMIT = 10
    const translatedText = await translateText(info.selectionText);
    addLovePopup(translatedText);
    chrome.storage.local.get({ savedEnglishTexts: [] }, (data) => {
      if (data.savedEnglishTexts.length>LENGHT_LIMIT){
        data.savedEnglishTexts = data.savedEnglishTexts.slice(-LENGHT_LIMIT)
      }
      const updatedTexts = [...data.savedEnglishTexts, info.selectionText];
      chrome.storage.local.set({ savedEnglishTexts: updatedTexts }, () => {
        // alert(translatedText);
      });
    });
  },
  args: [info, tab]
});

});

chrome.history.onVisited.addListener(()=>{
  const saveLocal = (ids) => {
    console.log(ids)
    if (ids.length === 0 || true ) return;
    chrome.scripting.executeScript({
      target: { tabId: ids[0].id },
      func: async () => {
        alert('hi')
        console.log('hi')
        localStorage.setItem("savedEnglishHistoryUrl", "Tom");
      },
      args: []});
  }
  chrome.tabs.query(
    {currentWindow: true, active : true},
    saveLocal
  )
  const LENGHT_LIMIT = 50
  chrome.history.search({text: '', maxResults: LENGHT_LIMIT}, function(data) {
    chrome.storage.local.set({ savedEnglishHistoryUrl: data }, () => {
    })
});
}
)