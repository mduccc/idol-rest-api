class Song{

	get(firebaseapp, req, res){
		const https = require('https')
		var name = req.param('name')

		switch(name){
			case 'blackpink':{
				this.blackpink(firebaseapp, https, req, res)
				break
			}
			default:{
				this.null(req, res)
				break
			}
		}
	}

	song(snap){
		//snap = JSON.stringify(snap)
		console.log(snap)
		var song = []
		for(var item in snap){
			for(var itemChild in snap[item].song){
				console.log(snap[item].song[itemChild].name)
				song.push({
					name: snap[item].song[itemChild].name,
					album: snap[item].name,
					genre: snap[item].genre,
					year: snap[item].year,
					label: snap[item].label,
					lyrics: snap[item].song[itemChild].lyrics
				})
			}
		}
		console.log(song)
		return song
	}

	blackpink(firebaseapp, https, req, res){
		var name = req.param('name')
		var ref = firebaseapp.database().ref('/')
		//root
		ref.once('value', snap =>{
			//each child of root
			snap.forEach(child =>{
				if(child.val().name == 'blackpink'){
					res.json({
						idol: name,
						song: this.song(child.val().album)
					})
					res.end()
				}
			})
		})
	}

	null(req, res){
		res.json({
			idol: null,
			song:[]
		})
		res.end()
	}

}

module.exports = Song