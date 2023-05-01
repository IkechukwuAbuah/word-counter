chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.selectedText !== undefined) {
    analyzeText(request.selectedText);
  }
});

function analyzeText(text) {
  if (text) {
    const wordCount = text.split(/\s+/).length;
    const charCount = text.length;
    const specialCharCount = text.replace(/[\w\s]/g, "").length;
    const averageWordLength = (charCount - specialCharCount) / wordCount;
    const longestWord = text.split(/\s+/).reduce((a, b) => (a.length > b.length ? a : b), '');

    chrome.action.setBadgeText({ text: wordCount.toString() });
    chrome.action.setTitle({ title: `Words: ${wordCount}, Characters: ${charCount}, Special Characters: ${specialCharCount}, Average Word Length: ${averageWordLength.toFixed(2)}, Longest Word: ${longestWord}` });
  } else {
    chrome.action.setBadgeText({ text: '' });
    chrome.action.setTitle({ title: 'Word Counter' });
  }
}
