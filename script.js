const data = document.getElementById('data');

data.addEventListener("input", inputUpdate)


function inputUpdate(){
    let encodedData = encode(data.value);

    place(encodedData.data);
}