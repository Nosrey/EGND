
import Chart from 'react-apexcharts';
// import { COLORS } from '@/constants/chart.constant'

function GraficoDashFinanc03({ graph03Data }) {
    // const data = [
    //     {
    //         name: 'series1',
    //         data: [31, 40, 28, 51, 42, 109, 100],
    //     },
    //     {
    //         name: 'series2',
    //         data: [11, 32, 45, 32, 34, 52, 41],
    //     },
    // ]

    return (
        <Chart
            options={{
                dataLabels: {
                    enabled: false,
                },
                colors: ['#C1F5FE', '#C1C6FE', '#C2FEC1', '#FEC1CF', '#FEF6C1', '#FF2D00'],
                stroke: {
                    curve: 'smooth',
                },

                xaxis: {
                    type: 'numeric',
                    categories: Array.from({ length: 10 }, (_, i) => i),
                    labels: {
                        formatter(value) { return `Año ${value + 1}`; }
                    }
                },
                tooltip: {
                    x: {
                        formatter(value) { return `Año ${value}`; }, // Use method shorthand
                    },
                }
            }
            }
            series={graph03Data}
            type="area"
            height={300}
        />
    )
}

export default GraficoDashFinanc03

