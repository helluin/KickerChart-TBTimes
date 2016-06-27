var pymChild = null;
var graphics_aspect_width = 16;
var graphics_aspect_height = 9;
var mobile_threshold = 500;
var $graphic = $("#iframeContainer");

function drawCharts(container_width) {
    document.body.innerHTML = "";
    if (container_width == undefined || isNaN(container_width)) {
        container_width = 600;
    }
    var margin = {
            top: 20
            , right: 20
            , bottom: 30
            , left: 80
        }
        , padding = 20
        , width = container_width - margin.left - margin.right
        , height = Math.ceil((width * graphics_aspect_height) / graphics_aspect_width) - margin.top - margin.bottom;


    $graphic.empty();

    // --------------//
    //  GRAPH 1 -----//
    //---------------//



    //    d3.json("kicker06-15.json", function (data) {
    //
    //
    //        var chartOne = d3.select("body").append("svg")
    //            .attr("width", width + margin.left + margin.right)
    //            .attr("height", height + margin.top + margin.bottom)
    //            .append("g")
    //            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //
    //        // setup x
    //        var xValue = function (d) {
    //                //console.log(d);
    //                return d.avgFgDistance;
    //            }
    //            , xScale = d3.scale.linear().range([0, width])
    //            , xMap = function (d) {
    //                return xScale(xValue(d));
    //            }
    //            , xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
    //        // setup y
    //        var yValue = function (d) {
    //                //console.log(d);
    //                return d.win;
    //            }
    //            , yScale = d3.scale.linear().range([height, 0])
    //            , yMap = function (d) {
    //                return yScale(yValue(d));
    //            }
    //            , yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);
    //
    //
    //        xScale.domain([d3.min(data, xValue) - 0.2, d3.max(data, xValue)]);
    //        yScale.domain([d3.min(data, yValue) - 0.1, d3.max(data, yValue)]);
    //        // x-axis
    //        chartOne.append("g")
    //            .attr("class", "x axis")
    //            .attr("transform", "translate(0," + height + ")")
    //            .call(xAxis)
    //            .append("text")
    //            .attr("class", "label")
    //            .attr("x", width)
    //            .attr("y", -6)
    //            .style("text-anchor", "end")
    //            .text("avgFgDistance");
    //        // y-axis
    //        chartOne.append("g")
    //            .attr("class", "y axis")
    //            .call(yAxis)
    //            .append("text")
    //            .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
    //            .attr("transform", "translate(-35" + "," + (height / 2) + ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
    //            .text("WIN%");
    //        //draw dots
    //        chartOne.selectAll(".dot")
    //            .data(data)
    //            .enter().append("circle")
    //            .attr("class", "dot")
    //            .attr("id", function (d, i) {
    //
    //                return "G-ONE" + i;
    //            })
    //            .attr("r", function (d) {
    //                return 3 + d.games * 0.03;
    //            })
    //            .style("fill", function (d, i) {
    //
    //                return "rgba(200,20,50,0.5)";
    //            })
    //            .attr("cx", xMap)
    //            .attr("cy", yMap)
    //            .on("mouseover", function (d, i) {
    //
    //                var thisID = "G-ONE" + i;
    //                dotHighlight(d, i, thisID, this);
    //                //       tooltip.show;
    //            })
    //            .on("mouseout", function (d, i) {
    //                var thisID = "G-ONE" + i;
    //                dotShrink(d, i, thisID, this);
    //            })
    //
    //
    //        //Trend Line
    //        var xSeries = data.map(function (d) {
    //            return parseFloat(d['avgFgDistance']);
    //        });;
    //        var ySeries = data.map(function (d) {
    //            return parseFloat(d['win']);
    //        });
    //
    //        var lr = linearRegression(ySeries, xSeries);
    //        console.log(lr.r2);
    //
    //        var max = d3.max(data, function (d) {
    //            return d.avgFgDistance;
    //        });
    //        var myLine = chartOne.append("svg:line")
    //            .attr("class", "trendLine")
    //            .attr("x1", function () {
    //                console.log(xScale(0));
    //                return xScale(d3.min(data, xValue));
    //            })
    //            .attr("y1", function () {
    //                console.log(yScale(lr.intercept));
    //                return yScale(d3.min(data, xValue) * lr.slope + lr.intercept);
    //            })
    //            .attr("x2", function () {
    //                return xScale(max);
    //
    //            })
    //            .attr("y2", function () {
    //
    //                return yScale((max * lr.slope) + lr.intercept);
    //            }).style("stroke", "rgba(200,20,50,0.5)").style("stroke-dasharray", ("3, 3"));
    //
    //    });
    //
    //
    //    d3.json("kicker06-15.json", function (data) {
    //
    //
    //        var chartTwo = d3.select("body").append("svg")
    //            .attr("width", width + margin.left + margin.right)
    //            .attr("height", height + margin.top + margin.bottom)
    //            .append("g")
    //            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //
    //        // setup x
    //        var xValue = function (d) {
    //                //console.log(d);
    //                return d.fgmgame;
    //            }
    //            , xScale = d3.scale.linear().range([0, width])
    //            , xMap = function (d) {
    //                return xScale(xValue(d));
    //            }
    //            , xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
    //        // setup y
    //        var yValue = function (d) {
    //                //console.log(d);
    //                return d.win;
    //            }
    //            , yScale = d3.scale.linear().range([height, 0])
    //            , yMap = function (d) {
    //                return yScale(yValue(d));
    //            }
    //            , yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);
    //
    //
    //        xScale.domain([d3.min(data, xValue) - 0.1, d3.max(data, xValue)]);
    //        yScale.domain([d3.min(data, yValue) - 0.05, d3.max(data, yValue)]);
    //        // x-axis
    //        chartTwo.append("g")
    //            .attr("class", "x axis")
    //            .attr("transform", "translate(0," + height + ")")
    //            .call(xAxis)
    //            .append("text")
    //            .attr("class", "label")
    //            .attr("x", width)
    //            .attr("y", -6)
    //            .style("text-anchor", "end")
    //            .text("FGM/GAME");
    //        // y-axis
    //        chartTwo.append("g")
    //            .attr("class", "y axis")
    //            .call(yAxis)
    //            .append("text")
    //            .attr("class", "label")
    //            .attr("transform", "rotate(-90)")
    //            .attr("y", 6)
    //            .attr("dy", ".71em")
    //            .style("text-anchor", "end")
    //            .text("WIN%");
    //        //draw dots
    //        chartTwo.selectAll(".dot")
    //            .data(data)
    //            .enter().append("circle")
    //            .attr("class", "dot")
    //            .attr("id", function (d, i) {
    //
    //                return "G-TWO" + i;
    //            })
    //            .attr("r", function (d, i) {
    //                return 3 + d.games * 0.03;
    //
    //            })
    //            .attr("cx", xMap)
    //            .attr("cy", yMap)
    //            .style("fill", function (d, i) {
    //                return "rgba(200,150,190,0.5)";
    //            })
    //            .on("mouseover", function (d, i) {
    //                var thisID = "G-TWO" + i;
    //                dotHighlight(d, i, thisID, this);
    //                // tooltip.show;
    //            })
    //            .on("mouseout", function (d, i) {
    //                var thisID = "G-TWO" + i;
    //                dotShrink(d, i, thisID, this);
    //            })
    //
    //
    //
    //        //Trend Line
    //        var xSeries = data.map(function (d) {
    //            return parseFloat(d['fgmgame']);
    //        });;
    //        var ySeries = data.map(function (d) {
    //            return parseFloat(d['win']);
    //        });
    //
    //        var lr = linearRegression(ySeries, xSeries);
    //        console.log(lr.r2);
    //
    //        var max = d3.max(data, function (d) {
    //            return d.fgmgame;
    //        });
    //        var myLine = chartTwo.append("svg:line")
    //            .attr("class", "trendLine")
    //            .attr("x1", function () {
    //                console.log(xScale(0));
    //                return xScale(d3.min(data, xValue));
    //            })
    //            .attr("y1", function () {
    //                console.log(yScale(lr.intercept));
    //                return yScale(d3.min(data, xValue) * lr.slope + lr.intercept);
    //            })
    //            .attr("x2", function () {
    //                return xScale(max);
    //
    //            })
    //            .attr("y2", function () {
    //
    //                return yScale((max * lr.slope) + lr.intercept);
    //            }).style("stroke", "rgba(200,150,190,0.5)")
    //            .style("stroke-dasharray", ("3, 3"));
    //
    //    });


    d3.json("kicker06-15.json", function (data) {


        var chartThree = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 600 400");

        // setup x
        var xValue = function (d) {
                //console.log(d);
                return d.fg;
            }
            , xScale = d3.scale.linear().range([0, width])
            , xMap = function (d) {
                return xScale(xValue(d));
            }
            , xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
        // setup y
        var yValue = function (d) {
                //console.log(d);
                return d.win;
            }
            , yScale = d3.scale.linear().range([height, 0])
            , yMap = function (d) {
                return yScale(yValue(d));
            }
            , formatyAxis = d3.format(".03g")
            , yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(formatyAxis).ticks(5);


        xScale.domain([d3.min(data, xValue) - 0.1, d3.max(data, xValue)]);
        yScale.domain([d3.min(data, yValue) - 0.05, d3.max(data, yValue)]);
        // x-axis
        chartThree.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("FG%");
        // y-axis
        chartThree.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("WIN%");
        //draw dots
        chartThree.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("id", function (d, i) {

                return "G-THREE" + i;
            })
            .attr("r", function (d, i) {

                return 5;


            })
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", function (d, i) {
                return "rgba(100,150,240,0.5)";
            })
            .on("mouseover", function (d, i) {
                var thisID = "G-THREE" + i;
                dotHighlight(d, i, thisID, this);
                // tooltip.show;
            })
            .on("mouseout", function (d, i) {
                var thisID = "G-THREE" + i;
                dotShrink(d, i, thisID, this);
            })



        //Trend Line
        var xSeries = data.map(function (d) {
            return parseFloat(d['fg']);
        });;
        var ySeries = data.map(function (d) {
            return parseFloat(d['win']);
        });

        var lr = linearRegression(ySeries, xSeries);
        console.log(lr.r2);

        var max = d3.max(data, function (d) {
            return d.fg;
        });
        var myLine = chartThree.append("svg:line")
            .attr("class", "trendLine")
            .attr("x1", function () {
                console.log(xScale(0));
                return xScale(d3.min(data, xValue));
            })
            .attr("y1", function () {
                console.log(yScale(lr.intercept));
                return yScale(d3.min(data, xValue) * lr.slope + lr.intercept);
            })
            .attr("x2", function () {
                return xScale(max);

            })
            .attr("y2", function () {

                return yScale((max * lr.slope) + lr.intercept);
            }).style("stroke", "rgba(100,150,240,0.5)")
            .style("stroke-dasharray", ("3, 3"));


        if (pymChild) {
            pymChild.sendHeight();
        }

    });



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
        var ID_a;
        var ID_b;
        if (thisID.search("G-ONE") != -1) {
            ID_a = "G-TWO" + i;
            ID_b = "G-THREE" + i;
            var tempID1 = document.getElementById(ID_a);
            d3.select(tempID1).transition().duration(500).attr("r", (3 + d.games * 0.03) + 10);
            var tempID2 = document.getElementById(ID_b);
            d3.select(tempID2).transition().duration(500).attr("r", (3 + d.games * 0.03) + 10);
        } else if (thisID.search("G-TWO") != -1) {
            ID_a = "G-ONE" + i;
            ID_b = "G-THREE" + i;
            var tempID1 = document.getElementById(ID_a);
            d3.select(tempID1).transition().duration(500).attr("r", (3 + d.games * 0.03) + 10);
            var tempID2 = document.getElementById(ID_b);
            d3.select(tempID2).transition().duration(500).attr("r", (3 + d.games * 0.03) + 10);
        } else if (thisID.search("G-THREE") != -1) {
            ID_a = "G-ONE" + i;
            ID_b = "G-TWO" + i;
            var tempID1 = document.getElementById(ID_a);
            d3.select(tempID1).transition().duration(500).attr("r", (3 + d.games * 0.03) + 10);
            var tempID2 = document.getElementById(ID_b);
            d3.select(tempID2).transition().duration(500).attr("r", (3 + d.games * 0.03) + 10);
            console.log(ID_b);
        }
        return d3.select(that).transition().duration(500).attr("r", (3 + d.games * 0.03) + 13);
    }

    function dotShrink(d, i, thisID, that) {

        var ID_a;
        var ID_b;
        if (thisID.search("G-ONE") != -1) {
            ID_a = "G-TWO" + i;
            ID_b = "G-THREE" + i;
            var tempID1 = document.getElementById(ID_a);
            d3.select(tempID1).transition().duration(500).attr("r", 3 + d.games * 0.03);
            var tempID2 = document.getElementById(ID_b);
            d3.select(tempID2).transition().duration(500).attr("r", 3 + d.games * 0.03);

        } else if (thisID.search("G-TWO") != -1) {
            ID_a = "G-ONE" + i;
            ID_b = "G-THREE" + i;
            console.log(ID_a);
            var tempID1 = document.getElementById(ID_a);
            d3.select(tempID1).transition().duration(500).attr("r", 3 + d.games * 0.03);
            var tempID2 = document.getElementById(ID_b);
            d3.select(tempID2).transition().duration(500).attr("r", 3 + d.games * 0.03);
        } else if (thisID.search("G-THREE") != -1) {
            ID_a = "G-ONE" + i;
            ID_b = "G-TWO" + i;
            console.log(ID_a);
            var tempID1 = document.getElementById(ID_a);
            d3.select(tempID1).transition().duration(500).attr("r", 3 + d.games * 0.03);
            var tempID2 = document.getElementById(ID_b);
            d3.select(tempID2).transition().duration(500).attr("r", 3 + d.games * 0.03);
        }
        //  console.log(that);
        return d3.select(that).transition().duration(500).attr("r", 3 + d.games * 0.03);

    }

    var tooltip = function () {

        show: {

        }

    }
}


$(window).load(function () {

    pymChild = new pym.Child({
        renderCallback: drawCharts
    });

})