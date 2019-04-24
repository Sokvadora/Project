function search() {


    let getorgs = [];
    let allVieworgs = [];


    function Getorgs1() {
        $.ajax({
            url: "/orgs",
            type: "GET",
            contentType: "application/json",
            success: function (orgs) {
                let carts = "";
                let vieworgs = 0;
                $.each(orgs, function (index, org) {
                    //записываем названия всех выводимых организаций в allVieworgs
                    allVieworgs[index] = org.title;
                });
                getorgs = orgs;
                Getorgs2();
            }
        });
    }

    // Получение всех организаций
    function Getorgs2() {
        let carts = "";
        let vieworgs = 0;
        let dontVieworgs = allVieworgs;
        while ((dontVieworgs.length > 0) && (vieworgs < 5)) {
            flag = 0;
            $.each(getorgs, function (index, org) {
                if (dontVieworgs[0] == org.title) {
                    // добавляем полученные элементы
                    carts += cart(org);
                    vieworgs++;
                    flag = 1;
                }
            })
            if (flag == 1) dontVieworgs.splice(0, 1);
        }
        $(".orgs").append(carts);
        $('#orgs-more').empty();

    }

    //поиск
    $("#btnSearch").click(function () {
        let letSearch1 = [];
        let letSearch2 = [];
        let letSearch3 = []; 
        let carts = "";

        $('#IDsearch:text').val(function () {

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
            success: function (sumSearch) {
                $.each(sumSearch, function (index, search) {
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
    let cart = function AllOrg(org) {
        return "<div class='col-md-4'>" +
            "<div class='cart fh5co-portfolio ' id='" + org._id + "'>" + 
            "<a class='name ' href='/org/" + org.name + "'>" +
            "<div class='portfolio-entry'>" +
            "<img src='/images/" + org.img + "' class='portfolio-entry'/>" +
            "<div class='desc'>" + "<p>" + org.description + "</p>" +
            "</div>" + "</div>" + "<h3 class='text-center'>" + org.name + "</h3>" +
            "</br> <p style='Margin-left: 30px'> Цена: " + org.price + "</br> URL: " + org.url + "</br> " + org.metro + "</p>" +
            "</div>" + "</div>" + "</a>" + "</div>";
    }
    Getorgs1()
}



function getMetro() {
    $('select#metroId').on('change', function () {
        $('input[name="metro"]').val(this.value);
    });

};


function getAge() {
    $('select#ageId').on('change', function () {
        $('input[name="age"]').val(this.value);
    });
};



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