require('babel-register')
var projectRoot = process.cwd()
// Grab from .env file otherwise default is 9090
var port = process.env.E2E_PORT

// Setting
var defaultSettings = {
  'launch_url': 'http://localhost:' + port,
  'selenium_port': 4444,
  'selenium_host': '127.0.0.1',
  'silent': true,
  'screenshots': {
    'enabled': true,
    'on_failure': true,
    'on_error': true,
    'path': projectRoot + '/test/e2e/screenshots'
  }
}
var chromeSettings = Object.assign({}, defaultSettings, {
  'desiredCapabilities': {
    'browserName': 'chrome',
    'javascriptEnabled': true,
    'acceptSslCerts': true,
    'chromeOptions': {
      'args': ['--no-sandbox']
    }
  }
})
var firefoxSettings = Object.assign({}, defaultSettings, {
  'desiredCapabilities': {
    'browserName': 'firefox',
    'javascriptEnabled': true,
    'acceptSslCerts': true
  }
})

module.exports = {
  'src_folders': [projectRoot + '/test/e2e/specs'],
  'output_folder': projectRoot + '/test/e2e/reports',
  'selenium': {
    'start_process': true,
    // If you get an error saying unable to access jarfile. make sure to update jar path here
    'server_path': 'node_modules/selenium-server/lib/runner/selenium-server-standalone-3.0.1.jar',
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver': require('chromedriver').path,
      'webdriver.gecko.driver': require('geckodriver').path
    }
  },

  'test_settings': {
    // default is chrome
    'default': chromeSettings,
    'chrome': chromeSettings,
    'firefox': firefoxSettings
  }
}
