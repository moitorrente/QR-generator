const data = document.getElementById("data");
const correction = document.getElementById("correction");
const version = document.getElementById("version");
const maskNum = document.getElementById("maskNum");
const shape = document.getElementById("shape");
const mainColor = document.getElementById("mainColor");
const size = document.getElementById("size");
const modeText = document.getElementById("modeText");
const correctionText = document.getElementById("correctionText");
const versionText = document.getElementById("versionText");
const maskText = document.getElementById("maskText");


data.addEventListener("input", inputUpdate);
correction.addEventListener("input", inputUpdate);
version.addEventListener("input", inputUpdate);
maskNum.addEventListener("input", inputUpdate);
shape.addEventListener("input", inputUpdate);
mainColor.addEventListener("input", inputUpdate);
size.addEventListener("input", inputUpdate);



function inputUpdate(){
    let encodedData = encode(data.value, version.value, correction.value, maskNum.value);
    place(encodedData, version.value, shape.value, mainColor.value, size.value);
    modeText.innerHTML = "Modo: " + encodedData.modeText;
    correctionText.innerHTML = "Corrección: " + encodedData.correction;
    versionText.innerHTML = "Versión: " + encodedData.version;
    maskText.innerHTML = "Máscara: " + encodedData.mask;
}

