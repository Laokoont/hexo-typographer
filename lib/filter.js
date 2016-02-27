'use strict'

var Typograph = require('typographer');
var typo = new Typograph({
	'lang': 'ru',
	'mode': 'name'
});

// Hanging puctuation
Typograph.enable('ru/optalign/*');

module.exports = function(source) {
	var config = this.config;
	var result = typo.execute(source);

	return result;
}