'use strict';

const {contextMenus} = chrome;

let mode = 'default';

function copyToClipboard (text) {
  const copyDiv = document.createElement('div');
  copyDiv.contentEditable = true;
  document.body.appendChild(copyDiv);
  copyDiv.innerHTML = text;
  copyDiv.unselectable = 'off';
  copyDiv.focus();
  document.execCommand('SelectAll');
  document.execCommand('Copy', false, null);
  document.body.removeChild(copyDiv);
}

function createLinkText (text, url) {
  return `<a href="${url}" target="_blank">${decodeURIComponent(text)}</a>`;
}

chrome.runtime.onInstalled.addListener(() => {
  const contextMenuTitle = chrome.i18n.getMessage('contextMenuTitle');
  
  contextMenus.create({
    title: contextMenuTitle,
    contexts: ['selection', 'page'],
    onclick: (info, tab) => {
      const {selectionText} = info;
      const {title, url} = tab;
      
      let text;
      
      /**
       * 未选中 selectionText 为 undefined
       */
      if (selectionText === undefined) {
        text = title;
      } else {
        text = selectionText;
      }
      
      copyToClipboard(createLinkText(text, url));
    }
  });
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  console.log(changes, areaName);
});

