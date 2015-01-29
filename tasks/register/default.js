'use strict';

module.exports = function (grunt) {

    grunt.registerTask('default', [
        'clean:dist',
        'copy:app',
        'browserify:app'
    ]);
};