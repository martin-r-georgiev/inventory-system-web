import React, { useState, useEffect, useRef } from 'react';
import CanvasJSReact from '../../js/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Statistics = ({user}) => {

    const chart = useRef(null);
    const [dailyQuantity, setDailyQuantity] = useState([]);

    const fetchDailyQuantity = async () => {
        if (user && user.warehouseId)
        {
            fetch(`http://localhost:9090/inventory/records/daily/quantity/${user.warehouseId}`, {
                method: 'GET',
                mode: 'cors',
                headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                })
            }).then(res => {
                if(res.ok) return res.json();
                else {
                    return {};
                }
            } )
            .then((data) => {
                console.log("Retreiving item history");

                for(var i = 0; i < data.length; i++){
                    data[i].x = new Date(data[i]['date']);
                    data[i].y = data[i]['quantity'];
                    delete data[i].date;
                    delete data[i].quantity;
                }

                setDailyQuantity(data);
                console.log(data);
                chart.current.render();
            }).catch(err => {
                console.error('Caught error: ', err);
            })
        }
    }

    useEffect(() => {
        fetchDailyQuantity();
    }, [])

    const options = {
        animationEnabled: true,
        title:{
            text: "Total Quantity in Storage (Daily)"
        },
        axisX: {
            valueFormatString: "MMM DD"
        },
        axisY: {
            title: "Items (Quantity)",
        },
        data: [{
            yValueFormatString: "#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: dailyQuantity
            // dataPoints: [
            //     { x: new Date(2017, 0), y: 25060 },
            //     { x: new Date(2017, 1), y: 27980 },
            //     { x: new Date(2017, 2), y: 42800 },
            //     { x: new Date(2017, 3), y: 32400 },
            //     { x: new Date(2017, 4), y: 35260 },
            //     { x: new Date(2017, 5), y: 33900 },
            //     { x: new Date(2017, 6), y: 40000 },
            //     { x: new Date(2017, 7), y: 52500 },
            //     { x: new Date(2017, 8), y: 32300 },
            //     { x: new Date(2017, 9), y: 42000 },
            //     { x: new Date(2017, 10), y: 37160 },
            //     { x: new Date(2017, 11), y: 38400 }
            // ]
        }]
    }


    return(
    <div className="container-fluid home-container page-wrapper">
        <div className="row justify-content-md-center">
            <div className="col text-center">
                <p>Hello, Statistics</p>
                <CanvasJSChart key={dailyQuantity.toString()} options = {options} onRef = {ref => chart.current = ref}/>
            </div>
        </div>
    </div>
    );
};

export default Statistics;