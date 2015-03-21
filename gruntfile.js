module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.initConfig({
        uglify:{
            my_target: {
                files: { 
                    'public/compiled/app.js': ['client/app.js', 'client/**/*.js'] 
                }
            }
        }
    });
};