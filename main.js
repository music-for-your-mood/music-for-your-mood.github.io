function talkSizeChange() {
	const talk = document.querySelector(".talkBox");
	if (talk.style.height == "100%"){
		talk.style.height = "50px";
	}
	else {
		talk.style.height = "100%";
	}
}
