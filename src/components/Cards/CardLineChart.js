import React from "react";
import { Chart, registerables } from 'chart.js';
import "chartjs-adapter-date-fns";

Chart.register(...registerables)

export default function CardLineChart() {
    React.useEffect(() => {
        const ctx = document.getElementById('chart').getContext('2d');

        // Dummy data
        const labels = ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05', '2023-10-06', '2023-10-07'];
        const data = [12, 19, 3, 5, 2, 3, 7];

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Sales',
                    data: data,
                    backgroundColor: 'rgba(222, 171, 189)',
                    borderColor: 'rgba(181, 38, 88)',
                    borderWidth: 1,
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15,
                    fill: true,
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'yyyy-MM-dd'
                            }
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, []);
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-blueGray-600 mb-1 text-xs font-semibold">
                                Overview
                            </h6>
                            <h2 className="text-xl font-semibold">Sales value</h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative">
                        <canvas id="chart"></canvas>

                    </div>
                </div>
            </div>
        </>
    );
}