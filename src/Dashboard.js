import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const salesData = [
  { time: '10:00 AM', sales: 232.39 },
  { time: '11:00 AM', sales: 9675.73 },
  { time: '12:00 PM', sales: 11466.81 },
  { time: '1:00 PM', sales: 12656.71 },
  { time: '2:00 PM', sales: 8932.73 },
  { time: '3:00 PM', sales: 8806.83 },
  { time: '4:00 PM', sales: 20485.2 },
  { time: '5:00 PM', sales: 42765.32 },
  { time: '6:00 PM', sales: 57082.53 },
  { time: '7:00 PM', sales: 44670.55 },
  { time: '8:00 PM', sales: 20610.17 },
  { time: '9:00 PM', sales: 379.7 },
  { time: '10:00 PM', sales: 18 }
];

const laborData = [
  { 
    timeSlot: '7am-10am', 
    FOH: 0,
    BOH: 15518.22, 
    totalLabor: 15518.22
  },
  { 
    timeSlot: '10am-4pm', 
    FOH: 12466.07,
    BOH: 16142.50,
    totalLabor: 28608.97
  },
  { 
    timeSlot: '4pm-11pm', 
    FOH: 14066.56,
    BOH: 12638.49,
    totalLabor: 26705.05
  }
];

const menuItemsData = [
  // Pizzas
  { category: 'Pizza', item: 'Custom Pizza', sales: 44876.38 },
  { category: 'Pizza', item: 'Pepperoni Pizza', sales: 35835.75 },
  { category: 'Pizza', item: 'Margherita Pizza', sales: 22155.4 },
  { category: 'Pizza', item: 'Garlicky White Devil', sales: 11467.95 },
  { category: 'Pizza', item: 'BBQ Pork Pizza', sales: 9530.05 },
  { category: 'Pizza', item: 'Cheese Pizza', sales: 10772.4 },
  { category: 'Pizza', item: 'Mushroom Truffle', sales: 6766.19 },
  { category: 'Pizza', item: 'Pesto Pizza', sales: 4916.8 },
  // Appetizers
  { category: 'Appetizers', item: 'Caesar Salad', sales: 10995.71 },
  { category: 'Appetizers', item: 'Chicken Wings', sales: 8230.11 },
  { category: 'Appetizers', item: 'Mixed Green Salad', sales: 8190.8 },
  { category: 'Appetizers', item: 'Fried Calamari', sales: 5276.05 },
  { category: 'Appetizers', item: 'Focaccia Bread Strips', sales: 4113.94 },
  { category: 'Appetizers', item: 'French Fries', sales: 3290.3 },
  // Cocktails
  { category: 'Cocktails', item: 'KPK Mai Tai', sales: 2798.4 },
  { category: 'Cocktails', item: 'Lilikoi Margarita', sales: 2438.4 },
  { category: 'Cocktails', item: 'Koloa Coconut Mojito', sales: 1713.6 },
  { category: 'Cocktails', item: 'Lavender Lemon Drop', sales: 1452.8 },
  { category: 'Cocktails', item: 'Bee Sting', sales: 1227.78 },
  { category: 'Cocktails', item: 'Pink Empress', sales: 553.6 },
  { category: 'Cocktails', item: 'Spiked Juice', sales: 535.2 },
  { category: 'Cocktails', item: 'Ginger Smash', sales: 929.6 },
  { category: 'Cocktails', item: 'Coconut Margarita', sales: 460.6 },
  // Beer
  { category: 'Beer', item: 'Draft Beer', sales: 7617.28 },
  { category: 'Beer', item: 'Bottled Beer', sales: 2321.3 },
  { category: 'Beer', item: 'Kewalo Creme Ale', sales: 2210 },
  { category: 'Beer', item: 'El Guapo Golden Ale', sales: 2261.28 },
  { category: 'Beer', item: 'Hop Island IPA', sales: 1518 },
  { category: 'Beer', item: 'Da Life Lager', sales: 969 },
  { category: 'Beer', item: 'Coors Light', sales: 1228 },
  { category: 'Beer', item: 'Peroni', sales: 449.1 },
  { category: 'Beer', item: 'Stella', sales: 397.8 },
  { category: 'Beer', item: 'Asahi Dry 0.0', sales: 246.4 },
  // Wine
  { category: 'Wine', item: 'Red Wine (Glass)', sales: 1621.5 },
  { category: 'Wine', item: 'White Wine (Glass)', sales: 1210.3 },
  { category: 'Wine', item: 'Rose Wine (Glass)', sales: 495.5 },
  { category: 'Wine', item: 'Champagne (Glass)', sales: 315.7 },
  { category: 'Wine', item: 'Red Wine (Bottle)', sales: 440 },
  { category: 'Wine', item: 'White Wine (Bottle)', sales: 360 },
  { category: 'Wine', item: 'Rose Wine (Bottle)', sales: 40.5 },
  { category: 'Wine', item: 'Champagne (Bottle)', sales: 42 },
];

