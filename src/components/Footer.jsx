import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { styled } from 'styled-components';

import images from '../assets/images';

const footerImages = {
    'red': images.wrong,
    'orange': images.almost,
    'green': images.check,
};

const Footer = ({ results }) => {
    const [finalGreeting, setFinalGreeting] = useState({
        imgSrc: '',
        greeting: '',
        message: '',
        endGame: false,
    });
    if (results.answered === results.total && !finalGreeting.endGame) {
        setFinalGreeting(prevState => (results.iconsType.includes('red')
            ? {
                ...prevState,
                imgSrc: images.sad,
                greeting: 'Putz...',
                message: 'Ainda faltam alguns...Mas não desanime!',
                endGame: true,
            }
            : {
                ...prevState,
                imgSrc: images.party,
                greeting: 'Parabéns!',
                message: 'Você não esqueceu de nenhum flashcard!',
                endGame: true,
            }
        ))
    }

    return (
        <FooterWrapper>
            {results.answered === results.total && <div className="final-message">
                <div className="emoji">
                    <img
                        src={finalGreeting.imgSrc}
                        alt="emoji"
                    />
                    <h4>{finalGreeting.greeting}</h4>
                </div>
                <p>{finalGreeting.message}</p>
            </div>}
            <div className="counter">
                <h4>{`${results.answered}/${results.total}`} CONCLUÍDOS</h4>
            </div>
            <div className="icons">
                {results.iconsType.length > 0 && results.iconsType.map((icon, index) => (
                    <img
                        src={footerImages[icon]}
                        alt="icon-image"
                        key={`${icon}-${index}`}
                    />
                ))}
            </div>
        </FooterWrapper>
    )
}

Footer.propTypes = {
    results: PropTypes.object,
};

const FooterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 15px;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 15px;

    width: 100%;
    height: fit-content;
    
    background-color: white;

    h4,p {
        font-family: 'Recursive';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        text-align: center;

        color: #333333;
    }

    .icons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        gap: 5px;

        margin: 0 auto;
    }

    .final-message {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 5px;
        margin: 0 auto;

        .emoji {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;

            h4 {
                font-weight: 700;
            }
        }

        p {
           width: 200px;            
        }
    }
`;

export default Footer;