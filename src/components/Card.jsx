import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { styled } from 'styled-components';

import images from '../assets/images';

const options = [
    {
        text: 'Não lembrei',
        color: '#FF3030',
        key: 'red',
        img: images.wrong,
        dataTest: 'no-btn',
    },
    {
        text: 'Quase não lembrei',
        color: '#FF922E',
        key: 'orange',
        img: images.almost,
        dataTest: 'partial-btn',
    },
    {
        text: 'Zap!',
        color: '#2FBE34',
        key: 'green',
        img: images.check,
        dataTest: 'zap-btn',
    }
];

const Card = ({ question, answer, index, setResults }) => {
    const [clicked, setClicked] = useState(0);
    const [flipped, setFlipped] = useState(0);
    const [cardstatus, setCardstatus] = useState({
        answered: false,
        option: '',
        icon: images.arrowPlay,
        dataTest: 'play-btn',
    });

    const handleChoice = (option) => {
        if (cardstatus.answered) {
            return;
        }

        const changeStatus = (option, icon) => {
            const dataTest = option === 'red'
                ? 'no-icon'
                : option === 'orange' ? 'partial-icon' : 'zap-icon';

            setCardstatus(prevState => ({
                ...prevState,
                answered: true,
                option,
                icon,
                dataTest,
            }));
        };

        setClicked(0);
        setResults(prevState => ({
            ...prevState,
            answered: prevState.answered + 1,
            iconsType: [...prevState.iconsType, option.key]
        }));
        changeStatus(option.key, option.img);
    };

    return (
        <CardWrapper
            data-test="flashcard"
            clicked={clicked}
            flipped={flipped}
            cardstatus={cardstatus}
        >
            {clicked === 0 && <div className={cardstatus.answered
                ? "answered-card" : "initial-card"}>
                <h2 data-test="flashcard-text">Pergunta {index}</h2>
                <img
                    data-test={cardstatus.dataTest}
                    src={cardstatus.icon}
                    alt="Icon to see the question"
                    onClick={() => { flipped === 0 && setClicked(1) }}
                />
            </div>}
            {clicked === 1 && <div className="question-answer">
                <p data-test="flashcard-text">{flipped === 1 ? answer : question}</p>
                <img
                    data-test="turn-btn"
                    id="flip-icon"
                    onClick={() => setFlipped(1)}
                    src={images.arrowTurn}
                    alt="Icon to see the answer"
                />
                <div className="options">
                    {options.map(option => (
                        <OptionBox
                            key={option.text}
                            bg={option.color}
                        >
                            <div
                                onClick={() => handleChoice(option)}
                                data-test={option.dataTest}
                            >
                                <h3>{option.text}</h3>
                            </div>
                        </OptionBox>
                    ))}
                </div>
            </div>}
        </CardWrapper>
    )
}

Card.propTypes = {
    question: PropTypes.string,
    answer: PropTypes.string,
    index: PropTypes.number,
    setResults: PropTypes.func,
};

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    position: relative;

    width: 100%;
    height: ${props => props.clicked === 1
        ? props.flipped === 1 ? 'auto' : '135px'
        : 'auto'};
    
    background: ${props => ((props.clicked === 1
        && props.cardstatus.answered) || props.clicked === 0) && "#FFF"
        || "#FFFFD5"};
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
    border-radius: 5px;

    div>h2 {
        font-family: 'Recursive';
        font-style: normal;
        font-weight: 700;
        font-size: 22px;
        line-height: 19px;

        color: ${props => props.cardstatus.answered
        ? props.cardstatus.option : "#333333"};
    }

    .initial-card, .answered-card {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 30px;

        width: 100%;

        img {
            cursor: pointer;
        }
    }

    .answered-card {
        text-decoration: line-through;
        color: ${props => props.cardstatus.option}
    }

    .question-answer {       
        width: 100%;
        height: ${props => props.flipped === 1 ? 'auto' : 'fit-content'};
        p {
            font-family: 'Recursive';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;          
            color: #333333;
            text-align: start;

            word-break: break-all;

            width: 100%;
        }   

        #flip-icon {       
            display: ${props => props.flipped === 1 ? 'none' : 'flex'};
            position: absolute;
            bottom:6px;
            right: 15px;
    
            width: 30px;
            height: 20px;

            cursor: pointer;
        }
    
        .options {
            display: ${props => props.flipped === 1 ? 'flex' : 'none'};
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 25px;

            @media screen and (max-width: 300px){
                gap: 5px;
            }

            width: 100%;

            margin: 20px auto -15px;
            padding: 0 !important;
        }
    }
`;

const OptionBox = styled.div`  
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100px;
    min-width: 70px;
    max-width: 120px;

    padding: 0 !important;
    div {
        display: flex !important;
        align-items: center !important; 
        justify-content: center !important;        
    
        width: 100%;  
        height: 50px;

        @media screen and (max-width: 500px) {           
            height: 60px;
            margin: 0 -5px;
        }
    
        color: #FFFFFF;
        background-color: ${props => props.bg};      
        border-radius: 5px;

        cursor: pointer;

        text-align: center;
    }
    div>h3 {       
        font-family: 'Recursive';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        text-align: center; 

        color: #FFFFFF;
    }
`;

export default Card;