import useSwr from 'swr'
import { Line } from 'react-chartjs-2';
const api_link = require('../process')

const fetcher = (url) => fetch(url).then((res) => res.json())
export default function TotalPerscriptions(){
    const { data: info, error } = useSwr(`${api_link}/data/trx`, fetcher)
    if (error) return <div>Faild to load data...</div>
    if (!info) return <div>Loading...</div>
    const data = {
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
        datasets: [],
    };
    var colors = ['rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)']
    var colorsLines = ['rgba(255, 99, 132, 0.4)',
    'rgba(54, 162, 235, 0.4)',
    'rgba(255, 206, 86, 0.4)',
    'rgba(75, 192, 192, 0.4)']
    var increment = 0;
    for(const [key, value] of Object.entries(info)) {
        data.datasets.push({ label: `${key}`,
        data: value,
        fill: false,
        backgroundColor: colors[increment],
        borderColor: colorsLines[increment]})
        increment++;
    }
      
    const options = {
        scales: {
          y: {
              beginAtZero: true
          }
        },
    };

    return(
        <> 
            <h1 className="ml-4 mt-4 text-grey-dark font-medium text-md">Total Perscriptions Trends</h1>
            <Line className="m-4" data={data} options={options} />
        </>
    )
}