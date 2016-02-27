
if (hexo.config.typographer && hexo.config.typographer.enable) {
    hexo.extend.filter.register('after_render:html', require('./lib/filter'));
}
