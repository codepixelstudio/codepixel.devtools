// configure gulp tasks

    // global task variables
        var gulp       = require( 'gulp' );
        var sass       = require( 'gulp-sass' );
        var notify     = require( 'gulp-notify' );
        var rename     = require( 'gulp-rename' );
        var concat     = require( 'gulp-concat' );
        var path       = require( 'path' );
        var dateformat = require( 'dateformat' );
        var sourcemaps = require( 'gulp-sourcemaps' );
        var uglify     = require( 'gulp-uglify' );

    // other variables
        var basedate = new Date();
        var timestamp = dateformat( basedate, 'yyyy.mm.dd hh.MM' );
        notifycon = function( task ) {

            return './assets/img/notifycon_' + task + '.png';

        };

        gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
        gulp.Gulp.prototype._runTask = function( task ) {

            this.currentTask = task;
            this.__runTask(task);

        }

    // javascript task variables
        var jspath = './inc/js/build/**/*.js';

    // tasks

        // stylesheet
            gulp.task( 'stylesheets', function() {

                gulp.src( 'assets/scss/codepixel.devtools.scss' )

                    .pipe( sass().on( 'error', sass.logError ) )

                    .pipe( gulp.dest( './assets/css/' ) )

                    .pipe( notify({

                        title: 'compiled',
                        message: '<%= file.relative %> : <%= options.timestamp %>',
                        onLast: true,
                        icon: path.join( __dirname, notifycon( this.currentTask.name ) ),
                        templateOptions: {

                            timestamp: timestamp

                        }

                    }) );

            });

        // javascript
            gulp.task( 'javascript', function() {

                return gulp.src( jspath )

                    .pipe( sourcemaps.init() )

                    .pipe( concat( 'state.gameday.js' ) )

                    .pipe( gulp.dest( './inc/js/build/' ) )

                    .pipe( rename( 'state.gameday.min.js' ) )

                    .pipe( uglify() )

                    .pipe( sourcemaps.write( './' ) )

                    .pipe( gulp.dest( '.inc/js/build/' ) )

                    .pipe( notify({

                        title: 'compiled',
                        message: '<%= file.relative %> : <%= options.timestamp %>',
                        onLast: true,
                        icon: path.join( __dirname, notifycon( this.currentTask.name ) ),
                        templateOptions: {

                            timestamp: timestamp

                        }

                    }) );

            });

        // watch
            gulp.task( 'watch', function() {

                gulp.watch( 'assets/scss/**/*.scss', [ 'stylesheets' ] );

            });

            gulp.task( 'default', [ 'stylesheets', 'javascript', 'watch' ] );
