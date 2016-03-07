'use strict';

var Typograph = require('typograf');
var cheerio = require('cheerio');

module.exports = function(source) {
	var config = this.config.typographer,
		lang = (config.lang !== undefined) ? config.lang : 'en',
		hangPunct = (config.enableHangingPunctuation !== undefined) ? config.enableHangingPunctuation : false,
		badges = (config.badges !== undefined) ? config.badges : false,
		classes = {
			"&laquo;": "startsWithQuote",
			"&raquo;": "startsWithQuote",
			"[": "startsWithSquareBrace",
			"]": "startsWithSquareBrace",
			"{": "startsWithCurlyBrace",
			"}": "startsWithCurlyBrace",
			"(": "startsWithRoundBrace",
			")": "startsWithRoundBrace",
			"#": "startsWithHash",
			"/": "startsWithDash",
			"\\": "startsWithBackDash",
			"*": "startsWithStar",
		};

	function applyHangingPuctuation(text) {
		var $ = cheerio.load(text, {
	      decodeEntities: false
	  	});

		$('h1, h2, h3, h4, h5, h6, p').each(function(index, element) {
			var text = $(element).text();
			var firstEntity = text.match(/\&[a-zA-Z]+\;/g) ? text.match(/\&[a-zA-Z]+\;/g)[0] : null;
			var first = (!!firstEntity && (text.indexOf(firstEntity) === 0)) ? firstEntity : text[0];

			if (classes[first] !== undefined) {
				$(element).addClass(classes[first]);
			}
		});

		return $.html();
	}

	unction generateBadge(text) {
		var $ = cheerio.load(text, {
			decodeEntities: false
		});

		var badge = '';

		$('p>img, img').each(function(index, element) {
			var src = $(this).attr('src');
			badge = '<div class="badge" style="background-image: url(\''+src+'\')"><img style="display: none" src="'+src+'"></img></div>'

			$(this).remove();
		});

		return badge+$.html();
	}

	var typo = new Typograph({
		'lang': 'ru',
		'mode': 'name'
	});

	var result = typo.execute(source);

	if (hangPunct) {
		result = applyHangingPuctuation(result);
	}

	if (badges) {
		result = generateBadge(result);
	}
	return result;
};