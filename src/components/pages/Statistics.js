import React, { useState, useEffect, useRef } from 'react';
import CanvasJSReact from '../../js/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Statistics = ({user}) => {

    const totalQuantityChart = useRef(null);
    const itemsInStockChart = useRef(null);

    const [dailyQuantity, setDailyQuantity] = useState([]);
    const [itemsInStock, setItemsInStock] = useState([]);

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
                for(var i = 0; i < data.length; i++){
                    data[i].x = new Date(data[i]['date']);
                    data[i].y = data[i]['quantity'];
                    delete data[i].date;
                    delete data[i].quantity;
                }

                setDailyQuantity(data);
                console.log(data);
                totalQuantityChart.current.render();
            }).catch(err => {
                console.error('Caught error: ', err);
            })
        }
    }

    const fetchItemStock = async () => {
        if (user && user.warehouseId)
        {
            fetch(`http://localhost:9090/inventory/records/instock/${user.warehouseId}`, {
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
                let chartData = [
                    { y: (data[0].itemsInStock/(data[0].itemsOutOfStock+data[0].itemsInStock)*100), label: "Items in Stock", quantity: data[0].itemsInStock},
                    { y: (data[0].itemsOutOfStock/(data[0].itemsOutOfStock+data[0].itemsInStock)*100), label: "Items out of Stock", quantity: data[0].itemsOutOfStock},
                  ]

                setItemsInStock(chartData);
                itemsInStockChart.current.render();
            }).catch(err => {
                console.error('Caught error: ', err);
            })
        }
    }

    useEffect(() => {
        fetchDailyQuantity();
        fetchItemStock();
    }, [])

    const optionsQuantityChart = {
        animationEnabled: true,
        backgroundColor: "transparent",
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
        }]
    }

    const optionsItemsInStock = {
        animationEnabled: true,
        backgroundColor: "transparent",
        title: {
            text: "Warehouse Item Status"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {quantity} ({y} %)",
            dataPoints: itemsInStock
        }]
    }

    return(
    <div className="container-fluid home-container page-wrapper">
        <div className="row justify-content-md-center pt-5">
            <div className="col text-center">
                <CanvasJSChart key={dailyQuantity.toString()} options = {optionsQuantityChart} onRef = {ref => totalQuantityChart.current = ref}/>
            </div>
            <div className="col text-center">
                <CanvasJSChart key={itemsInStock.toString()} options = {optionsItemsInStock} onRef = {ref => itemsInStockChart.current = ref}/>
            </div>
        </div>
    </div>
    );
};

export default Statistics;