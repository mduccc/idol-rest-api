class Album{

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

	album(snap){
		var album = []
		for(var item in snap.album){
			var song = []
			for(var itemChil in snap.album[item].song){
				song.push({
					key: itemChil,
					name: snap.album[item].song[itemChil].name
				})
			} 
			album.push({
				key: item,
				name: snap.album[item].name,
				genre: snap.album[item].genre,
				label: snap.album[item].label,
				year: snap.album[item].year,
				song: song
			})
		}
		return album
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
						album: this.album(child.val())
					})
					res.end()
					console.log({
						idol: name,
						album: this.album(child.val())
					})
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

module.exports = Album