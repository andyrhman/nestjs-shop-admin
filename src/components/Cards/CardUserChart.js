import React from "react";
import { useRouter } from "next/router";
import { Chart, registerables } from 'chart.js'
import "chartjs-adapter-date-fns";
import axios from "axios";

Chart.register(...registerables)

const CardUserChart = () => {
    const [error, setError] = React.useState('');
    const router = useRouter();

    React.useEffect(() => {
        (
            async () => {

                try {
                    const { data } = await axios.get('user-chart');

                    const ctx = document.getElementById('user_chart').getContext('2d');

                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: data.map((r) => r.date),
                            datasets: [{
                                label: 'User',
                                data: data.map((r) => r.count),
                                backgroundColor: 'rgba(145, 169, 250)',
                                borderColor: 'rgba(91, 127, 245)',
                                borderWidth: 1,
                                pointStyle: 'circle',
                                pointRadius: 10,
                                pointHoverRadius: 15,
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
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        setError('An error occurred');
                        router.push('/login');
                    }

                    if (error.response && error.response.status === 403) {
                        setError('An error occurred');
                        router.push('/login');
                    }
                }
            })();
    }, [router]);
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-blueGray-600 mb-1 text-xs font-semibold">
                                Overview
                            </h6>
                            <h2 className="text-xl font-semibold">Users Chart</h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative">
                        <canvas id="user_chart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardUserChart