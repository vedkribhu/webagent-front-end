import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Playground from './Playground';
import sampleResponse from './sample-response.json';


const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: white;
`;

const App = () => {
  // Initialize the results with sample-response.json data
  const { result } = sampleResponse;


  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<Array<string>>([...result]);

  console.log('isLoading', isLoading);

  return (
    <Container>
      <Sidebar isLoading={isLoading} setIsLoading={setIsLoading} setResults ={setResults} results={results}/>
      <Playground isLoading={isLoading} setIsLoading={setIsLoading} setResults ={setResults} results={results}/>
    </Container>
  );
};

export default App;