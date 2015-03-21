module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
        uglify:{
            my_target: {
                files: { 
                    'public/compiled/app.js': ['client/app.js', 'client/**/*.js'] 
                }
            }
        },
        watch: {
            scripts: {
                files: ['client/**/*.js'],
                tasks: ['uglify']
            }
        }
    });
    grunt.registerTask('default', ['uglify', 'watch']);
};