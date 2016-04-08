$(document).ready(function(){
	var isPlaying = false;
	var snd = document.createElement('audio');
	snd.preload = "auto";
	
	//event listener to listen for when audio data has loaded
	snd.addEventListener("loadeddata", function(){
		var sec_total = Math.floor(snd.duration);
		var zero_total = "";
		if((sec_total % 60) < 10){
			zero_total = "0";
		} else{
			zero_total = "";
		}
		$('#total_time').text("/" + Math.floor(sec_total / 60) + ":" + zero_total + (sec_total % 60));
		$('progress').attr('max', sec_total);
	});
	
	//event listener to listen when audio has ended
	snd.addEventListener('ended', function(){
		$('#play_audio').attr('value', 'Play!');
		isPlaying = false;
	});
	
	$('#play_audio').click(player);
	$('#stop_audio').click(stopper);
	$('#loop_audio').click(looper);
	$('#go').click(process);
	
	//event listeners to listen for volume bar events
	$('#vol').mousemove(volume_control);
	$('#vol').click(volume_control);
	$('#vol').on('swipemove', volume_control);
	
	//event listeners to listen for progress bar events
	$('progress').click(function(e){
		var x_loc = e.pageX - this.offsetLeft;
		snd.currentTime = (x_loc / $(this).width()) * Math.floor(snd.duration);
		timer();
	});
	$('progress').mouseenter(function(){
		document.body.style.cursor = "pointer";
	});
	$('progress').mouseleave(function(){
		document.body.style.cursor = "default";
	});
	
	$('.song_buttons').click(function(){
		if(isPlaying){
			stopper();
		}
	});
	$('#song1').click(function(){
		set_song('04 Back in the High Life.mp3', $(this).attr('value'));
	});
	$('#song2').click(function(){
		set_song('Heart - These Dreams.mp3', $(this).attr('value'));
	});
	$('#song3').click(function(){
		set_song('Kool & The Gang - Celebrate Good times.mp3', $(this).attr('value'));
	});
	$('#song4').click(function(){
		set_song("Queen - Don't Stop Me Now (1994 Digital Remaster).mp3", $(this).attr('value'));
	});
	$('#song5').click(function(){
		set_song("1-01 Child's Anthem.mp3", $(this).attr('value'));
	});
	
	//event listeners to listen for keypresses
	$(document).on('keypress', function(e){
		if(e.keyCode == 13 && ($('#position_grabber').val() !== "")){
			process();
		} else if(e.keyCode == 32){
			player();
		}
	});
	
	//function to set song
	function set_song(song_src, song_title){
		$('progress').attr('value', 0);
		snd.setAttribute('src', song_src);
		$('title').text(song_title);
		$('#vol').focus();
	}
	
	//function for loop button
	function looper(){
		if(!snd.loop){
			snd.loop = true;
			$('#loop_audio').attr('value', 'Don\'t Loop!');
		} else{
			snd.loop = false;
			$('#loop_audio').attr('value', 'Loop!');
		}
	}
	
	//function to control volume
	function volume_control(){
		var volume = $('#vol').val();
		snd.volume = volume / 100;
		$('#vol_num').text(volume + "%");
	}
	
	//function to play and pause + start timer
	function player(){
		if(!isPlaying){
			snd.play();
			isPlaying = true;
			$('#play_audio').attr('value', 'Pause!');
		}
		else{
			snd.pause();
			isPlaying = false;
			$('#play_audio').attr('value', 'Play!');
		}
		$('#note').text("");
		timer();
		$('#vol').val(snd.volume * 100);
		$('#vol').focus();
	}
	
	//function to stop audio
	function stopper(){
		if(isPlaying){
			$('#play_audio').attr('value', 'Play!');
			snd.pause();
			isPlaying = false;
		}
		snd.currentTime = 0;
		$('#note').text("");
		$('#vol').focus();
	}
	
	//function to play from given point in text box
	function process(){
		var time = $('#position_grabber').val();
				
		if($.isNumeric(time)){
			if(isPlaying){
				snd.pause();
			}
			snd.currentTime = time;
			snd.play();
			isPlaying = true;
			$('#play_audio').attr('value', 'Pause!');
			$('#position_grabber').val("");
			$('#note').text("Playing from " + time + " seconds!");
			$('#note').slideDown(1000, function(){
				$(this).delay(3000).slideUp(1000);
			});
			timer();
		
		} else{
			alert("Please key in a valid time!");
		}
	}
	
	//function to create a timer to update song progress
	function timer(){
		setInterval(function(){
			var sec_curr = Math.floor(snd.currentTime);
			var zero_curr = "";
			if((sec_curr % 60) < 10){
				zero_curr = "0";
			} else{
				zero_curr = "";
			}
			var current_time = Math.floor(sec_curr / 60) + ":" + zero_curr + (sec_curr % 60);
			$('#curr_time').text(current_time);
			$('progress').attr('value', sec_curr);
		}, 1000);
	}
	
});