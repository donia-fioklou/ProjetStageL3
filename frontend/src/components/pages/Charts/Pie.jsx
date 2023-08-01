import { Pie } from "react-chartjs-2";

const PieChart = ({ labels,labelsData }) => {
    var data = {
        labels: labels,
        datasets: [{
          label: [],
          data: labelsData,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            
          ],
          borderWidth: 1
        }]
      };
    
      var options = {
        maintainAspectRatio: false,
        scales: {
        },
        legend: {
          labels: {
            fontSize: 25,
          },
        },
      }

      return (
        <Pie
              data={data}
              height={400}
              options={options}
        />
      );

}
export default PieChart;