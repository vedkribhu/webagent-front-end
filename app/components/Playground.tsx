import React from 'react';
import styled from 'styled-components';
import { SlControlPlay } from "react-icons/sl";
import Lottie from 'react-lottie';
import loadingAnimation from '../lotties/loader-8.json';
import SwiperComponent from './SwiperComponent';

const PlaygroundContainer = styled.div`
  padding: 16px;
  display: flex;
  flex: 0.79;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  justify-content: center;
  align-items: center;
  color: #999999;
  background-color: #f2f2f2;
`;

const PlaygroundContent = styled.div`
  padding-top: 15%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const StyledHeading = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #ccc;
  max-width: 520px;
  border-radius: 8px;
  border-radius: 8px;
  height: 80px;
`;

const StepNumber = styled.span`
  background-color: #ccc;
  color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  
`;

const StepsContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StepText = styled.span``;

const StyledIcon = styled(SlControlPlay)`
  font-size: 24px;
  color: #C1C1C1;
`;

const HighlightedPart = styled.span`
  color: #000;
`;

const ResultContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const Step = ({ number, text }: { number: number, text: string | JSX.Element }) => (
  <StepItem>
    <StepNumber>{number}</StepNumber>
    <StepText>{text}</StepText>
  </StepItem>
);


type PlaygroundProps = {
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void,
  results: Array<string>,
  setResults: (results: Array<string>) => void,
}

const Playground = ({ isLoading, setIsLoading, results }: PlaygroundProps) => {
  const steps = [
    <span><HighlightedPart>Type in a query </HighlightedPart> or choose one of the examples on the chat interface to get started</span>,
    <span>We support some websites that require authentication, in which a <HighlightedPart>login button</HighlightedPart> will appear</span>,
    <span>You may <HighlightedPart>interact with the screen</HighlightedPart> to take over control or correct the agent</span>
  ];

  if (isLoading) {
    return (
      <PlaygroundContainer>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: loadingAnimation,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice"
            }
          }}
          height={200}
          width={200}
        />
      </PlaygroundContainer>
    );
  }

  if (results && results.length > 0) {
    return (
      <PlaygroundContainer>
        <SwiperComponent results={results} />
      </PlaygroundContainer>
    );
  }

  return (
    <PlaygroundContainer>
      <PlaygroundContent>
        <StyledIcon />
        <StyledHeading>Chima Playground</StyledHeading>
        <p>Your live preview will start here. To get started:</p>
        <StepsContainer>
          {steps.map((step, index) => (
            <Step key={index} number={index + 1} text={step} />
          ))}
        </StepsContainer>
      </PlaygroundContent>
    </PlaygroundContainer>
  );
};

export default Playground;