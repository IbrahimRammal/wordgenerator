var dataSource = [{
    state: "Illinois",
    year1998: 423.721,
    year2001: 476.851,
    year2004: 528.904
}, {
    state: "Indiana",
    year1998: 178.719,
    year2001: 195.769,
    year2004: 227.271
}, {
    state: "Michigan",
    year1998: 308.845,
    year2001: 335.793,
    year2004: 372.576
}, {
    state: "Ohio",
    year1998: 348.555,
    year2001: 374.771,
    year2004: 418.258
}, {
    state: "Wisconsin",
    year1998: 160.274,
    year2001: 182.373,
    year2004: 211.727
},
{
    state: "efs",
    year1998: 423.721,
    year2001: 476.851,
    year2004: 528.904
}, {
    state: "ax",
    year1998: 178.719,
    year2001: 195.769,
    year2004: 227.271
}, {
    state: "s",
    year1998: 308.845,
    year2001: 335.793,
    year2004: 372.576
}, {
    state: "fd",
    year1998: 348.555,
    year2001: 374.771,
    year2004: 418.258
}, {
    state: "f",
    year1998: 160.274,
    year2001: 182.373,
    year2004: 211.727
}, {
    state: "fdbx3",
    year1998: 348.555,
    year2001: 374.771,
    year2004: 418.258
}, {
    state: "fvdw",
    year1998: 160.274,
    year2001: 182.373,
    year2004: 211.727
}];

$(function(){
    $("#chart").dxChart({
        dataSource: dataSource,
        commonSeriesSettings: {
            argumentField: "state",
            type: "bar",
            hoverMode: "allArgumentPoints",
            selectionMode: "allArgumentPoints",
            label: {
                visible: true,
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            }
        },
        series: [
            { valueField: "year2004", name: "2004" },
            { valueField: "year2001", name: "2001" },
            { valueField: "year1998", name: "1998" }
        ],
        title: "Gross State Product within the Great Lakes Region",
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        onPointClick: function (e) {
            e.target.select();
        }
    });
});