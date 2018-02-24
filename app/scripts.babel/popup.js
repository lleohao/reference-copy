/**
 * 复制模式列表
 * @type {string[]}
 */
const MODE = ['default', 'link', 'md', 'md-todo'];
/**
 * 默认复制模式 index
 * @type {number}
 */
const DEFAULT_MODE = 0;
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
  liList[DEFAULT_MODE].classList.add(ACTIVE_CLASS_NAME);
  
  // 绑定事件
  wrapElm.addEventListener('click', function (e) {
    const index = parseInt(e.target.dataset['index']);
    
    liList.forEach((item, _index) => {
      if (index === _index) {
        item.classList.add(ACTIVE_CLASS_NAME);
      } else {
        item.classList.remove(ACTIVE_CLASS_NAME);
      }
    });
  });
}

init();
