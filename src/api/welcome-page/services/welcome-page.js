'use strict';

/**
 * welcome-page service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::welcome-page.welcome-page');
