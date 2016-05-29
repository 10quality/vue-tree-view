/**
 * Grunt tasks.
 *
 * @author Alejandro Mostajo <http://about.me/amostajo>
 * @copyright 10Quality <http://www.10quality.com>
 * @license MIT
 * @version 1.0.0
 */
module.exports = function(grunt)
{
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'dist/vue.tree-view.min.js': [
                        'src/js/vue.tree-view.js'
                    ],
                }
            },
        },
        sass: {
            options: {
                sourceMap: true
            },
            dev: {
                files: {
                    'src/css/tree-view.css': 'src/sass/tree-view.scss'
                }
            },
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            dist: {
                files: {
                    'dist/vue.tree-view.min.css': [
                        'src/css/tree-view.css'
                    ],
                }
            },
        },
        copy: {
            dist: {
                files: [
                    {
                        src: 'src/js/vue.tree-view.js',
                        dest: 'dist/vue.tree-view.js'
                    },
                    {
                        src: 'src/css/tree-view.css',
                        dest: 'dist/vue.tree-view.css'
                    }
                ],
            },
        },
        htmlmin: {
            dev: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'src/html/template.min.html':
                        'src/html/template.html',
                }
            }
        },
    });

    // Load
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-sass');

    // Default task(s).
    grunt.registerTask('default', [
        'sass',
        'htmlmin:dev',
    ]);

    // Norm task
    grunt.registerTask('dist', [
        'sass',
        'cssmin:dist',
        'uglify:dist',
        'copy:dist',
    ]);
};
