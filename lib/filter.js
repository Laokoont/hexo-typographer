'use strict';

var Typograph = require('typographer');

module.exports = function(source) {
	var config = this.config.typographer;
	var lang = (config.lang !== undefined) ? config.lang : 'en';
	var hangPunct = (config.enableHangingPunctuation !== undefined) ? config.enableHangingPunctuation : false;

	var typo = new Typograph({
		'lang': 'ru',
		'mode': 'name'
	});

	if (hangPunct) {
		typo.enable(lang + '/optalign/*');
	}

	// TODO: Check if some addotional preparations are needed before passing the string to the renderer
	var result = typo.execute(source);
	return result;
};