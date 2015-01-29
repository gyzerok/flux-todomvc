'use strict';

module.exports = function (grunt) {

    grunt.config.set('watch', {
        options: {
            livereload: 3333
        },
        files: ['dist/**/*']
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};