module.exports = function(grunt) {

	grunt.log.write('Task Runner... ' + grunt.template.today("yyyy-mm-dd hh:MM:ss TT\n\n"));

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		karma: {
			unit: {
				configFile: 'test/configs/karma-conf.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('default', [
		'karma'
	]);
};