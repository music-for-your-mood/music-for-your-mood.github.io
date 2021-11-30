var vocab = null;
var model = null;
var vocabSize = 0;

async function loadModel(){
    model = await tf.loadLayersModel('modeljs/model.json');
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
	console.log(pred[0].print());
	console.log(pred[1].print());
	var emotion = parseInt(pred[0].reshape([-1]).argMax());
	var sit = parseInt(pred[1].reshape([-1]).argMax());
	console.log(emotion);
	console.log(sit);
    return [emotion, sit];
}
