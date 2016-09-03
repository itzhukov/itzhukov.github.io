var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var del = require('del');
var runSequence = require('run-sequence');
var path = require('path');

function exceptionLog (error) {
	console.log(error.toString());
	this.emit('end');
}

// Сборка js
gulp.task('webpack', function() {
	gulp.src('./assets/js/main.js')
		.pipe( webpack(webpackConfig).on('error', exceptionLog) )
		.pipe(gulp.dest('./public/js/'));
});

// Сборка sass
gulp.task('sass', function() {
	gulp.src('./assets/sass/*.sass')
		.pipe( sass({outputStyle: 'compressed'}).on('error', sass.logError) )
		.pipe(gulp.dest('./public/css'))
		.on('error', exceptionLog);
});

gulp.task('del-build', function() {
	del([
		'/public/js/build.js',
		'/public/js/build.js.map',
		'/public/css/style.css',
		'/public/css/style.css.map'
	]);
});

// watcher
gulp.task('default', function () {
	runSequence('del-build', ['webpack', 'sass'])
	gulp.watch(['./assets/js/**/*.js', './webpack.config.js'], ['webpack']);
	gulp.watch('./assets/sass/**/*.sass', ['sass']);
});