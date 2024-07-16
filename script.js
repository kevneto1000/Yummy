$(document).ready(function () {

    // fetch all foods

    let backendurl = "http://localhost:8000" 

    $.ajax({
        type: "get",
        crossDomain: true,
        url: "http://127.0.0.1:8000/allfoods/",
        dataType: "json",
        success: function (response) {
            $.map(response, function (food, index) {
                $("#foods").append(`
                <div class="col-lg-4 menu-item">
                    <a href="${backendurl+food.profile}" class="glightbox"><img src="${backendurl+food.profile}" class="menu-img img-fluid" alt=""></a>
                    <h4>${food.name}</h4>
                    <p class="description">
                        ${food.description}
                    </p>
                    <p class="price">
                        ${food.price}
                    </p>
                    <button onclick="addToCart(${food.id})" class="btn btn-outline-danger">Add to Cart</button>
                </div>
                `);
            });
        },

        error: function (error) {
            console.log(error);
        }
    });
    
    // fetch cart

    let userid = localStorage.getItem('userid')

    $.ajax({
        type: "get",
        url: `http://127.0.0.1:8000/fetchcart/${userid}`,
        dataType: "json",
        success: function (response) {
            // total item in cart
            let total = 0;
            $.map(response, function(food, index){
                total += food.total
            })
            $("#total").text(total);
        },
        error: function (error) {
            console.log(error);
        }
    });
});

// signup

$("#signupform").submit(function(e){

    e.preventDefault();

    let form = new FormData(e.currentTarget)
    
    $.ajax({
        type: "post",
        url: "http://localhost:8000/signup/",
        data: form,
        dataType: "json",
        processData: false,
        cache: false, 
        contentType: false,
        success: function (response) {
            alert("Signup successful")
            window.location.href = "./login.html"
        },

        error: function (error) {
            $.map(error.responseJSON, function (e, index){
                alert(index + ": " + e)
            });
        }
    });

});

// login

$("#loginform").submit(function(e){

    e.preventDefault();

    let form = new FormData(e.currentTarget)
    
    $.ajax({
        type: "post",
        url: "http://localhost:8000/login/",
        data: form,
        dataType: "json",
        processData: false,
        cache: false,
        contentType: false,
        success: function (response) {
            localStorage.setItem("userid", response);
            localStorage.setItem("login", true);
            // alert("Login successful")
            window.location.href = "./index.html";
        },
        error: function (error) {
            alert(error.responseJSON)
        }
    });

})

// adding food to cart

function addToCart(id) {

    // let foodid = localStorage.getItem("foodid")
    let userid = localStorage.getItem("userid")

    if(userid == null) {
        window.location.href = "/login.html"
    }else{
        $.ajax({
            type: "get",
            url: `http://localhost:8000/addtocart/${userid}/${id}`,
            dataType: "json",
            processData: false,
            cache: false,
            contentType: false,
            success: function (response) {
                alert("Food added to cart")
                window.location.reload()
            },
            error: function (error) {
                alert(error.responseJSON)
            }
        });
    }

}