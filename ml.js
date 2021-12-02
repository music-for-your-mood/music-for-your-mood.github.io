var vocab = null;
var model = null;
var vocabSize = 0;
var totalPredict = null; 

function loadModel(){
    model = tf.loadLayersModel('modeljs/model.json');
}

function loadVocab(){
    vocab = JSON.parse(vocabs);
    vocabSize = Object.keys(vocab).length;
}

function initialize(){
	loadVocab();
	loadModel();
}

function process(d){
	var data = new Array();
	var idx = 155 - d.length;

	while(idx > 0){
		data.push(vocabSize + 1);
		idx--;
	}

	for(var i in d){
		var chri = d.charAt(i);
		if (Object.keys(vocab).includes(chri))
    		data.push(vocab[chri]);
		else
			data.push(vocabSize);
	}
	
	var ret = tf.tensor(data);
	return tf.reshape(ret, [1,155]);
}

function run(raw_data){
    var data = process(raw_data);
	console.log(data.print());
    var pred = model.predict(data);
	if (totalPredict == null){
		totalPredict = pred[0].reshape([-1]);
	}
	else{
		totalPredict = totalPredict.add(pred[0].reshape([-1]));
	}
	console.log(pred[0].print());
	console.log(pred[1].print());
	var emotion = pred[0].reshape([-1]).argMax().dataSync();
	var sit = pred[1].reshape([-1]).argMax().dataSync();
	console.log(emotion);
	console.log(sit);
    return [emotion[0], sit[0]];
}

function totalEmotion(){
	return totalPredict.argMax().dataSync()[0];
}
