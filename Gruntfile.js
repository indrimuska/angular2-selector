module.exports = function(grunt) {
	
	// Load plugins
	require('load-grunt-tasks')(grunt);
	
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bumpup: {
			options: {
	            updateProps: {
	                pkg: 'package.json'
	            }
	        },
	        file: 'package.json'
		},
		eslint: {
			options: {
				configFile: 'eslint.json'
			},
			target: ['src/angular2-selector.js']
		},
		copy: {
			main: {
				files: {
					'dist/angular2-selector.js': ['src/angular2-selector.js'],
					'dist/angular2-selector.css': ['src/angular2-selector.css']
				}
			}
		},
		uglify: {
			main: {
				files: {
					'dist/angular2-selector.min.js': ['dist/angular2-selector.js']
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			main: {
				files: {
					'dist/angular2-selector.min.css': ['dist/angular2-selector.css']
				}
			}
		},
		header: {
			main: {
				options: {
					text: '/*! angular2-selector - v<%= pkg.version %> - https://github.com/indrimuska/angular2-selector - (c) 2015 Indri Muska - MIT */'
				},
				files: {
					'dist/angular2-selector.js': 'dist/angular2-selector.js',
					'dist/angular2-selector.css': 'dist/angular2-selector.css',
					'dist/angular2-selector.min.js': 'dist/angular2-selector.min.js',
					'dist/angular2-selector.min.css': 'dist/angular2-selector.min.css'
				}
			}
		},
		'sync-json': {
			options: {
				include: ['name', 'description', 'version']
			},
			bower: {
				files: {
					"bower.json": "package.json"
				}
			}
		}
	});
	
	// Default tasks.
	grunt.registerTask('default', ['eslint', 'copy', 'uglify', 'cssmin', 'header', 'sync-json']);
	grunt.registerTask('update-patch', ['bumpup:patch', 'default']);
	
};