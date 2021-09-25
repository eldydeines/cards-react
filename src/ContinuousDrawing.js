import React, { useState } from "react";
import Card from "./Card"

const ContinuousDrawing = () => {

    const [btnText, setBtnText] = useState("Stop Drawing");
    const [cardVisible, setCardVisible] = useState(true);
    const toggleDraw = () => {
        setCardVisible(!cardVisible);
        if (cardVisible) {
            setBtnText("Start Drawing");
        }
        else {
            setBtnText("Stop Drawing");
        }

    }

    return (
        <div>
            <button onClick={toggleDraw}>{btnText}</button>
            {cardVisible && <Card />}
        </div>
    )
}

export default ContinuousDrawing;