class Idol{

	get(firebaseapp, req, res){
		var idol = []
		var size = 0
		var ref = firebaseapp.database().ref('/')
		//root
		ref.once('value', snap =>{
			//each child of root
			snap.forEach(child =>{
				idol.push({
					key: child.key,
					name: child.val().name
				})
				//load done
				size++
				if(snap.numChildren() == size){
					res.json({
						idol: idol
					})
					res.end()
					console.log({
						idol: idol
					})
				}
			})
		})

	}

}

module.exports = Idol