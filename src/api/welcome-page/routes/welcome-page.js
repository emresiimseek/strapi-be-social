'use strict';

/**
 * welcome-page router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::welcome-page.welcome-page');
