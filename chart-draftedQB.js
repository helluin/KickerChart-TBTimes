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


    d3.json("quarterback.json", function (data) {


        var chartDraftedQuarterback = d3.select("#iframeContainer").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("overflow", "visible")

        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 800 800");

        //ToolTip 
        var toolTip = d3.select(document.getElementById("toolTip"));
        var player = d3.select(document.getElementById("PlayerName"));
         var yearDrafted = d3.select(document.getElementById("YearDrafted"));
        var pick = d3.select(document.getElementById("Pick"));
        var carAV = d3.select(document.getElementById("CareerAV"));

        // setup x
        var xValue = function (d) {
                ////console.log(d);
                return d.pick;
            }
            , xScale = d3.scale.linear().range([0, width])
            , xMap = function (d) {
                return xScale(xValue(d));
            }
            , xAxis = d3.svg.axis().scale(xScale).orient("bottom").outerTickSize(0).tickFormat(function (d) {
                return d;
            }).ticks(5);
        // setup y
        var yValue = function (d) {
                ////console.log(d);
                return d.carav;
            }
            , yScale = d3.scale.linear().range([height, 0])
            , yMap = function (d) {
                return yScale(yValue(d));
            }
            , formatyAxis = d3.format(".03g")
            , yAxis = d3.svg.axis().scale(yScale).orient("left").outerTickSize(0).ticks(8);


        xScale.domain([d3.min(data, xValue) - 5, d3.max(data, xValue) + 10]);
        yScale.domain([d3.min(data, yValue) - 5, d3.max(data, yValue) + 5]);
        // x-axis
        chartDraftedQuarterback.append("g")
            .attr("class", "x axis")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .style("text-anchor", "middle")
            // .style("font-family", "HelveticaNeue-CondensedBold")
            .attr("transform", "translate(" + width / 2 + ", 45)") // text is drawn off the screen top left, move down and out and rotate
            .text("Pick");
        // y-axis
        chartDraftedQuarterback.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate(-55" + "," + (height / 2) + ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate

        .text("Career AV \(quarterbacks)\ ");
        //draw dots
        chartDraftedQuarterback.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("id", function (d, i) {
                return "Quarterback" + i;
            })
            .attr("r", function (d, i) {
                return 5;

            })
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", function (d, i) {
                return "rgba(100,200,170,0.5)";
            })
            .on("mouseover", function (d, i) {
                var thisID = "TD" + i;
                dotHighlight(d, i, thisID, this);

                player.text(function () {
                    //console.log(d);
                    return d.player;
                });
                yearDrafted.text(function () {
                  
                    return "Year drafted: " + d.draftYear;
                });
                pick.text(function () {
                    var rawStats = d.pick;

                    var formattedStats = d3.format(".3g")(rawStats);
                    return "Pick: " + rawStats;

                }).style("color", "rgb(100,200,170)");
                carAV.text(function () {
                    var rawStats = d.carav;
                    var formattedStats = d3.format(".3g")(rawStats);
                    return "Career AV: " + rawStats;

                }).style("color", "rgb(150,150,150)");

                toolTip.transition().duration(400)
                    .style("opacity", 1)
                    .style('position', 'absolute')
                    .style('left', toolTipLocator("x"))
                    .style('top', toolTipLocator("y"))
                    .style("width", "auto")
                    .style("height", "auto");


            })
            .on("mouseout", function (d, i) {
                var thisID = "TD" + i;
                dotShrink(d, i, thisID, this);
                toolTip.transition().duration(400)
                    .style("opacity", 0);
            })



        //Trend Line
        //        var xSeries = data.map(function (d) {
        //            return parseFloat(d['td']);
        //        });;
        //        var ySeries = data.map(function (d) {
        //            return parseFloat(d['wl']);
        //        });
        //
        //        var lr = linearRegression(ySeries, xSeries);
        //        //console.log(lr.r2);
        //
        //        var max = d3.max(data, function (d) {
        //            return d.td;
        //        });
        //        var myLine = chartDraftedQuarterback.append("svg:line")
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
        //            }).style("stroke", "rgba(100,200,170,1)");


        if (pymChild) {
            pymChild.sendHeight();
        }

    });



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
        return d3.select(that).transition().duration(500).attr("r", (5) + 13).attr("stroke","rgb(100,100,100)").attr("stroke-width",1);
    }

    function dotShrink(d, i, thisID, that) {
        return d3.select(that).transition().duration(500).attr("r", 5).attr("stroke-width",0).attr("stroke","none");

    }

}


$(window).load(function () {

    pymChild = new pym.Child({
        renderCallback: drawCharts
    });

})