'use strict';

/**
 * external-event router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::external-event.external-event');
