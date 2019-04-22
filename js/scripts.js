function search() {

    let getOrgs = [];
    let allViewOrgs = [];

    function getOrgs1() {
        $.ajax({
            url: "/orgs",
            type: "GET",
            contentType: "application/json",
            success: (orgs) => {
                // let carts = "";
                // let viewOrgs = 0;
                $.each(orgs, (index, org) => {
                    //записываем названия всех выводимых организаций в allViewOrgs
                    allViewOrgs[index] = org.title;
                });
                getOrgs = orgs;
                getOrgs2();
            }
        });
    }

    // Получение всех организаций
    function getOrgs2() {
        let carts = "";
        let viewOrgs = 0;
        let dontViewOrgs = allViewOrgs;
        while ((dontViewOrgs.length > 0) && (viewOrgs < 5)) {
            flag = 0;
            $.each(getOrgs, (index, org) => {
                if (dontViewOrgs[0] == org.title) {
                    // добавляем полученные элементы
                    carts += cart(org);
                    viewOrgs++;
                    flag = 1;
                }
            })
            if (flag == 1) dontViewOrgs.splice(0, 1);
        }
        $(".orgs").append(carts);
 

    }

    //---------------------------------------------------------- /////////////////поиск
    $(".btnSearch").click(function () {

        let letSearch1 = [];
        let letSearch2 = [];
        let letSearch3 = []; /////////////////////////////////////////////
        let carts = "";

        //doStuff(document.querySelectorAll("#IDsearch, #IDsearchGlobal"));

        $('.IDsearch1:text ').val(function () {

            let str = $(this).val()
            let res = str.toLowerCase() //перевести введенное значение в нижний регистр
            letSearch1.push(res)

        });


        $('#IDsearch2:text').val(function () {
            letSearch2.push($(this).val())
        });
        ///////////////////////////////////////////////////////
        $('#IDsearch3:text').val(function () {
            letSearch3.push($(this).val())
        });

        $.ajax({
            url: "/search",
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify({
                search1: letSearch1,
                search2: letSearch2,
                search3: letSearch3 ///////////////
            }),
            success: (sumSearch) => {
                $.each(sumSearch, (index, search) => {
                    //console.log("button was clicked");
                    console.log(search);
                    carts += cart(search);

                })

                $(".orgs").empty();
                $(".orgs").append(carts);
 
                
                $(".cart:hidden").slice(0, 6).show();
            }

        })

    });  

    // вывод организаций
    let cart = (org) => {
        return "<div class='col-md-4'>" +
            "<div class='cart fh5co-portfolio ' id='" + org._id + "'>" +
            "<a class='name ' href='/org/" + org.name + "'>" +
            "<div class='portfolio-entry'>" +
            "<img src='/images/" + org.img + "' class='portfolio-entry'/>" +
            "<div class='desc'>" + "<p>" + org.description + "</p>" +
            "</div>" + "</div>" + "<div class='portfolio-text text-center'>" +  "<h3>" + org.name + "</h3>" + "</div>"+
            "</br> Цена: " + org.price + "</br> URL: " + org.url + "</br> " + org.metro + "</p>" +
            "</div>" + "</div>" + "</a>" + "</div>";
    }
    getOrgs1()
}



$(function showSportCarts() {

    $("#loadsportCarts").on('click', (e) => {
        e.preventDefault();
        $("div.sportCarts:hidden").slideDown(); //показать карточки Спорт
        $("div.allCarts").slideUp(); // скрыть карточки категорий
    })
});

$(function backFromSport() {

    $("#backFromSport").on('click', (e) => {
        e.preventDefault();
        $("div.allCarts").slideDown();
        $("div.sportCarts").slideUp();
    })
});









