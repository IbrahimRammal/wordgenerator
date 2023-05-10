$(document).ready(function () {
        // Sample income statement data for three companies
        var companyData = [
          { company: 'Company A', revenue: 100000, expenses: 70000 },
          { company: 'Company B', revenue: 120000, expenses: 80000 },
          { company: 'Company C', revenue: 90000, expenses: 60000 }
      ];

      // Prepare the data for revenue chart
      var revenueData = companyData.map(function (item) {
          return { company: item.company, value: item.revenue };
      });

      // Prepare the data for expenses chart
      var expensesData = companyData.map(function (item) {
          return { company: item.company, value: item.expenses };
      });

      // Create the revenue chart
      var revenueChart = new DevExpress.viz.dxPieChart("#revenueChart", {
          title: "Revenue",
          dataSource: revenueData,
          series: [{
              argumentField: "company",
              valueField: "value"
          }],
          tooltip: {
              enabled: true,
              format: "currency",
              customizeTooltip: function (args) {
                  return {
                      text: args.argumentText + ": " + args.valueText
                  };
              }
          }
      });

      // Create the expenses chart
      var expensesChart = new DevExpress.viz.dxPieChart("#expensesChart", {
          title: "Expenses",
          dataSource: expensesData,
          series: [{
              argumentField: "company",
              valueField: "value"
          }],
          tooltip: {
              enabled: true,
              format: "currency",
              customizeTooltip: function (args) {
                  return {
                      text: args.argumentText + ": " + args.valueText
                  };
              }
          }
      });
});
// $(document).ready(function () {
//   // Get a reference to the chart container elements
//   var revenueChartContainer = document.getElementById('revenueChartContainer');
//   var expensesChartContainer = document.getElementById('expensesChartContainer');

//   // // Initialize the Syncfusion pie charts
//   var revenueChart = new ej.charts.AccumulationChart(revenueChartContainer, {
//       // Chart configuration options for revenue
//       // Set the chart properties, such as title, legend, and series
//   });

//   var expensesChart = new ej.charts.AccumulationChart(expensesChartContainer, {
//       // Chart configuration options for expenses
//       // Set the chart properties, such as title, legend, and series
//   });

//   // Sample income statement data for three companies
//   var incomeStatementData = [
//       { company: 'Company A', revenue: 100000, expenses: 70000 },
//       { company: 'Company B', revenue: 120000, expenses: 80000 },
//       { company: 'Company C', revenue: 90000, expenses: 60000 }
//     ];
    
//     // Prepare the revenueData array for the revenue chart
//     var revenueData = incomeStatementData.map(function(item) {
//       return { company: item.company, value: item.revenue };
//     });
    
//     // Prepare the expensesData array for the expenses chart
//     var expensesData = incomeStatementData.map(function(item) {
//       return { company: item.company, value: item.expenses };
//     });
    

//   // Set the data source for the revenue chart
//   revenueChart.series[0].dataSource = revenueData;

//   // Set the data source for the expenses chart
//   expensesChart.series[0].dataSource = expensesData;

//   // Specify the properties to map from the data source
//   revenueChart.series[0].xName = 'company';
//   revenueChart.series[0].yName = 'value';

//   expensesChart.series[0].xName = 'company';
//   expensesChart.series[0].yName = 'value';

//   // Refresh the charts to display the data
//   revenueChart.refresh();
//   expensesChart.refresh();
// });