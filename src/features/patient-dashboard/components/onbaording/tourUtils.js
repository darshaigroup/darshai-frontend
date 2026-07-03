export const getElement = selector =>
  document.querySelector(selector);

export const getRect = selector => {
  const el = getElement(selector);
  return el ? el.getBoundingClientRect() : null;
};

export const scrollToElement = (
  selector,
  options = {
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  }
) => {
  const el = getElement(selector);

  if (!el) return false;

  el.scrollIntoView(options);

  return true;
};

export const pulseElement = (
  selector,
  duration = 800
) => {
  const el = getElement(selector);

  if (!el) return false;

  el.classList.add("tour-active");

  setTimeout(() => {
    el.classList.remove("tour-active");
  }, duration);

  return true;
};

export const wait = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

export const isVisible = selector => {
  const rect = getRect(selector);

  if (!rect) return false;

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth)
  );
};

export const focusElement = selector => {
  const el = getElement(selector);

  if (!el) return false;

  el.focus?.();

  return true;
};

export const waitForElement = (
  selector,
  timeout = 5000,
  interval = 100
) =>
  new Promise(resolve => {
    const start = Date.now();

    const timer = setInterval(() => {
      const el = getElement(selector);

      if (el) {
        clearInterval(timer);
        resolve(el);
      }

      if (Date.now() - start > timeout) {
        clearInterval(timer);
        resolve(null);
      }
    }, interval);
  });

export const getElementCenter = selector => {
  const rect = getRect(selector);

  if (!rect) return null;

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};