const Dashboard = () => {
  const [laborChartData, setLaborChartData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const processedLaborData = laborData.map(slot => {
      let slotSales = 0;
      if (slot.timeSlot === '7am-10am') {
        slotSales = salesData.filter(sale => sale.time === '10:00 AM').reduce((sum, sale) => sum + sale.sales, 0);
      } else if (slot.timeSlot === '10am-4pm') {
        slotSales = salesData.filter(sale => ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'].includes(sale.time)).reduce((sum, sale) => sum + sale.sales, 0);
      } else if (slot.timeSlot === '4pm-11pm') {
        slotSales = salesData.filter(sale => ['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'].includes(sale.time)).reduce((sum, sale) => sum + sale.sales, 0);
      }

      return {
        ...slot,
        sales: slotSales,
        FOHPercentage: (slot.FOH / slotSales) * 100,
        BOHPercentage: (slot.BOH / slotSales) * 100,
        totalLaborPercentage: (slot.totalLabor / slotSales) * 100
      };
    });

    console.log('Processed Labor Data:', processedLaborData);

    setLaborChartData(processedLaborData);
    setMenuItems(menuItemsData);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
          <p><strong>{label}</strong></p>
          <p>{`Sales: ${formatCurrency(data.sales)}`}</p>
          <p>{`FOH Labor: ${formatCurrency(data.FOH)} (${formatPercentage(data.FOHPercentage)})`}</p>
          <p>{`BOH Labor: ${formatCurrency(data.BOH)} (${formatPercentage(data.BOHPercentage)})`}</p>
          <p>{`Total Labor: ${formatCurrency(data.totalLabor)} (${formatPercentage(data.totalLaborPercentage)})`}</p>
        </div>
      );
    }
    return null;
  };

  const renderCategoryChart = (category) => {
    const categoryData = menuItems.filter(item => item.category === category);

    return (
      <div key={category} style={{ width: '100%', height: '400px', marginBottom: '30px' }}>
        <h2>{category} Sales</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={categoryData}
            margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="item" angle={-45} textAnchor="end" interval={0} height={100} />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip formatter={formatCurrency} />
            <Bar dataKey="sales" fill={
              category === 'Pizza' ? '#8884d8' : 
              category === 'Appetizers' ? '#82ca9d' : 
              category === 'Cocktails' ? '#ffc658' :
              category === 'Beer' ? '#ff8042' :
              '#8dd1e1'  // for Wine
            } />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <h1>Restaurant Dashboard</h1>
      
      <h2>Sales and Labor Costs by Time Period</h2>
      <div style={{ width: '100%', height: '400px', marginBottom: '30px' }}>
        <ResponsiveContainer>
          <BarChart 
            data={laborChartData}
            margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timeSlot" />
            <YAxis yAxisId="left" tickFormatter={formatCurrency} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="sales" fill="#ffc658" name="Sales" />
            <Bar yAxisId="left" dataKey="FOH" stackId="a" fill="#8884d8" name="FOH Labor" />
            <Bar yAxisId="left" dataKey="BOH" stackId="a" fill="#82ca9d" name="BOH Labor" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {renderCategoryChart('Pizza')}
      {renderCategoryChart('Appetizers')}
      {renderCategoryChart('Cocktails')}
      {renderCategoryChart('Beer')}
      {renderCategoryChart('Wine')}
    </div>
  );
};

export default Dashboard;