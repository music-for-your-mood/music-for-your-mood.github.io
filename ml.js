var vocab = null;
var model = null;
var vocabSize = 0;

function loadModel(path){
    model = tf.loadLayersModel(path);
}

function loadVocab(path){
    var fp = open(path, 'r');
    var fp_str = fp.read();

    vocab = JSON.parse(fp_str);
    vocabSize = Object.keys(vocab).length;

    fp.close();
}

function process(vocab, d){
	var data = [];
	var idx = 0;

	if (vocab == null){
    	loadVocab('vocab.json');
	}

	for(var i in d){
    	data.append(vocab[i]);
		idx++;
		if (idx == 155)
			break;
	}
    
	while (idx < 155){
		data.append(vocabSize + 1);
		idx++;
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
