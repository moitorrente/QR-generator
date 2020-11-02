const data = document.getElementById('dataText');
const url = document.getElementById('dataURL');
const phone = document.getElementById('dataPhone');
const SMSphone = document.getElementById('dataSMSPhone');
const SMSMessage = document.getElementById('dataSMSMessage');
const longitude = document.getElementById('dataGeoLongitude');
const latitude = document.getElementById('dataGeoLatitude');
const query = document.getElementById('dataGeoQuery');
const mail = document.getElementById('dataMail');
const name = document.getElementById('dataContactName');
const first = document.getElementById('dataContactFirst');
const second = document.getElementById('dataContactSecond');

const parsedData = document.getElementById('parsedData');
const correction = document.getElementById('correction');
const version = document.getElementById('version');
const maskNum = document.getElementById('maskNum');
const shape = document.getElementById('shape');
const mainColor = document.getElementById('mainColor');
const secondaryColor = document.getElementById('secondaryColor');
const size = document.getElementById('size');
const modeText = document.getElementById('modeText');
const correctionText = document.getElementById('correctionText');
const versionText = document.getElementById('versionText');
const maskText = document.getElementById('maskText');
const inputText = document.getElementById('inputText');
const fileExtension = document.getElementById('fileDownloadExtension');
const fileName = document.getElementById('fileDownloadName');
const downloadButton = document.getElementById('downloadButton');

let tablinkGroup = document.getElementById("tablinkGroup");

let inputType = 'text';

data.addEventListener('input', inputUpdate);
url.addEventListener('input', inputUpdate);
phone.addEventListener('input', inputUpdate);
SMSphone.addEventListener('input', inputUpdate);
SMSMessage.addEventListener('input', inputUpdate);
longitude.addEventListener('input', inputUpdate);
latitude.addEventListener('input', inputUpdate);
query.addEventListener('input', inputUpdate);
mail.addEventListener('input', inputUpdate);
name.addEventListener('input', inputUpdate);
first.addEventListener('input', inputUpdate);
second.addEventListener('input', inputUpdate);

correction.addEventListener('input', inputUpdate);
version.addEventListener('input', inputUpdate);
maskNum.addEventListener('input', inputUpdate);
shape.addEventListener('input', shapeUpdate);
mainColor.addEventListener('input', colorUpdate);
secondaryColor.addEventListener('input', colorUpdate);
size.addEventListener('input', inputUpdate);


const tabContent = document.getElementsByClassName("tabContent");

for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
}
document.getElementById('containerText').style.display = 'flex';


tablinkGroup.addEventListener('change', openInput)


let type = 'text';
function openInput() {
    const tabContent = document.getElementsByClassName("tabContent");

    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    let active;

    switch (this.value) {
        case 'Texto':
            active = 'containerText';
            type = 'text';
            break;
        case 'URL':
            active = 'containerURL';
            type = 'url';
            break;
        case 'SMS':
            active = 'containerSMS';
            type = 'sms'
            break;
        case 'Teléfono':
            active = 'containerPhone';
            type = 'phone';
            break;
        case 'Geo':
            active = 'containerGeo';
            type = 'geo'
            break;
        case 'Mail':
            active = 'containerMail';
            type = 'mail';
            break;
        case 'Contacto':
            active = 'containerContact';
            type = 'contact';
            break;
    }

    document.getElementById(active).style.display = 'flex';
}



function inputUpdate() {
    const input = getInput(type);
    console.log(input)
    const parser = new Parser(input.type);
    const parsedMessage = parser.parseInput(input);
    parsedData.innerHTML = parsedMessage;
    const message = new Message(parsedMessage, version.value, correction.value);
    message.buildMessage();
    const mask = place(message, version.value, shape.value, mainColor.value, secondaryColor.value, size.value, maskNum.value);
    modeText.innerHTML = 'Modo: ' + message.modeDescription;
    correctionText.innerHTML = 'Corrección: ' + message.correction;
    versionText.innerHTML = 'Versión: ' + message.version;
    maskText.innerHTML = 'Máscara: ' + mask;
    data.maxLength = parser.determineMaxChars(message.version, message.correction, message.modeDescription);
    inputText.innerHTML = 'Datos a convertir <br> ' + parser.visibleLength + '/' + data.maxLength;
}


function shapeUpdate(){
    updateShape(shape.value)
}

function colorUpdate(){
    updateColor(mainColor.value, secondaryColor.value)
}

downloadButton.addEventListener('click', donwloadQR)

function donwloadQR() {
    saveCanvas(fileName.value, fileExtension.options[fileExtension.value].innerText);
}

const inputTypes = ['text', 'url', 'sms', 'phone', 'geo', 'mail', 'contact'];


function getInput(active) {
    let input = {
        type: active
    };
    switch (active) {
        case 'text':
            input.text = document.getElementById('dataText').value;
            break;
        case 'url':
            input.url = document.getElementById('dataURL').value;
            break;
        case 'sms':
            input.phone = document.getElementById('dataSMSPhone').value;
            input.sms = document.getElementById('dataSMSMessage').value;
            break;
        case 'phone':
            input.phone = document.getElementById('dataPhone').value;
            break;
        case 'geo':
            input.latitude = document.getElementById('dataGeoLatitude').value;
            input.longitude = document.getElementById('dataGeoLongitude').value;
            input.query = document.getElementById('dataGeoQuery').value;
            break;
        case 'mail':
            input.mail = document.getElementById('dataMail').value;
            break;
        case 'contact':
            input.name = document.getElementById('dataContactName').value;
            input.first = document.getElementById('dataContactFirst').value;
            input.second = document.getElementById('dataContactSecond').value;
            break;
    }
    return input;
}