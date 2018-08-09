class Profile{

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

	member(snap){
		var member = []
		for(var item in snap){
			member.push({
				key: item,
				info: snap[item]
			})
		}
		console.log(member)
		return member
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
						member: this.member(child.val().member)
					})
					res.end()
				}
			})
		})
	}

	null(req, res){
		res.json({
			idol: null,
			member:[]
		})
		res.end()
	}

}

module.exports = Profile