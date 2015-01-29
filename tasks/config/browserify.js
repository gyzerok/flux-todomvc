'use strict';

module.exports = function (grunt) {

    grunt.config.set('browserify', {
        app: {
            options: {
                debug: false,
                transform: [
                    ['reactify', { es6: true }]
                ]
            },
            src: ['src/app/index.js'],
            dest: 'dist/assets/js/bundle.js'
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
};