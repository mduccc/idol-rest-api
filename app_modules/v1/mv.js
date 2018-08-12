class Mv{

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

	mv(snap){
		var albumObj = snap.album
		var mvObj = snap.mv
		var mv = []
		for(var item in albumObj){
			console.log(albumObj[item].song)
			for(var itemChild in albumObj[item].song){
				mv.push({
					key: itemChild,
					name: albumObj[item].song[itemChild].name,
					youtube: albumObj[item].song[itemChild].youtube,
					lyrics: albumObj[item].song[itemChild].lyrics
				})
			}
		}
		for(var item in mvObj){
			mv.push({
				key: null,
				name: null,
				youtube: mvObj[item].youtube,
				lyrics: null
			})
		}
		return mv
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
						mv: this.mv(child.val())
					})
					res.end()
					console.log({
						idol: name,
						mv: this.mv(child.val().album)
					})
				}
			})
		})
	}

	null(req, res){
		res.json({
			idol: null,
			mv: []
		})
		res.end()
	}

}

module.exports = Mv