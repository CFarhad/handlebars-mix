# handlebars-mix plugin for [Laravel-mix](https://github.com/laravel-mix/laravel-mix)

### you can use this plugin for compile handlebars templates to html
<br>

## install

```bash
npm install --save handlebars-mix
```
or

```bash
yarn add handlebars-mix
```
<br>

## Usage
in your `webpack.mix.js`
```javascript
const mix = require('mix');
require('handlebars-mix');

mix.handlebars('**/*.hbs', '/public/pages/*.html');
```

<br>

## Parameters
- Input: multiple files:```**/*.hbs``` or single file:```/src/pages/index.hbs```
- output: multiple files:```/public/*.html``` or single file:```/public/index.html```

<br>

## example
- [simple](https://www.npmjs.com/package/handlebars-mix)

<br>

## Configuration
The plugin has the following config defaults. These are required for handlebars to map all dependencies for compiling handlebars templates.

```javascript
module.exports = {
  data: 'src/markup/data',
  decorators: 'src/markup/decorators',
  helpers: 'src/markup/helpers',
  layouts: 'src/markup/layouts',
  partials: 'src/markup/partials',
};
```

<br>

## Custom Configuration
If you would like to enforce your own folder structure simply create handlebars.config.js or hbs.config.js in your project root.
```javascript
module.exports = {
  data: 'views/json',
  helpers: 'views/tools',
  layouts: 'views/templates',
  partials: 'views/partials',
};
```

## Features

### frontmatter
The plugin has built in support for frontmatter yaml. Processed yaml data will be passed into the templates before compilation. frontmatter yaml data will preferably be at the top of the template file such as the following exampl

<br>

#### source - `eaxmple-hbs`

```html
---
title: This is a heading
desc: this is a paragraph
names:
  - bob
  - jane
  - mark
---
{{!< mainlayout}}

<h1>{{title}}</h1>
<p>{{desc}}</p>
<ul>
{{#each names}}
  <li>{{this}}</li>
{{/each}}
</ul>
```

<br>

#### output - example.html
```html
<html>
  <body>
    <h1>This is a heading</h1>
    <p>this is a paragraph</p>
    <ul>
      <li>bob</li>
      <li>jane</li>
      <li>mark</li>
    </ul>
  </body>
</html>
```

<br>

## Handlebars Layouts
The plugin has built in support for [handlebars-layouts](https://www.npmjs.com/package/handlebars-layouts). The advanced example shows how to take advantage of handlebars layouts. Please refer to their documentation for more information.

<br>

## Handlebars Helpers
The plugin is also including all helpers found in the npm package [handlebars-helpers](https://www.npmjs.com/package/handlebars-helpers). Please refer to their documentation for example usages.

<br>

## Note
| you can not use multiple files and compile their to single file

<br>

## run html files
```javascript
const mix = require('laravel-mix');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

mix.webpackConfig(() => {
    return {
        plugins: [
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 3003,
                watch: true,
                server: { baseDir: ['dist'] }
            })
        ]
    };
});
```