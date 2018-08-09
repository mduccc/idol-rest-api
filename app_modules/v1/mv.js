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
		var mv = []
		for(var item in snap){
			for(var itemChild in snap[item].song){
				mv.push({
					key: itemChild,
					name: snap[item].song[itemChild].name,
					youtube: snap[item].song[itemChild].youtube,
					lyrics: snap[item].song[itemChild].lyrics
				})
			}
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
						mv: this.mv(child.val().album)
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