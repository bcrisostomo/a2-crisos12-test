/*POST */
function convertToJson(data){
    console.log("hey im here");
    for (var i = 0; i < data.length; i++){
        if (data[i]['value'] != '') {
            jsonFormat[data[i]['name']] = data[i]['value'];
        }
    }
}

$("#form").submit(function (e) {
    e.preventDefault();
    //var formJSON = convertToJson($('#form').serializeArray());
    var formJSON = objectifyForm($('#form').serializeArray());
    $.ajax({
        url: "/user",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(formJSON),

        success: function (result) {
            document.write(result);
        },
        error: function (err) {
           document.write(err.responseText);
        }
    });
});


/*GET*/
$('body').on('click', 'button.get-btn', function () {
    location.reload();
    var data = $('input[name="userid"]').val();

    if(data == undefined){
        var url = '/user' + $(this).val();
    } else{
        var url = '/user?id=' + $(this).val();
    }

    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: data,
        success: function (ret) {
            document.write(ret);
        },
        error: function (err) {
            document.write(err.responseText);
        }
    });
}); 
