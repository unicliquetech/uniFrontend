import React, { useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);
const Chart = () => {
    const charts = ["Monthly","Weekly","Today", "Yesterday", "Last 7 days", "Last 30 days"];
    const [revenueModel, setRevenueModel] = useState(false);
    const [showCart, setShowCart] = useState("Monthly");
    const monthLinearChartData: any = {
		labels: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
		datasets: [
			{
				label: "Revenue",
				data: [
					5000, 20000, 15000, 8000, 20000, 10000, 40000, 20000, 8000, 50000,
					60000, 90000,
				],
				borderColor: "rgb(254, 114, 76)",
				fill: true,
				pointRadius: 6,
				pointBackgroundColor: "#FD4D15",
				lineTension: 0.5,
				backgroundColor: function (context: {
					chart: {
						canvas: {
							getContext: (arg0: string) => {
								(): any;
								new (): any;
								createLinearGradient: {
									(arg0: number, arg1: number, arg2: number, arg3: any): any;
									new (): any;
								};
							};
						};
						height: any;
					};
				}) {
					var gradient = context.chart.canvas
						.getContext("2d")
						.createLinearGradient(0, 0, 0, context.chart.height);
					gradient.addColorStop(0, "#FEB8A1"); // start color
					gradient.addColorStop(1, "white"); // end color
					return gradient;
				},
			},
		],
        
	};
    const TodayLinearChartData: any = {
        labels: [
            "12:00 AM",
            "3:00 AM",
            "6:00 AM",
            "9:00 AM",
            "12:00 PM",
            "3:00 PM",
            "6:00 PM",
            "9:00 PM",
        ],
        datasets: [
            {
                label: "Revenue",
                data: [5000, 20000, 15000, 8000, 20000, 10000, 20000],
                fill: true,
                pointRadius: 6,
                pointBackgroundColor: "#FD4D15",
                lineTension: 0.5,
                backgroundColor: function (context: {
                    chart: {
                        canvas: {
                            getContext: (arg0: string) => {
                                (): any;
                                new (): any;
                                createLinearGradient: {
                                    (arg0: number, arg1: number, arg2: number, arg3: any): any;
                                    new (): any;
                                };
                            };
                        };
                        height: any;
                    };
                }) {
                    var gradient = context.chart.canvas
                        .getContext("2d")
                        .createLinearGradient(0, 0, 0, context.chart.height);
                    gradient.addColorStop(0, "#FEB8A1"); // start color
                    gradient.addColorStop(1, "white"); // end color
                    return gradient;
                },
            },
        ],
    };
    const YesterdayLinearChartData: any = {
        labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
        datasets: [
            {
                label: "Revenue",
                data: [5000, 20000, 15000, 8000, 20000, 10000, 20000],
                fill: true,
                pointRadius: 6,
                pointBackgroundColor: "#FD4D15",
                lineTension: 0.5,
                backgroundColor: function (context: {
                    chart: {
                        canvas: {
                            getContext: (arg0: string) => {
                                (): any;
                                new (): any;
                                createLinearGradient: {
                                    (arg0: number, arg1: number, arg2: number, arg3: any): any;
                                    new (): any;
                                };
                            };
                        };
                        height: any;
                    };
                }) {
                    var gradient = context.chart.canvas
                        .getContext("2d")
                        .createLinearGradient(0, 0, 0, context.chart.height);
                    gradient.addColorStop(0, "#FEB8A1"); // start color
                    gradient.addColorStop(1, "white"); // end color
                    return gradient;
                },
            },
        ],
    };
    const Last7DaysLinearChartData: any = {
        labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
        datasets: [
            {
                label: "Revenue",
                data: [5000, 20000, 15000, 8000, 20000, 10000, 20000],
                fill: true,
                pointRadius: 6,
                pointBackgroundColor: "#FD4D15",
                lineTension: 0.5,
                backgroundColor: function (context: {
                    chart: {
                        canvas: {
                            getContext: (arg0: string) => {
                                (): any;
                                new (): any;
                                createLinearGradient: {
                                    (arg0: number, arg1: number, arg2: number, arg3: any): any;
                                    new (): any;
                                };
                            };
                        };
                        height: any;
                    };
                }) {
                    var gradient = context.chart.canvas
                        .getContext("2d")
                        .createLinearGradient(0, 0, 0, context.chart.height);
                    gradient.addColorStop(0, "#FEB8A1"); // start color
                    gradient.addColorStop(1, "white"); // end color
                    return gradient;
                },
            },
        ],
    };
    const Last30DaysLinearChartData: any = {
        labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
        ],
        datasets: [
            {
                label: "Revenue",
                data: [5000, 20000, 15000, 8000, 20000, 10000, 20000],
                fill: true,
                pointRadius: 6,
                pointBackgroundColor: "#FD4D15",
                lineTension: 0.5,
                backgroundColor: function (context: {
                    chart: {
                        canvas: {
                            getContext: (arg0: string) => {
                                (): any;
                                new (): any;
                                createLinearGradient: {
                                    (arg0: number, arg1: number, arg2: number, arg3: any): any;
                                    new (): any;
                                };
                            };
                        };
                        height: any;
                    };
                }) {
                    var gradient = context.chart.canvas
                        .getContext("2d")
                        .createLinearGradient(0, 0, 0, context.chart.height);
                    gradient.addColorStop(0, "#FEB8A1"); // start color
                    gradient.addColorStop(1, "white"); // end color
                    return gradient;
                },
            },
        ],
    };
   
    const handleRevenueModel = (model: any) => {
        setRevenueModel(model);
    };  
    const handleShowCart = (cart: string) => {
        setShowCart(cart);
    };

    const labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
	];

	const WeeklyLinearChartData: any = {
		labels: [
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
			"Sunday",
		],
		datasets: [
			{
				label: "Revenue",
				data: [5000, 20000, 15000, 8000, 20000, 10000, 20000],
				fill: true,
				pointRadius: 6,
				pointBackgroundColor: "#FD4D15",
				lineTension: 0.5,
				backgroundColor: function (context: {
					chart: {
						canvas: {
							getContext: (arg0: string) => {
								(): any;
								new (): any;
								createLinearGradient: {
									(arg0: number, arg1: number, arg2: number, arg3: any): any;
									new (): any;
								};
							};
						};
						height: any;
					};
				}) {
					var gradient = context.chart.canvas
						.getContext("2d")
						.createLinearGradient(0, 0, 0, context.chart.height);
					gradient.addColorStop(0, "#FEB8A1"); // start color
					gradient.addColorStop(1, "white"); // end color
					return gradient;
				},
			},
		],
	};

	const options = {
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				grid: {
					display: false,
				},
			},
		},
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Chart.js Line Chart",
			},
		},
	};

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <h1 className="text-[1.5rem] font-semibold">N 356,000</h1>
                <div className="flex items-center space-x-2">
                    {/* {charts.map((chart) => (
                        <button
                            key={chart}
                            className={`${
                                showCart === chart
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            } px-3 py-1 rounded-md`}
                            onClick={() => handleShowCart(chart)}
                        >
                            {chart}
                        </button>
                    ))} */}
                </div>
            </div>
            <div className="flex justify-between">
				<h1 className="font-medium text-2xl lg:text-3xl">Total Revenue</h1>
				<div>
					<div
						onClick={() => setRevenueModel((prev) => !prev)}
						className="flex items-center bg-color1 text-white rounded-lg py-2 sm:py-3 px-2 sm:px-4 cursor-pointer"
					>
						<h3 className="font-medium">{showCart}</h3>
						<span className="text-2xl ml-12 font-medium">
							<RiArrowDownSLine />
						</span>
					</div>
					{revenueModel && (
						<div className="bg-white rounded-lg p-2 sm:p-5 shadow-xl max-w-full w-full">
							<ul className="font-thin">
								{charts.map((chart, i) => (
									<li
										className={`cursor-pointer text-[0.75rem] sm:text-base hover:bg-color1 text-color1 hover:text-white font-[500] hover:p-2 hover:rounded-lg ${showCart === chart ? "text-white" : ""}` }
										key={i}
										onClick={() => setShowCart(chart)}
									>
										{chart}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
            <div className="mt-4">
                <Line
                    data={
                        showCart === "Monthly"
                            ? monthLinearChartData
                            : showCart === "Weekly"
                            ? WeeklyLinearChartData
                            : showCart === "Today"
                            ? TodayLinearChartData
                            : showCart === "Yesterday"
                            ? YesterdayLinearChartData
                            : showCart === "Last 7 days"
                            ? Last7DaysLinearChartData
                            : Last30DaysLinearChartData
                    }
                    options={{
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}
export default Chart