// configure gulp tasks

    // variables
        var gulp = require( 'gulp' );
        var sass = require( 'gulp-sass' );

    // tasks

        // stylesheet
            gulp.task( 'stylesheet', function() {

                gulp.src( 'assets/scss/**/*.scss' )

                    .pipe( sass().on( 'error', sass.logError ) )

                    .pipe( gulp.dest( './assets/css/' ) );

            });

        // watch
            gulp.task( 'default', function() {

                gulp.watch( 'assets/scss/**/*.scss', [ 'stylesheet' ] );

            });
