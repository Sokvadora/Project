/*function nameOrgVolna() {
  $.getJSON('company.json', function (data) {
    let output = "<h1>";
    for (let i in data.sportVolna) {
      output += data.sportVolna[i].nameOrg;
    }
    output += "</h1>";
    document.getElementById("nameOrgVolna").innerHTML = output;
  });
}
*/

function nameOrgVolna() {
  $.getJSON('company.json', function (data) {
     let output = "";
    for (let i in data.sportVolna) {
      
      output += data.sportVolna[i].nameOrg;
    }
    
    document.getElementById("nameOrgVolna").innerHTML = output;
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
  $.getJSON('company.json', function (data) {
    let output = "";
    for (let i in data.sportVolna) {
      output += data.sportVolna[i].priceOrg;
    }
    
    document.getElementById("priceOrgVolna").innerHTML = output;
  });
}

function contactsOrgVolna() {
  $.getJSON('company.json', function (data) {
    let output = "";

    for (let i in data.sportVolna) {
      output += "<b>" + "Адрес:" + "</b>" + data.sportVolna[i].adresOrg + "<br>" + "<br>" + "<b>" + "Метро:" + "</b>" + data.sportVolna[i].metroOrg +
        "<br>" + "<br>" + "<b>" + "Телефон:" + "</b>" + data.sportVolna[i].phoneOrg + "<br>" + "<br>" + "<b>" + "URL:" + "</b>" + data.sportVolna[i].urlOrg;
    }
    
    document.getElementById("contactsOrgVolna").innerHTML = output;
  });
}


function descriptionOrgVolna() {
  $.getJSON('company.json', function (data) {
    let output = "<p>";
    for (let i in data.sportVolna) {
      output += "<br>" + data.sportVolna[i].descriptionOrg;
    }
    output += "</p>";
    document.getElementById("descriptionOrgVolna").innerHTML = output;
  });
}


function cardOrgVolna() {
  $.getJSON('company.json', function (data) {
    let output = "";

    for (let i in data.sportVolna) {
      output +=  "Метро:"  + data.sportVolna[i].metroOrg +
        "<br>" + "<b>"  + data.sportVolna[i].priceOrg +"</b>";
    }
    
    document.getElementById("cardOrgVolna").innerHTML = output;
  });
}


/*----------------------------------------*/

function nameOrgartIso() {
  $.getJSON('company.json', function (data) {
    let output = "";
    for (let i in data.artIso) {
      output += data.artIso[i].nameOrg;
    }
    
    document.getElementById("nameOrgartIso").innerHTML = output;
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
  $.getJSON('company.json', function (data) {
    let output = "";
    for (let i in data.artIso) {
      output += data.artIso[i].priceOrg;
    }
   
    document.getElementById("priceOrgVolna").innerHTML = output;
  });
}

function contactsOrgartIso() {
  $.getJSON('company.json', function (data) {
    let output = "";

    for (let i in data.artIso) {
      output += "<b>" + "Адрес:" + "</b>" + data.artIso[i].adresOrg + "<br>" + "<br>" + "<b>" + "Метро:" + "</b>" + data.artIso[i].metroOrg +
        "<br>" + "<br>" + "<b>" + "Телефон:" + "</b>" + data.artIso[i].phoneOrg + "<br>" + "<br>" + "<b>" + "URL:" + "</b>" + data.artIso[i].urlOrg;
    }
    
    document.getElementById("contactsOrgartIso").innerHTML = output;
  });
}


function descriptionOrgartIso() {
  $.getJSON('company.json', function (data) {
    let output = "<p>";
    for (let i in data.sportartIso) {
      output += "<br>" + data.sportartIso[i].descriptionOrg;
    }
    output += "</p>";
    document.getElementById("descriptionOrgartIso").innerHTML = output;
  });
}


//ФУНКЦИЯ ПОИСКА 
function search() {
  {
    //поиск по ключу и метро
    $("#btn-search").click(function () {
      let letSearch = [];
      let carts = "";
      $('#IDsearch:text').val(function(){
          letSearch.push($(this).val())
           
      });
      $.ajax({
              url: "/search",
              contentType: "application/json",
              method: "POST",
              data: JSON.stringify({
                  searchM: letSearch
              }),
              success: function (sumSearch) {
                  $.each(sumSearch, function (index, search) {
                      //console.log(search);
                      carts += cart(search);
                  })    
              $(".orgs").empty();
              $(".orgs").append(carts);
              }
          })
  });
  }
}
/*---------------------------

function myFunction() {
  var x = document.getElementById("myCheck").checked;
  document.getElementById("demo").innerHTML = x;
}---------------------------*/