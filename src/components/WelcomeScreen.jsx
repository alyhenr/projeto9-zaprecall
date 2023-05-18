import { PropTypes } from 'prop-types';
import { styled } from "styled-components";

import images from '../assets/images';

const WelcomeScreen = ({ setGameOn }) => {
    return (
        <Wrapper>
            <div className="logo">
                <img src={images.logo} alt="App-logo" />
                <h1>ZapRecall</h1>
            </div>
            <button
                data-test="start-btn"
                onClick={() => setGameOn(true)}
            >
                Iniciar Recall!
            </button>
        </Wrapper>
    )
}

WelcomeScreen.propTypes = {
    setGameOn: PropTypes.func,
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
    /* background-color: black; */

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
`;

export default WelcomeScreen