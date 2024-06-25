# Flatmates API Node Client

This project provides a Node.js client for interacting with the Flatmates.com.au API. It includes functions for retrieving messages, sending messages, searching for properties, and more.

## Features

- Fetch new messages count
- Get messages
- Get conversation details and mark as read
- Send messages
- Search for properties

## Installation

To install the dependencies, run:

```sh
bun install
```

## Usage

### Extracting Session ID, CSRF Token, KP_UIDz cookie

Run this in the browser console to get the session ID and CSRF token.

**You need to manually get `_flatmates_session` and `KP_UIDz` cookies from Application > Cookies in the browser.**

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
        csrfToken
    };
})();
```

### Examples

See examples in the `examples` directory.

## Running Tests

To run the tests, use the Bun test runner:

```sh
bun test
```
