import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { styled } from "styled-components";

import images from '../assets/images';

const defaultInput = 4;
const WelcomeScreen = ({ setGameOn, generateQuestions }) => {
    const [inputValue, setInputValue] = useState(defaultInput);

    return (
        <Wrapper>
            <div className="logo">
                <img src={images.logo} alt="App-logo" />
                <h1>ZapRecall</h1>
            </div>
            <button
                data-test="start-btn"
                onClick={() => {
                    setGameOn(true);
                    if (inputValue && (inputValue > 0 && inputValue < 50)) {
                        generateQuestions(inputValue);
                    }
                }}
            >
                Iniciar Recall!
            </button>
            <h2>
                How many questions do you want to play with?<br />
                (Choose between 1 and 50)
            </h2>
            <div className="define-amount">
                <button onClick={() => setInputValue(
                    prevState => prevState - 1
                )}>-</button>
                <input type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    onKeyUp={(e) => {
                        if (inputValue < 0 || inputValue > 50) return;
                        if (e.key === "Enter") {
                            setGameOn(true);
                            generateQuestions(inputValue);
                        }
                    }}
                />
                <button onClick={() => setInputValue(
                    prevState => prevState + 1
                )}>+</button>
            </div>
        </Wrapper>
    )
}

WelcomeScreen.propTypes = {
    setGameOn: PropTypes.func,
    generateQuestions: PropTypes.func,
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 70px;

    position: fixed;
    top: 0;
    left: 0;
    
    width: 100%;
    height: 100%;

    z-index: 10;

    .logo {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 10px;

        margin-top: -150px;

        img {
            width: 136px;
            height: 181px;
        }
    }
    
    .logo>h1 {
        font-family: 'Righteous';
        font-style: normal;
        font-weight: 400;
        font-size: 36px;

        color: #FFFFFF;
    }

    h2 {
        font-family: 'Recursive';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;

        color: #FFFFFF;
        text-align: center;
    }

    button {
        width: 246px;
        height: 54px;

        background: #FFFFFF;
        border: 1px solid #D70900;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
        border-radius: 5px;

        font-family: 'Recursive';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;

        text-align: center;

        color: #D70900;
        cursor: pointer;
    }

    .define-amount {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;

        margin-top: -55px;

        input {
            width: 150px;
            height: 40px;
    
            border: 1px solid grey;
            border-radius: 15px;
    
            text-align: center;
            font-size: 20px;
    
            &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            }
        }

        button {
            width: 40px;
            height: 40px;

            border-radius: 50%;
        }
    }
`;

export default WelcomeScreen