'use strict';

/* globals $, app, socket, define */

define('admin/plugins/category-queue', ['settings'], function (Settings) {
	var ACP = {};

	ACP.init = function () {
		Settings.load('category-queue', $('.category-queue-settings'));

		$('#save').on('click', function () {
			Settings.save('category-queue', $('.category-queue-settings'));
		});
	};
	return ACP;
});