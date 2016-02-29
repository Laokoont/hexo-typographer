'use strict';

var Typograph = require('typograf');
var cheerio = require('cheerio');

function applyHangingPuctuation(text) {
	var $ = cheerio.load(text, {
      decodeEntities: false
  });

	$('h1, h2, h3, h4, h5, h6, p').each(function(index, element) {
		console.log($(element.text));
	});

	return text;
}

module.exports = function(source) {
	var config = this.config.typographer;
	var lang = (config.lang !== undefined) ? config.lang : 'en';
	var hangPunct = (config.enableHangingPunctuation !== undefined) ? config.enableHangingPunctuation : false;

	var typo = new Typograph({
		'lang': 'ru',
		'mode': 'name'
	});

	var result = typo.execute(source);

	if (hangPunct) {
		result = applyHangingPuctuation(result);
	}

	return result;
};