const mix = require('laravel-mix');

mix.extend(
  'handlebars',
  new class{
    name(){
      return 'Handlebars';
    }

    register(from,to){

      
      let regex1 = /\*.hbs/g;
      let regex2 = /[a-zA-Z]{1,}\.[a-zA-Z]*/g;
      if(from.match(regex1) !== null && to.match(regex2) !== null){
        throw Error('Yout cant save multiple files to single file');
      }
      const HbsWaxRender = require('./render');
      Mix.addTask(new HbsWaxRender({from: from,to:to}));
    }

    dependencies() {
      this.requiresReload = true;
      return ['glob', 'front-matter','handlebars','handlebars-wax','handlebars-layouts','handlebars-helpers']
  }
  }()
)