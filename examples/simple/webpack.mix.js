const mix = require('laravel-mix');
require('handlebars-mix');


mix.handlebars('pages/index.hbs', 'public/pages/index.html');