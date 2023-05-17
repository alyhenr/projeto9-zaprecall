import { PropTypes } from 'prop-types';
import { styled } from 'styled-components';

import images from '../assets/images';

const footerImages = {
    'red': images.wrong,
    'orange': images.almost,
    'green': images.check,
};

const Footer = ({ results }) => {
    return (
        <FooterWrapper>
            <div className="counter">
                <h4>{`${results.answered}/${results.total}`} CONCLUÍDOS</h4>
            </div>
            <div className="icons">
                {results.iconsType.length && results.iconsType.map((icon, index) => (
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
    justify-content: center;
    align-items: center;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;

    width: 100%;
    height: 80px;
    
    background-color: white;

    .counter>h4 {
        font-family: 'Recursive';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;

        color: #333333;
    }

    .icons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        gap: 5px;
    }
`;

export default Footer;