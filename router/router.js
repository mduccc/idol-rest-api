class Router{
	go(app, firebaseapp){
		var idol = require('../app_modules/idol')
		var profile = require('../app_modules/profile')
		var song = require('../app_modules/song')
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
			res.send('album')
			res.end()
		})

		app.get('/v1/mv', (req, res) =>{
			res.send('mv')
			res.end()
		})

	}
}

module.exports = Router