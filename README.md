# Introduction
This is a "dummy" plugin to demonstrate how a plugin is writen and distributed for the [OpenHaus backend](https://github.com/OpenHausIO/backend).

You can use/clone this repo as boilerplate:
```sh
git clone -depth=1 --branch=main git@github.com:mStirner/oh-plg-dummy.git oh-plg-whatever
cd oh-plg-whatever
rm -rf .git
npm install
```

## Structure & Workflow

## `index.js` file

The entry point of the plugin is a `index.js` file in the plugin folder.
```js
module.exports = (info, logger, init) => {

    // info = plugin object item from component "plugins"
    // logger = logger instance to use 
    // init = function to initalize the plugin

};
```

### `init(...)` function
```js
return init([], (scope, []) => {
    ...
});
```

The init function takes as first argument a array, which are the component names that you want to use/gets injected.

Second argument is a callback functions, that has as the first parameter "this" scope, and as second argument a array with the components instance specified in the first init argument.

### Example
```js
module.exports = (info, logger, init) => {
    return init([], (scope, []) => {

        // feedback
        console.log("Hello World", info);

        // logger 
        logger.trace(`Hello from plugin: "${info.name}"`);
        logger.verbose(`Hello from plugin: "${info.name}"`);
        logger.debug(`Hello from plugin: "${info.name}"`);
        logger.info(`Hello from plugin: "${info.name}"`);
        logger.warn(`Hello from plugin: "${info.name}"`);
        logger.error(`Hello from plugin: "${info.name}"`);

    });
};
```
In the example above non components/intents are registered.

If you want a to do something with the `users` component for example, you can do:
```js
module.exports = (info, logger, init) => {
    return init([
        "users"
        ], (scope, [
            C_USERS
        ]) => {

        // do something with the user component

    });
};
```

## Development
Create a new plugin over the HTTP API:<br />
`[PUT] http://{{HOST}}:{{PORT}}/api/plugins/`:
```json
{
    "name": "Dummy Plugin",
    "enabled": true,
    "version": 1,
    "intents": [
        "devices", 
        "endpoints", 
        "ssdp", 
        "vault", 
        "store"
    ]
}
```

Example output from the API:
```json
{
    "_id": "63a088ba41d049eca2f93ac5",
    "name": "Dummy Plugin",
    "enabled": true,
    "version": 1,
    "intents": [
        "devices",
        "endpoints",
        "ssdp",
        "vault",
        "store"
    ],
    "timestamps": {
        "created": 1671465146575,
        "updated": null
    },
    "uuid": "e20cf5fe-3050-418c-906f-ea27359682d7",
    "autostart": true
}
```

Mount the plugin source code into the backend plugins folder:
```sh
sudo mount --bind ~/projects/OpenHaus/plugins/oh-plg-dummy/ ~/projects/OpenHaus/backend/plugins/e20cf5fe-3050-418c-906f-ea27359682d7/
```
> Use the UUID returned from the HTTP API after creating the plugin item

Then start the backend with:
```sh
npm run dev
```

The changes made in the plugin source code, should trigger a automatically backend reload.