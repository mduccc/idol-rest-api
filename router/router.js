class Router{
	go(app, firebaseapp){
		var idol = require('../app_modules/v1/idol')
		var profile = require('../app_modules/v1/profile')
		var song = require('../app_modules/v1/song')
		var album = require('../app_modules/v1/album')
		var mv = require('../app_modules/v1/mv')
		app.set('view engine', 'pug')
		app.get('/', (req, res) =>{
			res.send('wellcome')
			res.end()
		})

		app.get('/admin', (req, res) =>{
			res.render('../public/view/admin')
		})

		app.get('/v1/idol', (req, res) =>{
			var idolapp = new idol().get(firebaseapp, req, res)
		})

		app.get('/v1/profile', (req, res) =>{
			var profileapp = new profile().get(firebaseapp, req, res)
		})

		app.get('/v1/song', (req, res) =>{
			var songapp = new song().get(firebaseapp, req, res)
		})

		app.get('/v1/album', (req, res) =>{
			var albumapp = new album().get(firebaseapp, req, res)
		})

		app.get('/v1/mv', (req, res) =>{
			var mvapp = new mv().get(firebaseapp, req, res)
		})

	}
}

module.exports = Router