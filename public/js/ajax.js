
function idol(){
	$.ajax({
			url: 'http://localhost:3001/v1/idol',
		  	method: 'GET',
		  	dataType: 'json'
		})
		.done(data => {
    		console.log(data)
    		for(var i=0; i<data.idol.length; i++){
    			$('.idol-select').append(
    				'<option key='+data.idol[i].key+'>'+data.idol[i].name+'</option>'
    			)	
    		}
  		})
  		.fail(() =>{
    		alert( "error" );
  		})
}

function profile(value){
	$.ajax({
			url: 'http://localhost:3001/v1/profile?name='+value,
		  	method: 'GET',
		  	dataType: 'json'
		})
		.done(data => {
    		console.log(data)
    		$('.profile-textarea').val(JSON.stringify(data, null, 2))
  		})
  		.fail(() =>{
    		alert( "error" );
  		})
}

function event(){
	$('.idol-select').change(function() {
		$(".idol-select option:selected").each(function() {
		 	var key = $(this).attr('key')
		 	var value = $(this).val()
			console.log(key+' '+value)

			profile(value)
		})
	})

	$('.select-idol-p').click(function(){
		switch($(this).text()){
			case 'Profile':{
				console.log($(this).text())
				$('.profile-div').css('display', 'block')
				$('.song-div').css('display', 'none')
				$('.album-div').css('display', 'none')
				$('.mv-div').css('display', 'none')
				break
			}
			case 'Song':{
				console.log($(this).text())
				$('.profile-div').css('display', 'none')
				$('.song-div').css('display', 'block')
				$('.album-div').css('display', 'none')
				$('.mv-div').css('display', 'none')
				break
			}

			case 'Album':{
				console.log($(this).text())
				$('.profile-div').css('display', 'none')
				$('.song-div').css('display', 'none')
				$('.album-div').css('display', 'block')
				$('.mv-div').css('display', 'none')
				break
			}

			case 'Mv':{
				console.log($(this).text())
				$('.profile-div').css('display', 'none')
				$('.song-div').css('display', 'none')
				$('.album-div').css('display', 'none')
				$('.mv-div').css('display', 'block')
				break
			}
			default:{
				break
			}
		}
	})
}

function clear(){
	$('.profile-textarea').val('')
}

window.onload = function load(){
	$(document).ready(() =>{
		clear()
    	idol()
    	event()
	})
}