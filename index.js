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