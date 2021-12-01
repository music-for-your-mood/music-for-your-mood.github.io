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

function makeEmo(pred){
	var str = "";
	
	if (pred == 0){
		str = "정말 화가 나시겠어요.";
	}
	else if (pred == 1){
		str = "정말 슬프겠어요. 기운내세요.";
	}
	else if (pred == 2){
		str = "불안하시군요. 다 괜찮으실 거예요.";
	}
	else if (pred == 3){
		str = "그렇군요. 안타까운 일이에요.";
	}
	else if (pred == 4){
		str = "그럴 수도 있죠. 괜찮을 거예요.";
	}
	else if (pred == 5){
		str = "정말 기쁜 일이에요. 축하드려요.";
	}
	else{
		str = "그렇군요."
	}

	return str;
}

function chooseMusic(){
	var totalEmo = totalEmotion();
	var ret = "";
	var address = "";
	var color = "";

	if (totalEmo == 0){
		ret = "Taylor Swift - Look What You Made Me Do";
		address = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube-nocookie.com/embed/3tmd-ClpJxA\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
		color = "#885555";
	}
	else if (totalEmo == 1){
		ret = "Hoshino Gen - Fushigi";
		address = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube-nocookie.com/embed/ilnLczvLGAY\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
		color = "#555566";
	}
	else if (totalEmo == 2){	
		ret = "Amazarashi - Namae";
		address = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube-nocookie.com/embed/5S4GLqTcQSs\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
		color = "#557788";
	}
	else if (totalEmo == 3){
		ret = "Linkin Park - One More Light";
		address = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube-nocookie.com/embed/Tm8LGxTLtQk\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
		color = "#665566";
	}
	else if (totalEmo == 4){
		ret = "나이트오프 - 잠";
		address = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube-nocookie.com/embed/x-k8gL_r__U\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";	
		color = "#778855";
	}
	else if (totalEmo == 5){
		ret = "Cheat Codes X Sofia Reyes X Willy William - Highway";
		address = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube-nocookie.com/embed/a37wb3jG6rA\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
		color = "#88BBCC";
	}
	
	var title = document.querySelector('.musicTitle');
	var video = document.querySelector('.musicBox');
	document.querySelector('body').style.backgroundColor = color;

	title.innerHTML = ret;
	video.innerHTML = address;	
	return ret;
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
		ret = makeEmo(pred[0]);
	}
	else if (cnvs == 3) {
		ret = name + " 님, 요즘 관심있는 일이 있나요?";
	}
	else if (cnvs == 4) {
		var pred = run(usrMsg.trim());
		ret = makeEmo(pred[0]);
	}
	else if (cnvs == 5) {
		ret = name + " 님, 요즘 고민이 있나요?";
	}
	else if (cnvs == 6) {
		var pred = run(usrMsg.trim());
		ret = makeEmo(pred[0]);
	}
	else if (cnvs == 7) {
		var recommend = chooseMusic();
		ret = name + " 님을 위해 추천하는 음악은 " + recommend + "이에요.";
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
