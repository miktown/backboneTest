
module.exports = function(grunt){

	// modules calls
	grunt.loadNpmTasks('grunt-contrib-connect'); // levantar servidores
	grunt.loadNpmTasks('grunt-browserify'); // inyección de dependencias backbone
	grunt.loadNpmTasks('grunt-contrib-stylus'); // compilar stylus
	grunt.loadNpmTasks('grunt-contrib-watch'); // observar cambios sobre archivos
	grunt.loadNpmTasks('grunt-contrib-cssmin'); // minificar los css
	grunt.loadNpmTasks('grunt-contrib-uglify'); // minificar y ofuscar js
	grunt.loadNpmTasks('grunt-contrib-stylus'); // stylus
	grunt.loadNpmTasks('grunt-open'); // open url
	grunt.loadNpmTasks('grunt-contrib-copy'); // copia archivos y carpetas
	grunt.loadNpmTasks('grunt-contrib-clean'); // borra carpetas y archivos
	grunt.loadNpmTasks('grunt-ssh'); // conexión por ssh y sftp al servidor para deploy
	grunt.loadNpmTasks('grunt-changelog'); // coge el log de git to file
	grunt.loadNpmTasks('grunt-replace'); // replace strings pattern/regex

	// config modules
	grunt.config.init({

		open: { // abre url en el navegador especificado
		    dev: {
		      path: 'http://robots.dev/',
		      app: 'Google Chrome',
		      options: {
		      	livereload: true
		      }
		    },
		    pro: {
		      path: 'http://pro-robots.rhcloud.com/',
		      app: 'Google Chrome'
		    },

		},

		watch: { // observa cambios sobre archivos

			scripts: {
			   	files: ['src/**/*', '!src/css/*', '!src/js/app.js', '!src/js/app.min.js'],
			   	tasks: ['clean:dev','stylus', 'browserify','copy:pro'],
			   	options: {
			        livereload: true,
			    },

			}

		},

		browserify: { // gestión de dependencias js
      		'temp/js/app.min.js': ['src/js/app.js']
    	},

		cssmin: { // minificado de css
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'css/',
		      src: ['*.css', '!*.min.css'],
		      dest: 'css/',
		      ext: '.min.css'
		    }]
		  }
		},

	    uglify: { // minificador de js
	      options: {
	        mangle: true
	      },
	      my_target: {
	        files: {
	          'src/js/app.min.js': ['src/js/app.min.js']
	        }
	      }
	    },


	    stylus: { // compilación stylus
		  compile: {
		    files: {
		      'temp/css/style.min.css': ['src/stylus/style.styl']
		    }
		  }
		},

		copy: {
		  pro: {
		    files: [
		      // includes files within path
		      {expand: true, flatten: true, src: ['temp/css/**'], dest: 'app/css', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['temp/js/app.min.js'], dest: 'app/js', filter: 'isFile'}
		    ]
		  }
		},

		clean: {
			dev: ["temp"],
			pro: ["app"]
		}, // borra la carpeta build antes de montarla					// SEGURIDAD: nunca versionar este archivo o la seguridad se verá comprometida

	});

	// tareas principales

	grunt.registerTask('default',[ 'clean:dev' , 'stylus' , 'browserify' , 'copy:pro' , 'watch:scripts' ]);

	grunt.task.registerTask('build', [ 'clean:pro', 'stylus' , 'browserify' , 'uglify' , 'copy:pro', 'replace:pro' ]);

	grunt.task.registerTask('deploy', [ 'clean:pro', 'stylus' , 'browserify' , 'uglify' , 'copy:pro' , 'replace:pro' , 'sftp' , 'open:pro' ]);

	// tareas standalone
	grunt.task.registerTask('css', ['stylus']);
	grunt.task.registerTask('borrar', [ 'clean' ]);
	grunt.task.registerTask('log', [ 'changelog' ]);
	grunt.task.registerTask('rep', [ 'replace' ]);
	grunt.task.registerTask('pro', [ 'sftp' ]);




};