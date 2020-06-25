import React from 'react';
import styled from "@emotion/styled";

const Container = styled.div`
    background-color: white;
    min-width:100%;
    min-height: 100vh;
`
const NotFound = () => {
    return (
        <Container>
            <img alt="404"
                 src="https://illustatus.herokuapp.com/?title=Página%20no%20encontrada%20&fill=%234f86ed"/>
        </Container>
    );
};

export default NotFound;
