'use strict';

module.exports = function (grunt) {

    grunt.config.set('browserify', {
        app: {
            options: {
                debug: false,
                watch: true,
                transform: [
                    ['reactify', { es6: true }]
                    //['uglifyify', { global: true }]
                ]
            },
            src: 'src/app/index.js',
            dest: 'dist/assets/js/bundle.js'
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
};