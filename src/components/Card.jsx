import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { styled } from 'styled-components';

import images from '../assets/images';

const options = [
    {
        text: 'Não lembrei',
        color: '#FF3030',
        dataTest: 'no-btn',
    },
    {
        text: 'Quase não lembrei',
        color: '#FF922E',
        dataTest: 'partial-btn',
    },
    {
        text: 'Zap!',
        color: '#2FBE34',
        dataTest: 'zap-btn',
    }
];

const Card = ({ question, answer, index, setResults }) => {
    const [clicked, setClicked] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [cardStatus, setCardStatus] = useState({
        answered: false,
        option: '',
        icon: images.arrowPlay,
        dataTest: 'play-btn',
    });

    const handleChoice = (choice) => {
        if (cardStatus.answered) {
            return;
        }

        setClicked(false);

        const changeStatus = (option, icon) => {
            const dataTest = option === 'red'
                ? 'no-icon'
                : option === 'orange' ? 'partial-icon' : 'zap-icon';

            setCardStatus(prevState => ({
                ...prevState,
                answered: true,
                option,
                icon,
                dataTest,
            }));
        };

        switch (choice) {
            case 'Não lembrei':
                setResults(prevState => ({
                    ...prevState,
                    answered: prevState.answered + 1,
                    iconsType: [...prevState.iconsType, 'red'],
                }));
                changeStatus('red', images.wrong);
                break;
            case 'Quase não lembrei':
                setResults(prevState => ({
                    ...prevState,
                    answered: prevState.answered + 1,
                    iconsType: [...prevState.iconsType, 'orange'],
                }));
                changeStatus('orange', images.almost);
                break;
            case 'Zap!':
                setResults(prevState => ({
                    ...prevState,
                    answered: prevState.answered + 1,
                    iconsType: [...prevState.iconsType, 'green'],
                }));
                changeStatus('green', images.check);
                break;
            default:
                break;
        }
    };

    return (
        <CardWrapper
            data-test="flashcard"
            clicked={clicked}
            flipped={flipped}
            cardStatus={cardStatus}
        >
            {!clicked && <div className={cardStatus.answered
                ? "answered-card" : "initial-card"}>
                <h2 data-test="flashcard-text">Pergunta {index}</h2>
                <img
                    data-test={cardStatus.dataTest}
                    src={cardStatus.icon}
                    alt="Icon to see the question"
                    onClick={() => { !flipped && setClicked(true) }}
                />
            </div>}
            {clicked && <div className="question-answer">
                <p data-test="flashcard-text">{flipped ? answer : question}</p>
                <img
                    data-test="turn-btn"
                    id="flip-icon"
                    onClick={() => setFlipped(true)}
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
                                onClick={() => handleChoice(option.text)}
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
    height: ${props => props.clicked
        ? props.flipped ? 'auto' : '135px'
        : 'auto'};
    
    background: #FFFFFF;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
    border-radius: 5px;

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
        color: ${props => props.cardStatus.option}
    }

    .question-answer {   
        height: ${props => props.flipped ? 'auto' : 'fit-content'};
        p {
            font-family: 'Recursive';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;          
            color: #333333;
            text-align: start;
        }   

        #flip-icon {       
            display: ${props => props.flipped ? 'none' : 'flex'};
            position: absolute;
            bottom:6px;
            right: 15px;
    
            width: 30px;
            height: 20px;

            cursor: pointer;
        }
    
        .options {
            display: ${props => props.flipped ? 'flex' : 'none'};
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
            gap:8px;

            margin: 0 auto;            
        }
    }
`;

const OptionBox = styled.div`  
    margin: 20px auto -45px;
    div {
        display: flex;
        align-items: center;
        justify-content: center;
    
        width: 100px;  
        height: 50px;
    
        color: #FFFFFF;
        background-color: ${props => props.bg};      
        border-radius: 5px;

        cursor: pointer;
    }
    div>h3 {
        width: 100%;

        font-family: 'Recursive';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        text-align: center;

        color: #FFFFFF;
    }
`;

export default Card;