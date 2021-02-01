# Local Intercom

A package that allows browser tabs and windows to communicate. This was built to
help me syncronize multiple browser tabs on the same machine.

## Usage

1. Install the package from npm.
   `npm i local-intercom`
2. Include the package in your code.
   `include intercom from 'local-intercom'`
3. Listen for a type of message and describe what to do.
   `intercom.listen('chat', (msg) => console.log(msg))`
4. Send messages.
   `intercom.send('notify')`
   `intercom.send('chat', 'Hello')`
   `intercom.send('update', { hello: 'world' })`

## Demo

Start a local demo with your favorite local web server. I use python in the
following example.

```sh
git clone https://https://github.com/brettk-dev/local-intercom.git
cd local-intercom
python -m http.server
```

Then open http://localhost:8000/demo in your browser.

## Details

* You must listen to the same type of message that is being sent. All other
  types will be ignored.
* The message being sent can be anything `JSON.stringify` will handle, or
  `undefined`.
* This uses localStorage under the hood to pass data.
