const loadScript = (src: string) => {
  return new Promise(function (resolve, reject) {
    let shouldAppend = false;
    const eleExists = document.querySelector('script[src="' + src + '"]');
    if (!eleExists) {
      const el: HTMLScriptElement = document.createElement('script');
      el.type = 'text/javascript';
      el.async = true;
      el.src = src;
      shouldAppend = true;

      el.addEventListener('error', reject);
      el.addEventListener('abort', reject);
      el.addEventListener('load', function loadScriptHandler() {
        el.setAttribute('data-loaded', 'true');
        resolve(el);
      });

      if (shouldAppend) {
        document.head.appendChild(el);
      }
    } else if (eleExists.hasAttribute('data-loaded')) {
      resolve(eleExists);
      return;
    }
  });
};

export default loadScript;
