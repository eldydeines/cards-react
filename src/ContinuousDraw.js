import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Alert from "./Alert";
import './DrawOne.css';

const ContinuousDraw = () => {
    const [deck, setDeck] = useState([]);
    const timerId = useRef(0);
    const [src, setSrc] = useState("");
    const [btnText, setBtnText] = useState("Start Draw");

    //get a shuffled deck once
    useEffect(() => {
        async function getNewDeck() {
            const wholeDeck = await axios.get(`http://deckofcardsapi.com/api/deck/new/draw/?count=52`);
            setDeck((wholeDeck.data.cards).map(({ image }) => image));
        };
        getNewDeck();
    }, []);


    useEffect(() => {

        timerId.current = setInterval(() => {

            setSrc(deck[0]);

            setDeck(deck.filter(img => img !== deck[0]));
            if (deck.length === 0) {
                clearInterval(timerId.current);
                timerId.current = null;
            }
        }, 250)

        return () => {
            clearInterval(timerId.current);
            timerId.current = null;
        }
    }, [btnText]);

    const flipBtn = () => {
        if (btnText == "Stop Draw") {
            setBtnText("Start Draw");
            clearInterval(timerId.current);
            timerId.current = 0;
        }
        else {
            setBtnText("Stop Draw");
        }
    }

    return (
        <div>
            <button className="deck-btn" onClick={flipBtn}>{btnText}</button>
            <img className="deck-img" alt="" src={src}></img>
        </div>
    )

}

export default ContinuousDraw;