$(document).ready(function() {

    if (getUrlParameter("file") != undefined){

        $("#download").attr("href", "download/"+getUrlParameter("file")).text("Descargar "+getUrlParameter("file"))

        $.ajax({
            url:'check/'+getUrlParameter("file"),
            type:'HEAD',
            error: function()
            {
               $("#download").hide()
            },
            success: function()
            {
                $("#download").show()
            }
        });    
    }

    $("#download").click(function (){ 
        $("#download").hide()
    })

    $("#my_form").submit(function(e) {
        alert("El proceso puede tardar varios minutos, por favor sea paciente")
        $("#load_logo").addClass("se-pre-con");
    });

    $("#fileupload").change( function () {
        $("#labelupload").text($("#fileupload")[0].files[0].name)
    });
        

});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};