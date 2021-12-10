const fs = require('fs');
const glob = require('glob');
const Task = require('laravel-mix/src/tasks/Task');

const HbsAsset = require('./lib/HbsAsset');

class HbsWaxRender extends Task {
  run() {
    let { from, to } = this.data;
    // check all file from glob
    let files = glob.sync(from);

    // remove any array when it has node_modules
    files = files.filter((file) => {
      return !file.includes('node_modules');
    });

    // show error when no file
    if (
      files.length === 0 ||
      typeof files === null ||
      typeof files === 'undefined'
    ) {
      throw Error('there are not any files');
    }

    // check all file is exists
    files = files.filter((file) => this.checkFile(file));

    const regex = /[a-zA-Z]\.[a-zA-Z]*/g;


    // watch all files to change

    if (to.match(regex)) {
      // handle single file
      this.handleSingleFile(files[0], to);
    } else {
      // handle multiple file
      this.handleMultiFile(files, to);
    }
  }

  /**
   * handle file and save it
   * @param {string} file
   * @param {string} path
   * @param {string} mode
   *
   */
  handleSingleFile(file, path, mode = 's') {
    // read from file
    let contentData = fs.readFileSync(file, { encoding: 'utf8' });
    const hbsAsset = new HbsAsset();
    const content = hbsAsset.render(contentData);

    // remove filename and extension from path
    let fileName =
      path.match(/[a-zA-Z]{1,}\.[a-zA-Z]*/g) || path.match(/\*.[a-zA-Z]*/g);
    let fullPath = path.replace(fileName, '');

    // remove first slash from fullpath
    if (fullPath.charAt(0) === '/') {
      fullPath = fullPath.substr(1);
    }

    // create folder if not exists
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    // write to file
    if (mode === 's') {
      fs.writeFile(`${fullPath}\\${fileName}`, content, (err) => {
        if (err) throw err;
      });
    } else {

      // get extension from file
      let extension = path.match(/\.[a-zA-Z]*/g)[0];

      // extract filename from file variable
      let filename = file.replace(/^.*[\\\/]/g, '')
      filename = filename.replace(/\.[a-zA-Z]*/g, '');


      fs.writeFile(`${fullPath}${filename}${extension}`, content, (err) => {
        if (err) throw err;
      });
    }
  }

  /**
   * handle multiple files
   * @param {string} files
   * @param {string} path
   */
  handleMultiFile(files, path) {
    files.map((file) => {
      this.handleSingleFile(file, path, 'm');
    });
  }

  /**
   * check file availibility
   * @param {string} file
   * @return {boolean}
   */
  checkFile(file) {
    return fs.existsSync(file);
  }
}

module.exports = HbsWaxRender;
