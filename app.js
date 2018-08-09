class App{

	build(){
		const express = require('express')
		const app = express()
		var port = 3001
		app.listen(port, ()=>{
			console.log('api-idol running on port ' + port)
		})
		return app
	}
}

module.exports = App