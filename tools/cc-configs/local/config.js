'use strict';

const config = require('conventional-changelog-conventionalcommits');

const customConfig = require('./custom-config');

module.exports = config(customConfig);
