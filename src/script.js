const data = document.getElementById('data');
const correction = document.getElementById('correction');
const version = document.getElementById('version');
const maskNum = document.getElementById('maskNum');
const shape = document.getElementById('shape');
const mainColor = document.getElementById('mainColor');
const size = document.getElementById('size');
const modeText = document.getElementById('modeText');
const correctionText = document.getElementById('correctionText');
const versionText = document.getElementById('versionText');
const maskText = document.getElementById('maskText');
const inputChars = document.getElementById('inputChars');
const fileExtension = document.getElementById('fileDownloadExtension');
const fileName = document.getElementById('fileDownloadName');
const downloadButton = document.getElementById('downloadButton');

data.addEventListener('input', inputUpdate);
correction.addEventListener('input', inputUpdate);
version.addEventListener('input', inputUpdate);
maskNum.addEventListener('input', inputUpdate);
shape.addEventListener('input', inputUpdate);
mainColor.addEventListener('input', inputUpdate);
size.addEventListener('input', inputUpdate);

downloadButton.addEventListener('click', donwloadQR)


function inputUpdate() {
    let message = new Message(data.value, version.value, correction.value);
    message.buildMessage();
    
    let mask = place(message, version.value, shape.value, mainColor.value, size.value, maskNum.value);
    modeText.innerHTML = 'Modo: ' + message.modeDescription;
    correctionText.innerHTML = 'Corrección: ' + message.correction;
    versionText.innerHTML = 'Versión: ' + message.version;
    maskText.innerHTML = 'Máscara: ' + mask;
    let maxChars = determineMaxChars(message.version, message.correction, message.modeDescription);
    data.maxLength = maxChars
    inputChars.innerHTML = 'Datos a convertir <br> ' + determineChars(message.original) + '/' + maxChars;
}

function determineChars(text) {
    return text.length;
}

function determineMaxChars(version, correction, mode) {
    return CAPACITIES[version][correction][mode];
}

function donwloadQR(){
    saveCanvas(fileName.value, fileExtension.options[fileExtension.value].innerText);
}
