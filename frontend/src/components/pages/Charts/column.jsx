import ApexCharts from 'apexcharts';
import React, { useEffect } from "react";

const Column = ({ opt, id }) => {

    // start column chart
    useEffect(() => {
        const apexChart = "#" + id;
        var options = opt;

        var chart = new ApexCharts(document.querySelector(apexChart), options);
        chart.render();

        return () => chart.destroy();
    }, []);

    return (
        <div className="col-lg-4">
            <div className="card card-custom gutter-b">
                <div className="card-header h-auto">
                    <div className="card-title py-5">
                        <h3 className="card-label">Column Chart</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div id={id}></div>
                </div>
            </div>
        </div>
    )
}
export default Column;