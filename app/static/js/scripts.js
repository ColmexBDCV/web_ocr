$(document).ready(function() {

    if (getUrlParameter("file") != undefined){

        $("#pdf").attr("href", "download/"+getUrlParameter("file")+".pdf").text("Descargar "+getUrlParameter("file")+".pdf")
        $("#txt").attr("href", "download/"+getUrlParameter("file")+".txt").text("Descargar "+getUrlParameter("file")+".txt")


        $.ajax({
            url:'check/'+getUrlParameter("file")+".pdf",
            type:'HEAD',
            error: function()
            {
                $("#pdf").hide()
            },
            success: function()
            {
                
                $("#pdf").show()
                
            }
        });   
        
        $.ajax({
            url:'check/'+getUrlParameter("file")+".txt",
            type:'HEAD',
            error: function()
            {
              
               $("#txt").hide()
            },
            success: function()
            {
                $("#txt").show()
            }
        });
    }
    
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