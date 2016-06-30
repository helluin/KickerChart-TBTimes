$("#Mason_Crosby").on("mouseover", function () {
    var dotID = "G2Mason Crosby";
    var thisDot = document.getElementById("chart-fgmgame").contentDocument.getElementById(dotID);
    console.log(thisDot);
    d3.select(thisDot).transition().duration(300).attr("r", " 20");

}).on("mouseout", function () {
    var dotID = "G2Mason Crosby";
    var thisDot = document.getElementById("chart-fgmgame").contentDocument.getElementById(dotID);
    console.log(thisDot);
    d3.select(thisDot).transition().duration(300).attr("r", " 5") ;


});