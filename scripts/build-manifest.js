const manifest = require('../src/manifest.json');
const version = require('../package.json').version;

manifest.version = version;

if (process.env.BROWSER === 'chrome') {
  manifest.options_page = 'optionsPage/options.html';
  manifest.browser_action.default_icon = 'images/icon128.png';
  manifest.browser_action.name = 'Habitica Chat Extension';
  manifest.externally_connectable = {
    'matches': [
      '*://*.habitica.com/*',
      '*://*.habitica.com/static/*'
    ]
  };
} else if (process.env.BROWSER === 'firefox') {
  manifest.browser_action.browser_style = true;
  manifest.browser_action.default_icon = {
    '16': 'images/icon16.png',
    '48': 'images/icon48.png',
    '128': 'images/icon128.png'
  };
  manifest.browser_action.default_title = "Habitica Chat Extension";
}

console.log(JSON.stringify(manifest, null, 2));
