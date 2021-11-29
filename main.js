var name = "";
var cnvs = 0;

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

function makecnvs(usrMsg){
	var ret = "";

	if (cnvs == 0) {
		name = usrMsg.trim();
		ret = "반가워요, " + name + " 님.";
	}
	else if (cnvs == 1) {
		ret = name + " 님, 오늘 하루는 어땠나요?";
	}
	else if (cnvs == 2) {
		var pred = run(usrMsg.trim());
		ret = "오늘 하루는 힘들었군요. 수고 많으셨어요.";
	}
	else if (cnvs == 3) {
		ret = name + " 님, 요즘 관심있는 일이 있나요?";
	}
	else if (cnvs == 4) {
		var pred = run(usrMsg.trim());
		ret = "그렇군요.";
	}
	else if (cnvs == 5) {
		ret = name + " 님, 요즘 고민이 있나요?";
	}
	else if (cnvs == 6) {
		var pred = run(usrMsg,trim());
		ret = "그렇군요.";
	}
	else if (cnvs == 7) {
		ret = name + " 님을 위해 추천하는 음악은 이거예요.";
	}
	else {
		cnvs = 0;
		ret = "다시 대화할까요?"
	}

	cnvs += 1;

	return ret;
}

function ansMsg(usrMsg){
	var ans = makecnvs(usrMsg);
	
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
	ansMsg(msg);
}

function enterCheck(e){
	if (e.key == "Enter" || e.keyCode == 13){
		sendMsg();
	}
}
