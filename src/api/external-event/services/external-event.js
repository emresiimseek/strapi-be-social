'use strict';

/**
 * external-event service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::external-event.external-event');
