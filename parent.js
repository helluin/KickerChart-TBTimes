$("#Mason_Crosby").on("mouseover", function () {
    var dotID = "G2Mason Crosby";
    var thisDot = document.getElementById("chart-fgmgame").contentDocument.getElementById(dotID);
    d3.select(thisDot).transition().duration(300).attr("r", " 20").attr("stroke", "rgb(100,100,100)").attr("stroke-width", 1);
}).on("mouseout", function () {
    var dotID = "G2Mason Crosby";
    var thisDot = document.getElementById("chart-fgmgame").contentDocument.getElementById(dotID);
    d3.select(thisDot).transition().duration(300).attr("r", " 5").attr("stroke", "none").attr("stroke-width", 0);

});


$("#Caleb_Sturgis").on("mouseover", function () {
    var dotID = "G2Caleb Sturgis";
    console.log(dotID);
    var thisDot = document.getElementById("chart-fgmgame").contentDocument.getElementById(dotID);
    console.log("yy");
    d3.select(thisDot).transition().duration(300).attr("r", " 20").attr("stroke", "rgb(100,100,100)").attr("stroke-width", 1);

}).on("mouseout", function () {
    var dotID = "G2Caleb Sturgis";
    var thisDot = document.getElementById("chart-fgmgame").contentDocument.getElementById(dotID);

    d3.select(thisDot).transition().duration(300).attr("r", " 5").attr("stroke", "none").attr("stroke-width", 0);

});


$("#Jason_Hanson").on("mouseover", function () {
    var dotID = "G2Jason Hanson";
    var thisDot = document.getElementById("chart-fgmgame").contentDocument.getElementById(dotID);

    d3.select(thisDot).transition().duration(300).attr("r", " 20").attr("stroke", "rgb(100,100,100)").attr("stroke-width", 1);

}).on("mouseout", function () {
    var dotID = "G2Jason Hanson";
    var thisDot = document.getElementById("chart-fgmgame").contentDocument.getElementById(dotID);

    d3.select(thisDot).transition().duration(300).attr("r", " 5").attr("stroke", "none").attr("stroke-width", 0);

});


$("#Cairo_Santos").on("mouseover", function () {
    var dotID = "G1Cairo Santos";
    //console.log(dotID);
    var thisDot = document.getElementById("chart-avgfgdis").contentDocument.getElementById(dotID);

    d3.select(thisDot).transition().duration(300).attr("r", " 20").attr("stroke", "rgb(100,100,100)").attr("stroke-width", 1);

}).on("mouseout", function () {
    var dotID = "G1Cairo Santos";
    var thisDot = document.getElementById("chart-avgfgdis").contentDocument.getElementById(dotID);

    d3.select(thisDot).transition().duration(300).attr("r", " 5").attr("stroke", "none").attr("stroke-width", 0);

});


$("#Ryan_Succop").on("mouseover", function () {
    var dotID = "G1Ryan Succop";
    //console.log(dotID);
    var thisDot = document.getElementById("chart-avgfgdis").contentDocument.getElementById(dotID);

    d3.select(thisDot).transition().duration(300).attr("r", " 20").attr("stroke", "rgb(100,100,100)").attr("stroke-width", 1);

}).on("mouseout", function () {
    var dotID = "G1Ryan Succop";
    var thisDot = document.getElementById("chart-avgfgdis").contentDocument.getElementById(dotID);

    d3.select(thisDot).transition().duration(300).attr("r", " 5").attr("stroke", "none").attr("stroke-width", 0);

});


$("#Dan_Bailey").on("mouseover", function () {
    var dotID = "G3Dan Bailey";
    //console.log(dotID);
    var thisDot = document.getElementById("chart-fg").contentDocument.getElementById(dotID);

    d3.select(thisDot).transition().duration(300).attr("r", " 20").attr("stroke", "rgb(100,100,100)").attr("stroke-width", 1);

}).on("mouseout", function () {
    var dotID = "G3Dan Bailey";
    var thisDot = document.getElementById("chart-fg").contentDocument.getElementById(dotID);

    d3.select(thisDot).transition().duration(300).attr("r", " 5").attr("stroke", "none").attr("stroke-width", 0);

});