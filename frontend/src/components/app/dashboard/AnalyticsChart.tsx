"use client"
import React from "react"
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

interface AnalyticsData {
    analytics: { date: string; total_amount: number }[]
    prediction_time: string
}

interface Props {
    data: AnalyticsData
}

export default function AnalyticsChart({ data }: Props) {
    const stats = [
        {
            name: "Labelled today",
            stat: data.analytics[0].total_amount,
            previousStat: data.analytics[1].total_amount,
            change:
                data.analytics[0].total_amount -
                data.analytics[1].total_amount * 100,
            changeType: "increase",
        },
        {
            name: "Labelled yesterday",
            stat: data.analytics[1].total_amount,
            previousStat: "56.14%",
            change: "2.02%",
            changeType: "increase",
        },
        {
            name: "Prediction time",
            stat: data.prediction_time ?? 0,
            previousStat: "28.62%",
            change: "4.05%",
            changeType: "decrease",
        },
    ]
    function getDayOfWeek(dateString: string) {
        const date = new Date(dateString)

        const weekdays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ]

        const dayOfWeek = date.getDay()

        const weekdayName = weekdays[dayOfWeek]

        return weekdayName
    }

    const dataWithDayOfWeek = data.analytics.map((item: any) => ({
        ...item,
        dayOfWeek: item.date,
    }))

    return (
        <div className="h-full w-full mx-auto max-w-7xl ">
            <div>
                <h3 className="text-base font-semibold leading-6 text-gray-900 mx-5">
                    Last 30 days
                </h3>
                <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 mx-5 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
                    {stats.map((item) => (
                        <div key={item.name} className="px-4 py-5 sm:p-6">
                            <dt className="text-base font-normal text-gray-900">
                                {item.name}
                            </dt>
                            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                                    {item.stat}
                                    <span className="ml-2 text-sm font-medium text-gray-500">
                                        from {item.previousStat}
                                    </span>
                                </div>

                                <div
                                    className={classNames(
                                        item.changeType === "increase"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800",
                                        "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
                                    )}
                                >
                                    {item.changeType === "increase" ? (
                                        <ArrowUpIcon
                                            className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <ArrowDownIcon
                                            className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                                            aria-hidden="true"
                                        />
                                    )}

                                    <span className="sr-only">
                                        {" "}
                                        {item.changeType === "increase"
                                            ? "Increased"
                                            : "Decreased"}{" "}
                                        by{" "}
                                    </span>
                                    {item.change}
                                </div>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
            <div style={{ height: "500px", width: "1000px" }} className="mt-10">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={1000}
                        height={300}
                        data={dataWithDayOfWeek}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="dayOfWeek" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="total_amount"
                            fill="#212121"
                            activeBar={
                                <Rectangle fill="lightgray" stroke="black" />
                            }
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
