function PlayerViewModel(){
	var isPlaying = false;
	var snd = document.createElement('audio');
	snd.src = "Queen - Don't Stop Me Now (1994 Digital Remaster).mp3";
	snd.preload = "auto";
	
	var self = this;
	var audio_duration = Math.floor(snd.duration);
	
	// Data
	self.playText = ko.observable("Play!");
	self.stopText = "Stop!";
	self.loopText = ko.observable("Loop!");
	self.musicVolume = ko.observable(100);
	
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
	});
	
	//event listener to listen when audio has ended
	snd.addEventListener("ended", function(){
		$("#stopbut").click();
	});
	
	// Behaviours for buttons
	self.playMusic = function(){
		if(!isPlaying){
			self.playText("Pause!");
			isPlaying = true;
			snd.play();
		} else{
			self.playText("Play!");
			isPlaying = false;
			snd.pause();
		}
		timer();
	};
	self.stopMusic = function(){
		self.playText("Play!");
		isPlaying = false;
		snd.pause();
		snd.currentTime = 0;
	};
	self.loopMusic = function(){
		if(!snd.loop){
			self.loopText("Don't Loop!");
			snd.loop = true;
		} else{
			self.loopText("Loop!");
			snd.loop = false;
		}
	};
	
	// Behaviors for volume slider
	self.currentVolume = ko.computed(function(){
		var volume = self.musicVolume();
		snd.volume = volume / 100;
		return self.musicVolume() + "%";
	});
	/*
	// Behaviors for timer
	self.updateTimer = ko.computed(function(){
		var sec_curr = Math.floor(snd.currentTime);
		return Math.floor(sec_curr / 60) + ":" + zero_curr + (sec_curr % 60);
	});
	*/
	// Behaviors for progress bar
	/*
	self.clickProgressBar = ko.computed(function(data, e){
		var x_loc = e.pageX - this.offsetLeft;
		snd.currentTime = (x_loc / $(this).width()) * Math.floor(snd.duration);
		self.progressPosition();
	});
	*/
	self.changeCursorPointer = function(){
		document.body.style.cursor = "pointer";
	};
	self.changeCursorDefault = function(){
		document.body.style.cursor = "default";
	};
	
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
			var time_to_go = (sec_curr / snd.duration) * 100;
			$("progress").attr("value", time_to_go.toFixed(2));
		}, 1000);
	}
	
}

function start(){
	ko.applyBindings(new PlayerViewModel());
}

$(start);