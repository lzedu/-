const path = require('path');
const {src,dest,series,parallel,watch} = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const proxy = require('http-proxy-middleware');

function copyhtml() {
    return src('./src/*.html')
    .pipe(dest('./dist'))
    .pipe(connect.reload())
}

function SASS(){
    return src(['./src/styles/*.scss','!./src/styles/yo/**/*'])
    .pipe(sass().on('error',sass.logError))
    .pipe(dest('./dist/styles/'))
    .pipe(connect.reload())
}

function packJs(){
    return src('./src/scripts/**/*.js')
    .pipe(webpack({
        mode : 'development',
        entry : './src/scripts/app.js',
        output : {
            path : path.resolve(__dirname,'./dist'),
            filename:'app.js'
        },
        module:{
            rules:[
                {
                    test:/\.art$/,
                    loader:'art-template-loader'
                }
            ]
        }
    }))
    .pipe(dest('./dist/scripts/'))
    .pipe(connect.reload())
}

function packAssets(){
    return src('./src/assets/**/*')
    .pipe(dest('./dist/assets/'))
}

function packStatic(){
    return src('./src/static/**/*')
    .pipe(dest('./dist/static/'))
}

// copylibs
function copylibs() {
    return src('./src/libs/**/*')
      .pipe(dest('./dist/libs/'))
  }

function server(){
    return connect.server({
        name :"Dist App",
        root :'./dist',
        port : 8000,
        host : '10.9.49.193',
        livereload : true,
        middleware:() => {
            return [
              proxy('/api', {
                target: 'http://m.hmlan.com',
                changeOrigin: true,
                pathRewrite: {
                  '^/api': ''
                }
              })
            ]
          }
    })
}

function watchFiles() {
    watch('./src/*.html',series(copyhtml));
    watch('./src/styles/**/*.scss',series(SASS));
    watch('./src/scripts/**/*',series(packJs));
    watch('./src/assets/**/*',series(packAssets));
}



exports.default = series(parallel(copyhtml,SASS,packJs,packAssets,copylibs,packStatic),parallel(server,watchFiles));