// Sample income statement data for three companies
var companyData = [
    { category: 'Revenue', companyA: 100000, companyB: 120000, companyC: 90000 },
    { category: 'Expenses', companyA: 70000, companyB: 80000, companyC: 60000 },
    { category: 'Profit', companyA: 30000, companyB: 40000, companyC: 30000 }
];

// Get a reference to the chart container element
var chartContainer = document.getElementById('chartContainer');

// Initialize the Syncfusion chart
var chart = new ej.charts.Chart(chartContainer, {
    // Chart configuration options
    series: [
        {
            type: 'Column',
            dataSource: companyData,
            xName: 'category',
            yName: 'value',
            name: 'Income Statement'
        }
    ],
    legendSettings: { visible: true },
    width: '800px',
    height: '400px',
    title: 'Income Statement Chart',
    tooltip: { enable: true }
});

// Refresh the chart to display the data
chart.refresh();

// $(document).ready(function () {
//     var incomeStatementData = [
//         //  { company: 'Company A', month: 'January', revenue: 5000, expenses: 3000 },
//         // { company: 'Company A', month: 'February', revenue: 6000, expenses: 3500 },
//         // // ...and so on for all months of Company A
    
//         // { company: 'Company B', month: 'January', revenue: 4000, expenses: 2000 },
//         // { company: 'Company B', month: 'February', revenue: 5500, expenses: 3200 },
//         // // ...and so on for all months of Company B
    
//         // { company: 'Company C', month: 'January', revenue: 6000, expenses: 4000 },
//         // { company: 'Company C', month: 'February', revenue: 7000, expenses: 4500 },
//         // // ...and so on for all months of Company C
//     ];

//     $.ajax({
//         url: "/api/invoice/invoicestatement/GetData?action=monthyear&id=2",
//         type: "POST",
//         dataType: "json",
//         cache: true,

//         success: function (result) {

//             var groupedData = incomeStatementData.reduce(function (result, current) {
//                 var month = current.month;
//                 if (!result[month]) {
//                     result[month] = [];
//                 }
//                 result[month].push(current);
//                 return result;
//             }, {});
        
//         // Iterate over each month
//             Object.keys(groupedData).forEach(function (month) {
//                 // Create a chart for the month
//                 var chart = new ej.charts.Chart({
//                 // Specify the chart element
//                 element: '#chartContainer-' + 'year',
            
//                 // Configure the chart properties
//                 series: [{
//                     dataSource: groupedData[month],
//                     xName: 'company',
//                     yName: 'revenue',
//                     type: 'Column'
//                 }, {
//                     dataSource: groupedData[month],
//                     xName: 'company',
//                     yName: 'expenses',
//                     type: 'Column'
//                 }],
//                 primaryXAxis: {
//                     valueType: 'Category'
//                 },
//                 primaryYAxis: {
//                     title: 'Amount (in USD)'
//                 },
//                 title: 'Income Statement - ' + month,
//                 legendSettings: { visible: true }
//                 });
            
//                 // Render the chart
//                 chart.appendTo('#chartContainer-' + 'year');
//         });
//     },
//         error: function (jqXHR, textStatus, err) {
//         $('#load').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Load&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').toggleClass("disabled");
//         toastr["error"]("Loading Data Faild", "Loading error");
//         }
//     });  
// });