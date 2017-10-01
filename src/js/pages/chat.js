'use strict';

const habitica = require('../lib/habitica');
const habiticaMarkdown = require('habitica-markdown');
const $ = require('../lib/query-selector').$;
const $$ = require('../lib/query-selector').$$;
const chromeStorage = require('../lib/chrome-storage');

const REFRESH_RATE_FAST = 5000;
const REFRESH_RATE_MEDIUM = 45000;
const REFRESH_RATE_SLOW = 60000;

const intervals = {};
const config = {};
