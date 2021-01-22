import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'

const ItemHistoryEntry = ({timestamp, quantity, trend}) => {
    let formattedTime = new Date(timestamp).toUTCString();

    let trendIcon = "";
    if (trend)
    {
        if(trend === "up") trendIcon = (<FontAwesomeIcon icon={faAngleDoubleUp} color="green" style={{fontSize: "20px"}}/>);
        else { trendIcon = (<FontAwesomeIcon icon={faAngleDoubleDown} color="red" style={{fontSize: "20px"}}/>); }
    }

    return(
    <div className="shadow-sm p-3 mb-5 bg-white rounded entry-wrapper">
        <div className="item-history-entry">
            <div data-testid="item-entry-body" className="row d-flex align-items-center justify-content-between">
                <div className="col-10 col-sm d-flex align-items-center">
                    {formattedTime}
                </div>
                <div className={`col-1 col-sm-1 p-2 text-white d-flex justify-content-center ${quantity > 0 ? "bg-success" : "bg-danger"} entry-quantity`}>
                    {quantity}
                </div>
                <div className="col-1 col-sm-1 d-flex justify-content-center">
                    {trendIcon}
                </div>
            </div>  
        </div>
    </div>
    
    );
};

export default ItemHistoryEntry;