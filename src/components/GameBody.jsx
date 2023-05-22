import { PropTypes } from 'prop-types';
import { styled } from 'styled-components';

import Card from './Card';
import imgs from '../assets/images';

const GameBody = ({ questions, setResults }) => {
    return (
        <Wrapper>
            <Logo>
                <img src={imgs.logo} alt="image of the logo of the App" />
                <h1>ZapRecall</h1>
            </Logo>
            <Cards>
                {questions.map((sample, index) => (
                    <Card
                        key={`${sample.question}-${index}`}
                        question={sample.question}
                        answer={sample.answer}
                        index={index + 1}
                        setResults={setResults}
                    />
                ))}
            </Cards>
        </Wrapper>
    )
}

GameBody.propTypes = {
    questions: PropTypes.array,
    setResults: PropTypes.func,
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    padding: 15px 35px 120px;

    @media screen and (max-width: 350px) {
        padding: 15px 5px 120px;
    }
`;

const Logo = styled.div`    
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 35px;
    
    width: 100%;

    margin: 0 auto 30px;

    img {
        max-width: 52px;
        max-height: 60px;

        width: 20%;
        height: auto;
    }

    h1 {       
        font-family: 'Righteous';
        font-style: normal;
        font-weight: 400;
        font-size: 36px;

        color: #FFFFFF;

        transform: rotate(0.58deg);
    }
`;

const Cards = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    width: 80%;

    margin: 0 auto;

    @media screen and (max-width: 500px) {
        width: 98%;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        padding: 15px;
    }
`;

export default GameBody;