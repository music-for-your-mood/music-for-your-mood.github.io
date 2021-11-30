var vocab = null;
var model = null;
var vocabSize = 0;

function loadModel(path){
    model = tf.loadLayersModel(path);
}

function loadVocab(path){
    let vocab = JSON.parse(vocabs);
    vocabSize = Object.keys(vocab).length;
}

function process(d){
	var data = [];
	var idx = 155 - d.length;

	if (vocab == null){
    	loadVocab('vocab.json');
	}

	while(idx > 0){
		data.append(vocabSize + 1);
		idx--;
	}

	for(var i in d){
    	data.append(vocab[i]);
		idx++;
		if (idx == 155)
			break;
	}
	
	var ret = tf.convert_to_tensor(data);
	return tf.reshape(ret, [1,155]);
}

function run(raw_data){
    var data = process(raw_data);

    if (model == null){
        loadModel('./modeljs/model.json');
    }
    var pred = model.predict(data);
	
    return pred;
}
