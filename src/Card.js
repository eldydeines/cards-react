import React, { useState, useEffect, useRef } from "react";
import Alert from "./Alert";
import axios from "axios";

const Card = () => {
    const [deck, setDeck] = useState([]);
    const timerId = useRef(0);
    const [src, setSrc] = useState("");
    const [outOfCards, setOutOfCards] = useState(false);

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
            if (deck.length !== 0) {
                setSrc(deck[0]);
                setDeck(deck.filter(img => img !== deck[0]));

            } else {
                setOutOfCards(true);
            }
        }, 250);

        return () => {
            clearInterval(timerId.current);
            timerId.current = null;
            setOutOfCards(false);
        }
    }, [deck]);


    return (
        <div>

            {outOfCards
                ? <Alert />
                : <img className="deck-img" alt="" src={src}></img>
            }
        </div>
    )

}

export default Card;