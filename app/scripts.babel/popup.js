/**
 * active 元素的 class
 * @type {string}
 */
const ACTIVE_CLASS_NAME = 'active';

/**
 * 列表包裹元素
 * @type {Element | null}
 */
const wrapElm = document.querySelector('#wrap');
/**
 * 选项元素列表
 * @type {NodeListOf<Element>}
 */
const liList = document.querySelectorAll('.item');


/**
 * 初始化函数
 */
function init () {
    chrome.storage.sync.get(['modeIndex'], ({modeIndex}) => {
        if (modeIndex === undefined) mode = 0;
        
        liList[modeIndex].classList.add(ACTIVE_CLASS_NAME);
    });
    
    
    // 绑定事件
    wrapElm.addEventListener('click', function (e) {
        const index = parseInt(e.target.dataset['index']);
        if (index === undefined) return;
        
        liList.forEach((item, _index) => {
            if (index === _index) {
                item.classList.add(ACTIVE_CLASS_NAME);
            } else {
                item.classList.remove(ACTIVE_CLASS_NAME);
            }
        });
        changeMode(index);
    });
}

function changeMode (modeIndex) {
    chrome.storage.sync.set({modeIndex});
}

init();
