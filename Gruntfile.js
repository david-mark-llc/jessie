var exec = require( 'child_process' ).exec;

module.exports = function( grunt ){

	grunt.initConfig({

		pkg: grunt.file.readJSON( 'package.json' ),

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today( "yyyy-mm-dd" ) %> */\n'
			}
		},

		clean: {
			dist: [ 'dist' ]
		},

		copy: {

			main: {
				files: [
					{
						expand: true,
						src: [ 'package.json', 'npm-shrinkwrap.json' ],
						dest: 'dist/'
					},{
						expand: true,
						cwd: 'src/',
						src: [ '{constructors,functions,libraries}/**/*' ],
						dest: 'dist/'
					}
				]
			},

			builder: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: [ 'builder/**/*', '!builder/public/{css,js}/**/*', '!builder/command.js', '!**/*.jshintrc' ],
						dest: 'dist/'
					}
				]
			}
		},

		useminPrepare: {
			options: {
				dest: 'dist/builder'
			},
			html: 'dist/builder/views/*.html'
		},

		usemin: {
			html: 'dist/builder/views/**/*.html',
			js: 'dist/builder/public/js/**/*.js',
			css: 'dist/builder/public/css/**/*.css',
			options: {
				assetsDirs: [ 'dist', 'dist/builder' ],
				patterns: {
					js: [
						[/(img\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
					]
				}
			}
		},

		filerev: {
			options: {
				algorithm: 'md5',
				length: 8
			},
			pub: {
				src: [ 'dist/builder/public/**/*' ]
			}
		},

		compress: {
			main: {
				options: {
					archive: '.tmp/jessie.zip'
				},
				files: [
					{ src: [ 'dist/**', 'dist/.*', '!dist/node_modules/**' ], dest: '' }
				]
			}
		}
	});

	require( 'load-grunt-tasks' )( grunt );

	grunt.registerTask( 'default', 'Default prod build with optional config',[
		'clean',
		'copy',
		'useminPrepare',
		'concat:generated',
		'cssmin:generated',
		'uglify:generated',
		'filerev',
		'usemin'
	]);
};