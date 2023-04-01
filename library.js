'use strict';

const controllers = require('./lib/controllers');
const winston = require.main.require('winston');
const meta = require.main.require('./src/meta');
const routeHelpers = require.main.require('./src/routes/helpers');
const plugin = {};

plugin.init = function (params) {
	const { router, middleware } = params;
	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/category-queue', [],  controllers.renderAdminPage);
	meta.settings.get('category-queue', function(err, settings) {
		if (err) {
			winston.error('[plugin/category-queue] Could not retrieve plugin settings!');
			plugin.settings = {"1":""};
			return;
		}

		plugin.settings = settings;
	});
};

plugin.addAdminNavigation = function (header) {
	header.plugins.push({
		route: '/plugins/category-queue',
		icon: 'fa-tint',
		name: 'category-queue',
	});

	return header;
};

plugin.postQueue = function (postData) {
	console.log("🚀 ~ file: library.js:38 ~ postData:", postData)
	try {
		if (Object.values(plugin.settings).includes(String(postData.data.cid))) {
			postData.shouldQueue = true;
		}
	} catch (error) {

	}

	return postData
};

module.exports = plugin;
