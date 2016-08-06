module.exports = function (grunt) {
  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'nyan'
      },
      all: {
        src: ['test/*.js']
      }
      // client: {
      //   src: ['test/client/**/*.js']
      // }
    },

    shell: {
      lint: {
        command: 'eslint --color src/ test/'
      },
      lintNoWarnings: {
        command: 'eslint --color --quiet src/ test'
      }
    }
  });

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('lint', [
    'shell:lint'
  ]);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-shell');
};
