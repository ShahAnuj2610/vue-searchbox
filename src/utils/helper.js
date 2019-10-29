import computeScrollIntoView from "compute-scroll-into-view";

export const getClassName = (classMap, component) =>
  (classMap && classMap[component]) || "";

/**
 * To determine wether an element is a function
 * @param {any} element
 */
export const isFunction = element => typeof element === "function";

export const getComponent = (data = {}, props = {}) => {
  const { children, render } = props;
  // Render function as child
  if (isFunction(children)) {
    return children(data);
  }
  // Render function as render prop
  if (isFunction(render)) {
    return render(data);
  }
  return null;
};

export const hasCustomRenderer = (props = {}) => {
  const { render, children } = props;
  return isFunction(children) || isFunction(render);
};

export const equals = (a, b) => {
  if (a === b) return true;
  if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
    return a === b;
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};

export const debounce = (fn, delay) => {
  let timer = null;
  return function(...args) {
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

/**
 * Scroll node into view if necessary
 * @param {HTMLElement} node the element that should scroll into view
 * @param {HTMLElement} rootNode the root element of the component
 */
// eslint-disable-next-line // for downshift
export const scrollIntoView = (node, rootNode) => {
  if (node === null) {
    return;
  }

  const actions = computeScrollIntoView(node, {
    boundary: rootNode,
    block: "nearest",
    scrollMode: "if-needed"
  });
  actions.forEach(({ el, top, left }) => {
    el.scrollTop = top;
    el.scrollLeft = left;
  });
};
