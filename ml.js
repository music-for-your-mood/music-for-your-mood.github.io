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
		if (i in vocab)
    		data.push(vocab[i]);
		else
			data.push(vocabSize);
	}
	
	var ret = tf.tensor(data);
	return tf.reshape(ret, [1,155]);
}

function run(raw_data){
    var data = process(raw_data);
	console.log(data);
    var pred = model.predict(data);
	var emotion = pred[0].reshape([-1]).argMax();
	var sit = pred[1].reshape([-1]).argMax();

    return [emotion, sit];
}
