import React from 'react';
import { Container, Row, Button } from 'reactstrap';
import styled from 'styled-components';

import image1 from '../../../../assets/section2/PhotoBackground.png';
import appStore from '../../../../assets/icons/apple.png';
import googlePlay from '../../../../assets/icons/google_play.png';

const ImageMain = styled.img`
  width: auto;
  height: 632px;
  margin-top: -15px;
  margin-left: -17px;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 600px;
  margin-top: -150px;
`;

// const Space = styled.div`
//   width: 100%;
//   height: 200px;
//   background-color: white;
// `;

const TextContainer = styled.div`
  width: 100%;
  margin-top: -610px;
  color: white;

  > h2 {
    font-size: 86px;
    padding: 50px 80px;
    font-weight: bold;
  }

  > p {
    text-transform: uppercase;
  }
`;

const MobileAppImg = styled.img`
  width: 38px;
  height: 38px;
  margin-right: 15px;
`;

const AppStoreButton = styled(Button)`
  background: #fff;
  padding: 16px 50px 16px 30px;

  > div {
    align-items: center;
  }

  &:hover {
    background: #fff;
  }
`;

const AppStoreButton__Text = styled.div`
  color: #000;
  text-align: left;

  > p {
    opacity: 0.5;
    margin: 0;
  }
`;

const GooglePlayButton = styled(Button)`
  background: #00dabf;
  padding: 16px 50px 16px 30px;

  > div {
    align-items: center;
  }

  &:hover {
    background: #00dabf;
  }
`;

const GooglePlayButton__Text = styled.div`
  color: #fff;
  text-align: left;

  > p {
    margin: 0;
  }
`;

const Section3 = () => {
  return (
    <Container>
      <Row>
        {/* <Space></Space> */}
        <MainContainer>
          <ImageMain id="img" src={image1} alt="img"></ImageMain>
          <TextContainer>
            <h2>Biggest share event venue accommodation website</h2>
            <p>Our application</p>
            <Row>
              <AppStoreButton>
                <Row>
                  <MobileAppImg src={appStore} alt="appStore"></MobileAppImg>
                  <AppStoreButton__Text>
                    <p>Get it on the</p>
                    <h3>App Store</h3>
                  </AppStoreButton__Text>
                </Row>
              </AppStoreButton>

              <GooglePlayButton href="#">
                <Row>
                  <MobileAppImg src={googlePlay} alt="googlePlay"></MobileAppImg>
                  <GooglePlayButton__Text>
                    <p>Get it on the</p>
                    <h3>Google Play</h3>
                  </GooglePlayButton__Text>
                </Row>
              </GooglePlayButton>
            </Row>
          </TextContainer>
        </MainContainer>
      </Row>
    </Container>
  );
};

export default Section3;
