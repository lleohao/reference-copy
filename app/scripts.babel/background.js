'use strict';

const {contextMenus} = chrome;

/**
 * 复制模式列表
 * @type {string[]}
 */
const MODE_LIST = ['default', 'link', 'md', 'md-todo'];
let modeIndex = 0;

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

function createLink (text, url) {
    return `<a href="${url}" target="_blank">${decodeURIComponent(text)}</a>`;
}

function createText (text, url) {
    return `${text} - ${url}`;
}

function createMd (text, url) {
    return `[${text}](${url})`;
}

function createMdTodo (text, url) {
    return `- [ ] [${text}](${url})`
}

function handleContextMenuClick (info, tab) {
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
    let createCopyData;
    
    switch (MODE_LIST[modeIndex]) {
        case 'default':
            createCopyData = createText;
            break;
        case 'link':
            createCopyData = createLink;
            break;
        case 'md':
            createCopyData = createMd;
            break;
        case 'md-todo':
            createCopyData = createMdTodo;
            break;
    }
    
    copyToClipboard(createCopyData(text, url));
}

chrome.runtime.onInstalled.addListener(() => {
    // 设置默认模式
    const DEFAULT_MODE = 0;
    chrome.storage.sync.set({modeIndex: DEFAULT_MODE});
    
    const contextMenuTitle = chrome.i18n.getMessage('contextMenuTitle');
    
    contextMenus.create({
        title: contextMenuTitle,
        contexts: ['selection', 'page'],
        onclick: handleContextMenuClick
    });
});

chrome.storage.onChanged.addListener(changes => {
    modeIndex = changes.modeIndex.newValue;
});

