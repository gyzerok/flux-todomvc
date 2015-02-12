'use strict';

var zlib = require('zlib');

module.exports = function (grunt) {

    grunt.config.set('browserify', {
        app: {
            options: {
                debug: false,
                watch: true,
                transform: [
                    '6to5ify'//,
                    //['reactify', { es6: true }]
                    //['uglifyify', { global: true }]
                ]/*,
                postBundleCB: function (err, src, next) {
                    if (err) return next(err);

                    zlib.gzip(src, next);
                }*/
            },
            src: 'src/app/index.js',
            dest: 'dist/assets/js/bundle.js'
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
};