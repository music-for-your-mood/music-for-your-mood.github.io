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

   if (vocab == null){
       loadVocab('vocab.json');
   }

   for(var i in d){
        data.append(vocab(i));
   }

   return tf.oneHot(data, vocabSize);
}

function run(model, raw_data){
    var data = process(raw_data);

    if (model == null){
        loadModel('');
    }
    var pred = model.predict(data);

    return pred;
}