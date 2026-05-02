require('dotenv').config();

exports.config = {
  runner: 'local',
  specs: ['./tests/**/*.e2e.js'],
  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  baseUrl: process.env.WDIO_BASE_URL || 'https://preludeelectronics.com',
  waitforTimeout: 15000,
  connectionRetryTimeout: 180000,
  connectionRetryCount: 2,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 180000,
  },
  services: [
    [
      'appium',
      {
        command: 'appium',
        args: {
          basePath: '/',
          relaxedSecurity: true,
          log: './test-results/appium.log',
        },
      },
    ],
  ],
  capabilities: [
    {
      platformName: 'Android',
      browserName: 'Chrome',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
      'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '14',
      'appium:noReset': true,
      'appium:newCommandTimeout': 240,
      'appium:chromedriverAutodownload': true,
    },
  ],
};
