# gulp-head.js
last commit hash and tag without installing git

### install

```shell
npm install basis-company/gulp-head.js
```

### gulpfile.js
```js
var head = require('gulp-head');

gulp.task('head', () =>
  gulp.src('.git/HEAD')
    .pipe(head())
    .pipe(gulp.dest('build'))
);

```

### result

##### build/revision.txt
```
fc526b6c7f9ea0a8148f144e430e9f3593ba5a1b
```

##### build/version.txt
```
2.5.8
```
