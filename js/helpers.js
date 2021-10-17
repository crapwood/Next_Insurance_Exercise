export function query(selector, scope) {
  if (scope === null) throw "query scope cannot be null";
  return (scope || document).querySelector(selector);
}

export function listen(target, type, callback, capture) {
  target.addEventListener(type, callback, !!capture);
}

export function delegateEvent(target, selector, type, handler, capture) {
  /* target - the ul element "todo-list" this is the parent element where we want to attach the listener
	   selector - which element to listen
	   type - the type of event we want to listen to
	   handler - when event was triggered this will handle the event
	*/
  const dispatchEvent = (event) => {
    const targetElement = event.target;
    const potentialElements = target.querySelectorAll(selector);
    let i = potentialElements.length;

    while (i--) {
      if (potentialElements[i] === targetElement) {
        handler.call(targetElement, event);
        break;
      }
    }
  };

  listen(target, type, dispatchEvent, !!capture);
}

export const handleTitleGreaterThanLessThan = (s) => s.replace(/<|>/g, "");

export const escapeForHTML = (s) =>
  s.replace(/[&<]/g, (c) => (c === "&" ? "&amp;" : "&lt;"));
