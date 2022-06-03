'use strict';

/**
 *  welcome-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::welcome-page.welcome-page');
