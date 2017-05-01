  $(document).ready(function() {
        $('.modal').show();
        $('.register').hide();
    })

    $('#login-reg-btn').on('click' , function () {
        $('.modal').show();
    })

    $('#savebtn').on('click', function() {
        $('.modal').hide();
    })


    $('#signUpbtn').on('click', function() {
        $('.login').hide();
        $('.register').show();
    })

    $('.delete').on('click', function() {
         $('.modal').hide();
    })