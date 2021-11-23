function talkSizeChange() {
	const talk = document.querySelector(".talkBox");
	const msgViewer = document.querySelector(".msgViewer");
	if (talk.style.height == "100%"){
		talk.style.height = "5%";
		msgViewer.scrollTop = msgViewer.scrollHeight;
	}
	else {
		talk.style.height = "100%";
	}
}

function ansMsg(usrMsg){
	var ans = "aaa";
	
	document.querySelector(".msgViewer").innerHTML =
				document.querySelector(".msgViewer").innerHTML
				+ "<div class=\"msgService\">" + ans + "</div>";
	document.querySelector(".msgViewer").scrollTop = document.querySelector(".msgViewer").scrollHeight;
}

function sendMsg(){
	var msg = document.querySelector(".inputBody").value;
	
	if (msg.length == 0)
		return;
	document.querySelector(".msgViewer").innerHTML = 
				document.querySelector(".msgViewer").innerHTML
				+ "<div class=\"msgUser\">" + msg + "</div>";
	document.querySelector(".inputBody").value = "";
	document.querySelector(".msgViewer").scrollTop = document.querySelector(".msgViewer").scrollHeight;
	ansMsg(msg);
}

function enterCheck(e){
	if (e.key == "Enter" || e.keyCode == 13){
		sendMsg();
	}
}
