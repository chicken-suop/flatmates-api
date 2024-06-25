# flatmates-api-node

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.16. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


## Extracting Session ID and CSRF Token

Run this in the browser console to get the session ID and CSRF token. You need to manually get `_flatmates_session` from Application > Cookies in the browser.

```JavaScript
(() => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const _session = getCookie('_session');

    function getCSRFToken() {
        const metaTags = document.getElementsByTagName('meta');
        for (let i = 0; i < metaTags.length; i++) {
            if (metaTags[i].getAttribute('name') === 'csrf-token') {
                return metaTags[i].getAttribute('content');
            }
        }
    }

    const csrfToken = getCSRFToken();

    console.log(`Session ID: ${_session}`);
    console.log(`CSRF Token: ${csrfToken}`);

    return {
        _session,
        _flatmates_session_id,
        csrfToken
    };
})();
```
