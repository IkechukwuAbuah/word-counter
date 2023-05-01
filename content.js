document.addEventListener('selectionchange', () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      chrome.runtime.sendMessage({ selectedText });
    }
  });
  