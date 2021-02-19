module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: 'dist/browser/index.js', type: 'js', included: true },
      { pattern: 'src/**', type: 'module', included: false, watched: false },
      { pattern: 'test/generated/browser.test.js', type: 'module', included: true }
    ],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    singleRun: false,
    concurrency: Infinity,
    mochaReporter: {
      showDiff: true,
    },
    customLaunchers: {
      ChromeHeadlessDebug: {
        base: 'Chrome',
        flags: [
          '--remote-debugging-port=9333'
        ]
      }
    },
    client: {
      mocha: {
        timeout: 0
      }
    },
  });
};
