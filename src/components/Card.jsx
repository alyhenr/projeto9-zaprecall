import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { styled } from 'styled-components';

import images from '../assets/images';

const options = [
    {
        text: 'Não lembrei',
        color: '#FF3030',
    },
    {
        text: 'Quase não lembrei',
        color: '#FF922E',
    },
    {
        text: 'Zap!',
        color: '#2FBE34',
    }
];

const Card = ({ question, answer, index, setResults }) => {
    const [clicked, setClicked] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [cardStatus, setCardStatus] = useState({
        answered: false,
        option: '',
        icon: images.arrowPlay,
    });

    const handleChoice = (choice) => {
        if (cardStatus.answered) {
            return;
        }

        setClicked(false);

        const changeStatus = (option, icon) => {
            setCardStatus(prevState => ({
                ...prevState,
                answered: true,
                option,
                icon,
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
                    iconsType: [...prevState.iconsType, 'orange']
                }));
                changeStatus('orange', images.almost);
                break;
            case 'Zap!':
                setResults(prevState => ({
                    ...prevState,
                    answered: prevState.answered + 1,
                    iconsType: [...prevState.iconsType, 'green']
                }));
                changeStatus('green', images.check);
                break;
            default:
                break;
        }
    };

    return (
        <CardWrapper
            onClick={
                () => clicked
                    ? !flipped && setFlipped(true)
                    : !cardStatus.answered && setClicked(true)
            }
            clicked={clicked}
            flipped={flipped}
            cardStatus={cardStatus}
        >
            {!clicked && <div className={cardStatus.answered
                ? "answered-card" : "initial-card"}>
                <h2>Pergunta {index}</h2>
                <img
                    src={cardStatus.icon}
                    alt="Icon to see the question"
                />
            </div>}
            {clicked && <div className="question-answer">
                <p>{flipped ? answer : question}</p>
                <img id="flip-icon" src={images.arrowTurn} alt="Icon to see the answer" />
                <div className="options">
                    {options.map(option => (
                        <OptionBox key={option.text} bg={option.color}>
                            <div onClick={() => handleChoice(option.text)}>
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
    align-items: flex-start;
    justify-content: space-between;

    position: relative;

    width: 100%;
    
    padding: 15px;
    background: #FFFFFF;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
    border-radius: 5px;

    cursor: pointer;

    .initial-card, .answered-card {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 30px;

        width: 100%;
    }

    .answered-card {
        text-decoration: line-through;
        color: ${props => props.cardStatus.option}
    }

    .question-answer {   
        height: ${props => props.flipped ? 'auto' : '130px'};
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
    div {
        display: flex;
        align-items: center;
        justify-content: center;
    
        width: 100px;  
        height: 50px;
    
        color: #FFFFFF;
        background-color: ${props => props.bg};      
        border-radius: 5px;
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