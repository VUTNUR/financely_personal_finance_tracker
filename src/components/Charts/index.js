import React from "react";
import { Line, Pie } from "@ant-design/charts";

function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  let spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type == "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  let finalSpendings = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  const config = {
    data: data,
    width: 600,
    height: 400,
    xField: "date",
    yField: "amount",
  };
  const spendingConfig = {
    data: Object.values(finalSpendings),
    width: 400,
    height: 400,
    angleField: "amount",
    colorField: "tag",
  };

  let chart;
  let pieChart;
  return (
    <div className="charts-wrapper">
      <div className="line-chart">
        <h2 style={{ marginTop: "0px", marginBottom: "2rem" }}>
          Your Analytics
        </h2>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div className="pie-chart">
        <h2 style={{ marginTop: "0px", marginBottom: "2rem" }}>
          Your Spending
        </h2>
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
      </div>
    </div>
  );
}

export default ChartComponent;
