var fs = require('fs');
var fileName = "pets.jpg";

//Convertendo binario em arquivo
function base64_decode(base64str, fileName) {
    var bitmap = new Buffer.from(base64str, 'base64');
    fs.writeFileSync('./imagem/' + fileName + '', bitmap, 'binary', function(err) {
        if (err) {
            console.log('Conversao com erro');
        }
    });
}

//Convertendo arquivo em binário
function base64_encode(fileName) {
    var bitmap = fs.readFileSync('./imagem/' + fileName + '');
    return new Buffer.from(bitmap).toString('base64');
}

console.log(base64_encode(fileName))