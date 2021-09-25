import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "./Alert";
import './DrawOne.css';


const DrawOne = () => {
    const [src, setSrc] = useState("");
    const [deck, setDeck] = useState("");
    const [counter, setCounter] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    const addCard = async () => {
        setSrc(deck.cards[counter].image);
        setCounter(counter + 1);
        console.log(counter, deck.cards[counter]);
        if (counter === 51) {
            setIsGameOver(true);
            setCounter(0);
        }
    }
    //get a shuffled deck once
    useEffect(() => {
        async function getNewDeck() {
            const wholeDeck = await axios.get(`http://deckofcardsapi.com/api/deck/new/draw/?count=52`);
            setDeck(wholeDeck.data);
        };
        getNewDeck();
    }, []);

    return (
        <div>

            {isGameOver ?
                <Alert /> :
                //(<h2>All Done!</h2>) :
                (<button className="deck-btn" onClick={addCard}>Click for A Card</button>)}
            <div>
                <img className="deck-img" alt="" src={src}></img>
            </div>
        </div>
    )

}

export default DrawOne;