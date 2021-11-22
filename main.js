function talkSizeChange() {
	const talk = document.querySelector(".talkBox");
	const talkbtn = document.querySelector(".talkBtn");
	if (talk.style.height == "100%"){
		talk.style.height = "10%";
		talkbtn.style.height = "100%";
	}
	else {
		talk.style.height = "100%";
		talkbtn.style.height = "10%";
	}
}
