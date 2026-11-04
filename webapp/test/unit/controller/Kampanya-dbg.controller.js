/*global QUnit*/

sap.ui.define([
	"zfiotelselkampanyagiris/zfiotelselkampanyagiris/controller/Kampanya.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Kampanya Controller");

	QUnit.test("I should test the Kampanya controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
