var pymChild = null;
var graphics_aspect_width = 4;
var graphics_aspect_height = 3;
var mobile_threshold = 500;
var $graphic = $("#iframeContainer");

function drawCharts(container_width) {
    $('svg').remove();
    if (container_width == undefined || isNaN(container_width)) {
        container_width = 600;
    }
    var margin = {
            top: 20
            , right: 20
            , bottom: 60
            , left: 80
        }
        , padding = 20
        , width = container_width - margin.left - margin.right
        , height = Math.ceil((width * graphics_aspect_height) / graphics_aspect_width) - margin.top - margin.bottom;



    //ToolTip 
    var toolTip = d3.select(document.getElementById("toolTip"));
    var playerName = d3.select(document.getElementById("PlayerName"));
    var playerTeams = d3.select(document.getElementById("Teams"));
    var playerStats = d3.select(document.getElementById("Stats"));
    var winPercentage = d3.select(document.getElementById("WinPercentage"));



    d3.json("kicker06-15.json", function (data) {


        var chartOne = d3.select("#iframeContainer").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("overflow", "visible")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



        // setup x
        var xValue = function (d) {
                ////console.log(d);
                return d.avgFgDistance;
            }
            , xScale = d3.scale.linear().range([0, width])
            , xMap = function (d) {
                return xScale(xValue(d));
            }
            , xAxis = d3.svg.axis().scale(xScale).outerTickSize(0).orient("bottom").ticks(5);
        // setup y
        var yValue = function (d) {
                ////console.log(d);
                return d.win;
            }
            , yScale = d3.scale.linear().range([height, 0])
            , yMap = function (d) {
                return yScale(yValue(d));
            }
            , formatyAxis = d3.format(".03g")
            , yAxis = d3.svg.axis().scale(yScale).orient("left").outerTickSize(0).tickFormat(formatyAxis).ticks(4);


        xScale.domain([d3.min(data, xValue) - 0.2, d3.max(data, xValue) + 1]);
          yScale.domain([0.001, 0.800]);
        // x-axis
        chartOne.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .style("text-anchor", "middle")
            // .style("font-family", "HelveticaNeue-CondensedBold")
            .attr("transform", "translate(" + width / 2 + ", 45)") // text is drawn off the screen top left, move down and out and rotate
            .text("Field goal distance");
        // y-axis
        chartOne.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate(-55" + "," + (height / 2) + ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
            .text("Win percentage");
        //draw dots
        chartOne.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("id", function (d, i) {
                return "G-ONE" + i;
            })
            .attr("r", function (d) {
                return 5;
            })
            .style("fill", function (d, i) {

                return "rgba(200,20,50,0.4)";
            })
            .attr("cx", xMap)
            .attr("cy", yMap)
            .on("mouseover", function (d, i) {


                var thisID = "G-ONE" + i;
                dotHighlight(d, i, thisID, this);
                showTooltip(d, i, thisID, this);






                //                var toolTipCrossOver_1 = parent.document.getElementById("chart-fgmgame").contentDocument.getElementById("toolTip");
                //                var toolTipCrossOver_2 = parent.document.getElementById("chart-fg").contentDocument.getElementById("toolTip");
                //                //console.log(toolTipCrossOver_1);
                //                d3.select(toolTipCrossOver_1).transition().duration(200)
                //                    .style("opacity", 1)
                //                    .style('position', 'absolute')
                //                    .style('left', toolTipLocator("x"))
                //                    .style('top', toolTipLocator("y"))
                //                    .style("width", "auto")
                //                    .style("height", "auto");
                //                d3.select(toolTipCrossOver_2).transition().duration(200)
                //                    .style("opacity", 1)
                //                    .style('position', 'absolute')
                //                    .style('left', toolTipLocator("x"))
                //                    .style('top', toolTipLocator("y"))
                //                    .style("width", "auto")
                //                    .style("height", "auto");

                //    d3.select linkFrame_2.getElementById("")


            })
            .on("mouseout", function (d, i) {
                var thisID = "G-ONE" + i;
                dotShrink(d, i, thisID, this);

                toolTip.transition().duration(400)
                    .style('opacity', 0);

            })


        //Trend Line
        //        var xSeries = data.map(function (d) {
        //            return parseFloat(d['avgFgDistance']);
        //        });;
        //        var ySeries = data.map(function (d) {
        //            return parseFloat(d['win']);
        //        });
        //
        //        var lr = linearRegression(ySeries, xSeries);
        //        //console.log(lr.r2);
        //
        //        var max = d3.max(data, function (d) {
        //            return d.avgFgDistance;
        //        });
        //        var myLine = chartOne.append("svg:line")
        //            .attr("class", "trendLine")
        //            .attr("x1", function () {
        //                //console.log(xScale(0));
        //                return xScale(d3.min(data, xValue));
        //            })
        //            .attr("y1", function () {
        //                //console.log(yScale(lr.intercept));
        //                return yScale(d3.min(data, xValue) * lr.slope + lr.intercept);
        //            })
        //            .attr("x2", function () {
        //                return xScale(max + 1);
        //
        //            })
        //            .attr("y2", function () {
        //
        //                return yScale(((max + 1) * lr.slope) + lr.intercept);
        //            }).style("stroke", "rgba(200,200,200,1)");


        if (pymChild) {
            pymChild.sendHeight();
        }

    });


    function showTooltip(d, i) {

        $("#PlayerName").html(d.kicker + ", " + "<span class=\'TeamNameSpan\' >" + d.team + "</span>");
        playerStats.text(function () {
            var rawStats = d.avgFgDistance;
            var formattedStats = d3.format(".3g")(rawStats);
            return"Avg FG distance: " + formattedStats + " yards" ;

        }).style("color", "rgb(220,100,100)");

        winPercentage.text(function () {
            var rawStats = d.win;
            var formattedStats = d3.format(".3g")(rawStats);
            return "Win%: " + formattedStats;

        });

        toolTip.transition().duration(200)
            .style("opacity", 1)
            .style('position', 'absolute')
            .style('left', toolTipLocator("x"))
            .style('top', toolTipLocator("y"))
            .style("width", "auto")
            .style("height", "auto");

        //         this.postMessage(["hi"], 'http://localhost:8000/parent.html'); 

    }


    function toolTipLocator(thisAxis) {
        if (thisAxis === "x") {
            var flipThreshold;
            var initialWidth = $("#iframeContainer").width();
            if (pymChild.parentWidth === null) {
                flipThreshold = initialWidth * 2 / 3;
            } else {
                flipThreshold = pymChild.parentWidth * 2 / 3;
            }
            var offsetX = $("#toolTip").width();
            //console.log(offsetX);
            if (d3.event.pageX < flipThreshold) {
                return (d3.event.pageX + 20) + "px";
            } else {
                return (d3.event.pageX - offsetX - 20) + "px";
            }
        } else if (thisAxis === "y") {
            var offsetY = $("#toolTip").height();
            //console.log(offsetY);
            //console.log(d3.event.pageY)
            if (d3.event.pageY + offsetY > height) {
                return (d3.event.pageY - offsetY) + "px";
            } else {
                return (d3.event.pageY) + "px";
            }
        }
    }



    function linearRegression(y, x) {
        var lr = {};
        var n = y.length;
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var sum_yy = 0;
        for (var i = 0; i < y.length; i++) {

            sum_x += x[i];
            sum_y += y[i];
            sum_xy += (x[i] * y[i]);
            sum_xx += (x[i] * x[i]);
            sum_yy += (y[i] * y[i]);
        }
        lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
        lr['intercept'] = (sum_y - lr.slope * sum_x) / n;
        lr['r2'] = Math.pow((n * sum_xy - sum_x * sum_y) / Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)), 2);

        return lr;
    }


     function dotHighlight(d, i, thisID, that) {

        var linkFrame_1 = parent.document.getElementById("chart-avgfgdis").contentDocument;
        var linkFrame_2 = parent.document.getElementById("chart-fgmgame").contentDocument;
        var linkFrame_3 = parent.document.getElementById("chart-fg").contentDocument;
        //console.log(temp);


        var ID_a;
        var ID_b;
        if (thisID.search("G-ONE") != -1) {
            ID_a = "G-TWO" + i;
            ID_b = "G-THREE" + i;
            var tempID1 = linkFrame_2.getElementById(ID_a);
            d3.select(tempID1).transition().duration(500).attr("r", (5) + 13).attr("stroke","rgb(100,100,100)").attr("stroke-width",1);
            var tempID2 = linkFrame_3.getElementById(ID_b);
            d3.select(tempID2).transition().duration(500).attr("r", (5) + 13).attr("stroke","rgb(100,100,100)").attr("stroke-width",1);
        } else if (thisID.search("G-TWO") != -1) {
            ID_a = "G-ONE" + i;
            ID_b = "G-THREE" + i;
            var tempID1 = linkFrame_1.getElementById(ID_a);
            d3.select(tempID1).transition().duration(500).attr("r", (5) + 13).attr("stroke","rgb(100,100,100)").attr("stroke-width",1);
            var tempID2 = linkFrame_3.getElementById(ID_b);
            d3.select(tempID2).transition().duration(500).attr("r", (5) + 13).attr("stroke","rgb(100,100,100)").attr("stroke-width",1);
        } else if (thisID.search("G-THREE") != -1) {
            ID_a = "G-ONE" + i;
            ID_b = "G-TWO" + i;
            var tempID1 = linkFrame_1.getElementById(ID_a);
            d3.select(tempID1).transition().duration(500).attr("r", (5) + 13).attr("stroke","rgb(100,100,100)").attr("stroke-width",1);
            var tempID2 = linkFrame_2.getElementById(ID_b);
            d3.select(tempID2).transition().duration(500).attr("r", (5) + 13).attr("stroke","rgb(100,100,100)").attr("stroke-width",1);
        //    //console.log(ID_b);
        }
        return d3.select(that).transition().duration(500).attr("r", (5) + 13).attr("stroke","rgb(100,100,100)").attr("stroke-width",1);
    }

    function dotShrink(d, i, thisID, that) {

        var linkFrame_1 = parent.document.getElementById("chart-avgfgdis").contentDocument;
        var linkFrame_2 = parent.document.getElementById("chart-fgmgame").contentDocument;
        var linkFrame_3 = parent.document.getElementById("chart-fg").contentDocument;


        var ID_a;
        var ID_b;
        if (thisID.search("G-ONE") != -1) {
            ID_a = "G-TWO" + i;
            ID_b = "G-THREE" + i;
            var tempID1 = linkFrame_2.getElementById(ID_a);
            d3.select(tempID1).transition().duration(500).attr("r", 5).attr("stroke-width", 0).attr("stroke", "none");
            var tempID2 = linkFrame_3.getElementById(ID_b);
            d3.select(tempID2).transition().duration(500).attr("r", 5).attr("stroke-width", 0).attr("stroke", "none");

        } else if (thisID.search("G-TWO") != -1) {
            ID_a = "G-ONE" + i;
            ID_b = "G-THREE" + i;
            //console.log(ID_a);
            var tempID1 = linkFrame_1.getElementById(ID_a);
            d3.select(tempID1).transition().duration(500).attr("r", 5).attr("stroke-width", 0).attr("stroke", "none");
            var tempID2 = linkFrame_3.getElementById(ID_b);
            d3.select(tempID2).transition().duration(500).attr("r", 5).attr("stroke-width", 0).attr("stroke", "none");
        } else if (thisID.search("G-THREE") != -1) {
            ID_a = "G-ONE" + i;
            ID_b = "G-TWO" + i;
            //console.log(ID_a);
            var tempID1 = linkFrame_1.getElementById(ID_a);
            d3.select(tempID1).transition().duration(500).attr("r", 5).attr("stroke-width", 0).attr("stroke", "none");
            var tempID2 = linkFrame_2.getElementById(ID_b);
            d3.select(tempID2).transition().duration(500).attr("r", 5).attr("stroke-width", 0).attr("stroke", "none");
        }
        //  //console.log(that);
        return d3.select(that).transition().duration(500).attr("r", 5).attr("stroke", "none");

    }

}


$(window).load(function () {

    pymChild = new pym.Child({
        renderCallback: drawCharts
    });

});