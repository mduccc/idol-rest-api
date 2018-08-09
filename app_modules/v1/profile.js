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
			if(snap[item].education){
				var info = {
					stage_name: snap[item].stage_name,
					fullname: snap[item].fullname,
					birthday:  snap[item].birthday,
					height:  snap[item].height + ' m',
					nationality: snap[item].nationality,
					place_of_birth: snap[item].place_of_birth,
					postion: snap[item].postion,
					instagram: snap[item].instagram,
					group: snap[item].group,
					education: snap[item].education,
					image_profile: snap[item].image_profile
				}
			}else{
				var info = {
					stage_name: snap[item].stage_name,
					fullname: snap[item].fullname,
					birthday:  snap[item].birthday,
					height:  snap[item].height + ' m',
					nationality: snap[item].nationality,
					place_of_birth: snap[item].place_of_birth,
					postion: snap[item].postion,
					instagram: snap[item].instagram,
					group: snap[item].group,
					education: null,
					image_profile: snap[item].image_profile
				}
			}
			
		
			member.push({
				key: item,
				info: info
			})
		}
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
					console.log({
						idol: name,
						member: this.member(child.val().member)
					})
				}
			})
		})
	}

	null(req, res){
		res.json({
			idol: null,
			member: []
		})
		res.end()
	}

}

module.exports = Profile