function nameOrgVolna() {
  $.getJSON('company.json', function(data) {
  let output="<h1>";
  for (let i in data.sportVolna) {
      output+=  data.sportVolna[i].nameOrg  ;
  }
  output+="</h1>";
  document.getElementById("nameOrgVolna").innerHTML=output;
});
}

/*
function  imgOrgVolna() {
  $.getJSON('company.json', function(data) {
  let output="<h1>";
  for (let i in data.sportVolna) {
      output+=  data.sportVolna[i].imgOrg ;
  }
  output+="</h1>";
  document.getElementById("imgOrgVolna").innerHTML=output;
});
}
*/

function priceOrgVolna() {
  $.getJSON('company.json', function(data) {
  let output="<h1>";
  for (let i in data.sportVolna) {
      output+=  data.sportVolna[i].priceOrg  ;
  }
  output+="</h1>";
  document.getElementById("priceOrgVolna").innerHTML=output;
});
}

function contactsOrgVolna() {
  $.getJSON('company.json', function(data) {
  let output="<h3>";
    
  for (let i in data.sportVolna) {
      output+= "<b>"+ "Адрес:"+ "</b>"+data.sportVolna[i].adresOrg + "<br>" +  "<br>" +"<b>"+ "Метро:"+ "</b>"+ data.sportVolna[i].metroOrg +
       "<br>" +   "<br>" + "<b>"+ "Телефон:"+ "</b>"+data.sportVolna[i].phoneOrg + "<br>"  + "<br>" +"<b>"+ "URL:"+ "</b>"+ data.sportVolna[i].urlOrg;
  }
  output+="</h3>";
  document.getElementById("contactsOrgVolna").innerHTML=output;
});
}


function descriptionOrgVolna() {
  $.getJSON('company.json', function(data) {
  let output="<p>";
  for (let i in data.sportVolna) {
      output+=  "<br>" + data.sportVolna[i].descriptionOrg  ;
  }
  output+="</p>";
  document.getElementById("descriptionOrgVolna").innerHTML=output;
});
}





/*----------------------------------------*/

function nameOrgartIso() {
  $.getJSON('company.json', function(data) {
  let output="<h1>";
  for (let i in data.artIso) {
      output+=  data.artIso[i].nameOrg  ;
  }
  output+="</h1>";
  document.getElementById("nameOrgartIso").innerHTML=output;
});
}

/*
function  imgOrgVolna() {
  $.getJSON('company.json', function(data) {
  let output="<h1>";
  for (let i in data.sportVolna) {
      output+=  data.sportVolna[i].imgOrg ;
  }
  output+="</h1>";
  document.getElementById("imgOrgVolna").innerHTML=output;
});
}
*/

function priceOrgartIso() {
  $.getJSON('company.json', function(data) {
  let output="<h1>";
  for (let i in data.artIso) {
      output+=  data.artIso[i].priceOrg  ;
  }
  output+="</h1>";
  document.getElementById("priceOrgVolna").innerHTML=output;
});
}

function contactsOrgartIso() {
  $.getJSON('company.json', function(data) {
  let output="<h3>";
    
  for (let i in data.artIso) {
      output+= "<b>"+ "Адрес:"+ "</b>"+data.artIso[i].adresOrg + "<br>" +  "<br>" +"<b>"+ "Метро:"+ "</b>"+ data.artIso[i].metroOrg +
       "<br>" +   "<br>" + "<b>"+ "Телефон:"+ "</b>"+data.artIso[i].phoneOrg + "<br>"  + "<br>" +"<b>"+ "URL:"+ "</b>"+ data.artIso[i].urlOrg;
  }
  output+="</h3>";
  document.getElementById("contactsOrgartIso").innerHTML=output;
});
}


function descriptionOrgartIso() {
  $.getJSON('company.json', function(data) {
  let output="<p>";
  for (let i in data.sportartIso) {
      output+=  "<br>" + data.sportartIso[i].descriptionOrg  ;
  }
  output+="</p>";
  document.getElementById("descriptionOrgartIso").innerHTML=output;
});
} 



function search() {
{window.onload = function() {
  var hs = document.querySelectorAll('.two  ul');
  
  document.querySelector('[autofocus]').oninput = function() {
      var search = document.querySelector('[autofocus]').value;
      var val = this.value;
      var regVal = new RegExp(val, 'i'); // регулярка, с учетом регистра
      [].forEach.call(hs, function(X) {
          X.innerHTML.search(regVal) < 0 ? (
                  X.parentNode.className = 'notfound'
               
              ) :
              (
                  X.parentNode.className = 'found'
                  
              );
      });
  }
  } 
 }
}

