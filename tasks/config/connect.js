'use strict';


module.exports = function (grunt) {

    grunt.config.set('connect', {
        server: {
            options: {
                port: 1337,
                livereload: 3333,
                base: {
                    path: 'dist',
                    options: {
                        index: 'index.html'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
};