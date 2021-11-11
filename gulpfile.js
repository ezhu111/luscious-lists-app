const {src, dest, series} = require('gulp')

const static = function(){
   return src('src/static/data/*.*')
    .pipe(dest('dist/data'))
}

function redirect(){
    return (src('./_redirects').pipe(dest('./dist')))
}

exports.default = series(static, redirect)