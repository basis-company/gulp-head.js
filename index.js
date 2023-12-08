var fs          = require('fs');
var Transform   = require('stream').Transform;
var Vinyl       = require('vinyl');

module.exports = function() {
  return new Transform({
    objectMode: true,

    transform(file, enc, cb) {
      var dir  = file.dirname;
      var hash = file.contents.toString().trim();

      var tags = fs.readdirSync(dir + '/refs/tags', 'utf8').reverse();
      var ver  = '';

      if (hash.slice(0, 5) === 'ref: ') {
        hash = fs.readFileSync(dir + '/' + hash.slice(5).trim(), 'utf8').trim();
      }

      tags.some((tag, i) => {
        var h = fs.readFileSync(dir + '/refs/tags/' + tag, 'utf8').trim();

        if (h === hash) {
          ver = tag;
        }

        return ver || i > 50;
      });

      this.push(
        new Vinyl({
          path: 'revision.txt',
          contents: Buffer.from(hash),
        })
      );

      this.push(
        new Vinyl({
          path: 'version.txt',
          contents: Buffer.from(ver),
        })
      );

      cb();
    },
  });
};
