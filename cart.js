$(document).ready(function () {

    // fetch cart

    let userid = localStorage.getItem('userid')

    let backendurl = "http://localhost:8000" 

    $.ajax({
        type: "get",
        url: `http://127.0.0.1:8000/fetchcart/${userid}`,
        dataType: "json",
        success: function (response) {

            // display total amount
            let total = 0;
            let qty = 0;

            $.map(response, function (each, index) {

                total += each.qty * each.food.price 
                qty += each.qty

                localStorage.setItem("amount", total)

                $("#totalprice").text(total)
                $("#totalitem").text(qty)


                // display cart data
                $("#cart").append(`
                    <div class="row-mb-3 d-flex">
                        <div class="col-md-3">
                            <img src="${backendurl+each.food.profile}" class="img-fluid food-img" alt="Item 1">
                            <h6>${each.food.name}</h6>
                        </div>
                        <div class="col-md-3">
                            <div class="quantity">
                                <button class="btn btn-danger btn-sm">-</button>
                                <input type="number" class="form-control" value="${each.qty}">
                                <button class="btn btn-danger btn-sm">+</button>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <p class="mb-0">${each.food.price}</p>
                        </div>
                        <div class="col-md-3">
                            <p class="mb-0">${each.qty * each.food.price}</p>
                        </div>
                    </div>
                `)
            });

        },
        error: function (error) {
            console.log(error);
        }
    });

});

// setting up paystack

$("#checkout").click(function () {
    payWithPaystack();  // Call the function to initiate the payment process.
})

function payWithPaystack() {
  
    let handler = PaystackPop.setup({
      key: 'pk_test_72869f871ae9127f408e4b82a9eadadd2d0dc706', // Replace with your public key
      email: "a@b.com",
      amount: localStorage.getItem('amount') * 100,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.');
      },
      callback: function(response){
        let message = 'Payment complete! Reference: ' + response.reference;
        alert(message);
      }
    });
  
    handler.openIframe();
}
  