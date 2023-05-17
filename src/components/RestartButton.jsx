import { styled } from 'styled-components';

const RestartButton = () => {
    return (
        <Button onClick={() => window.location.reload()}>
            <h1>Play again</h1>
        </Button>
    )
}

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 120px;
    height: 35px;

    position: fixed;
    top: 20px;
    right: 10px;

    background-color: white;
    border: 1px solid gray;
    border-radius: 15px;
    cursor: pointer;

    h1 {
        font-family: 'Recursive';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        text-align: center;

        color: #333333;
    }
`;

export default RestartButton