

var el = x => document.getElementById(x);
// function classifying(){  // on click of analze btn --> function is triggered
//
//     el('classify-button').innerHTML = 'Classify ...';
//     console.log("********** classify....  *******");
//
//     var xhr = new XMLHttpRequest();
//     var loc = window.location;
//     xhr.open('POST', `${loc.protocol}//${loc.hostname}:${loc.port}/classify`, true); // go to " /analyze "
//
//     xhr.onerror = function() {
//       alert (xhr.responseText);
//       return;
//     }
//
//     xhr.onload = function(e) {
//         if (this.readyState === 4) {
//       			console.log(e);
//             el('classify-button').innerHTML = 'Classify';
//       }
//     }
// }

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("classify-button").addEventListener('click',function ()
    {

     el('classify-button').innerHTML = 'Classifying ...'; /// ---2
     console.log("********** classify....  *******"); //// ----3
     //XMLHttpRequest
     var xhr = new XMLHttpRequest();
     var loc = window.location;
     xhr.open('POST', `${loc.protocol}//${loc.hostname}:${loc.port}/classify`, true); // go to " /classify "
     xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
     xhr.send("FirstName=Chris&LastName=Minnick");

     xhr.onreadystatechange = function() {
       if (this.readyState == 4)
         console.log(xhr.responseText); /// ----4
         el('classify-button').innerHTML = 'Classify'; /// ---2

     };


    }  );
});

function showPicker(inputId) { el('file-input').click(); }

function showPicked(input) {    //  takes a file as input (image file ! )
    el('upload-label').innerHTML = input.files[0].name;
    var reader = new FileReader();
    reader.onload = function (e) {
        el('image-picked').src = e.target.result;
        el('image-picked').className = '';
    }
    reader.readAsDataURL(input.files[0]);
}

function analyze() {  // on click of analze btn --> function is triggered
    var uploadFiles = el('file-input').files;
    if (uploadFiles.length != 1){
       alert('Please select 1 file to analyze!');
       return;
    }
    el('analyze-button').innerHTML = 'Analyzing...';
    console.log("analyzing....");

    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open('POST', `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`, true); // go to " /analyze "

    xhr.onerror = function() {
      alert (xhr.responseText);
      return;
    };

    xhr.onload = function(e) {
        if (this.readyState === 4) {
          var response = JSON.parse(e.target.responseText);
      			console.log(response);
      			console.log(response.result);
      			//console.log(response.conf);
      			// console.log(e.target.responseText);
            var arr1 = [];
            str1 = response.conf;

            myArray = str1.split(',');
            myArray.forEach(function(element) {
          	  x= parseFloat(element);
              y=Number((x).toFixed(6));
              arr1.push(y);
        	    console.log(y);
            });
            console.log('\n array = ');
            console.log(arr1);

            el('result-label').innerHTML = `Result = ${response['result']}`;
      			el('akiec-label').innerHTML =  "Actinic keratoses and intraepithelial carcinoma (Akiec) : "+arr1[0];
            el('bcc-label').innerHTML   =  "Basal cell carcinoma (BCC) : " +arr1[1];
            el('bkl-label').innerHTML   =   "Benign keratosis-like lesions (BKL) : " + arr1[2];
            el('df-label').innerHTML    =   "Dermatofibroma (DF) : " +arr1[3];
            el('mel-label').innerHTML   =   "Melanoma (Mel) : " +arr1[4];
            el('nv-label').innerHTML    =   "Melanocytic nevi (nv) : " +arr1[5];
            el('vasc-label').innerHTML  =   "Vascular lesions (Vasc) : " +arr1[6];
          }
        el('analyze-button').innerHTML = 'Analyze';

    }

      var fileData = new FormData();
      fileData.append('file', uploadFiles[0]);
      xhr.send(fileData);

}

// classes = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc']
//
//
