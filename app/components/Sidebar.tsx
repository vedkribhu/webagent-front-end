import React, { use, useEffect } from 'react';
import styled from 'styled-components';
import { IoPlayCircle } from "react-icons/io5";
import { MdRestartAlt } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";

const SidebarContainer = styled.div`
  flex: 0.3;
  margin-right: 6px;
  border-right: 1px solid #ccc;
  background-color: #ffffff;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
  border-radius: 8px;
`;

const SidebarSuggestions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PromptSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PromptInput = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  background-color: #f2f2f2;
  border-radius: 8px;
  margin-bottom: 4px;
  font-size: 14px;
  color: black;
  outline: none;
  :focus {
    border: 1px solid #0070f3;
  }
`;

const PromptButtonSection = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
`;

const PromptButton = styled.button`
  padding: 8px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
`;

const SuggestionItemContainer = styled.div`
    background-color: #f2f2f2;
    padding: 8px;
    display: flex;
    align-items: center;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.2s;
    color: #333;
    gap: 8px;
    padding: 16px 12px;
    &:hover {
      background-color: #e0e0d4;
    }
`;

const SuggestionIcon = styled.img`
  width: 24px;
  height: 24px;
  background-color: #ccc;
  margin-right: 8px;
`;

const SuggestionText = styled.div`
  display: flex;
  flex-direction: column;
`;

const SuggestionFirstLine = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const SuggestionSecondLine = styled.div`
  font-size: 12px
`;

const PlayButton = styled(IoPlayCircle)`
  font-size: 48px;
  color: #0070f3;
  cursor: pointer;
  :hover {
    color: #0056b3;
  }
`;

const StartOverButton = styled(MdRestartAlt)`
  font-size: 32px;
  cursor: pointer;
`;

const StopButton = styled(FaRegStopCircle)`
  font-size: 32px;
  cursor: pointer;
`;

const PromptButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #222;
  &:hover {
    color: grey;
  }
`;

const PromptButtonText = styled.div`
  font-size: 10px;
  font-weight: 500;
`;

type SuggestionItem = { firstLine: string, secondLine: string, icon: string };

const SuggestionItem = function ({ item, onClick }: { item: SuggestionItem, onClick: (item: SuggestionItem) => void }) {
  return (
    <SuggestionItemContainer onClick={() => onClick(item)}>
      <SuggestionIcon src={item.icon} />
      <SuggestionText>
        <SuggestionFirstLine>{item.firstLine}</SuggestionFirstLine>
        <SuggestionSecondLine>{item.secondLine}</SuggestionSecondLine>
      </SuggestionText>
    </SuggestionItemContainer>
  )
}

function textAreaAdjust(element: HTMLTextAreaElement) {
  element.style.height = "1px";
  element.style.height = (25 + element.scrollHeight) + "px";
}

type SidebarProps = {
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void,
  results: Array<string>,
  setResults: (results: Array<string>) => void,
}

const mock_url = 'https://d044ae62-7576-40c3-9aa1-860c241d7bb9.mock.pstmn.io/runagent';
const actual_url = 'http://ec2-13-233-95-205.ap-south-1.compute.amazonaws.com:5000/runagent';

const Sidebar = (
  { isLoading, setIsLoading, results, setResults }: SidebarProps
) => {
  const [command, setCommand] = React.useState('');

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaAdjust(textAreaRef.current!);
  }, [command]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // send an API request to the backend and put a loading state on the button
    setIsLoading(true);
    const response = await fetch(actual_url, {
      method: 'POST',
      body: JSON.stringify({ prompt: command }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      referrerPolicy: "unsafe-url" 
    });
    const { result } = await response.json();
    setResults(result);

    setIsLoading(false);
  }


  const items = [
    {
      firstLine: 'Add the book Zero to One',
      secondLine: "in my Amazon cart",
      icon: 'https://www.amazon.com/favicon.ico'
    },
    {
      firstLine: "What's the top post",
      secondLine: "on Hackernews",
      icon: 'https://news.ycombinator.com/favicon.ico'
    },
    {
      firstLine: 'Reserve a table at Fogo de Chão',
      secondLine: "in San Jose for 2 people via OpenTable",
      icon: 'https://www.opentable.com/favicon.ico'
    },
    {
      firstLine: 'How much did NVIDIA stock',
      secondLine: "gain today?",
      icon: 'https://svgsilh.com/svg/149421.svg'
    }
  ]

  return (
    <SidebarContainer>
      <SidebarSuggestions>
        {items.map((item, index) => (
          <SuggestionItem
            key={index}
            item={item}
            onClick={() => setCommand(`${item.firstLine} ${item.secondLine}`)}
          />
        ))}
      </ SidebarSuggestions>

      <PromptSection>
        <PromptInput
          placeholder="Write a command..."
          value={command}
          onChange={(e) => {
            setCommand(e.target.value)
          }
          }
          ref={textAreaRef}
        />

        <PromptButtonSection>
          <PromptButtonContainer>
            <button onClick={(e) => {
              setIsLoading(false);
              setResults([]);
              setCommand('');
              e.preventDefault();
            }}>
              <StartOverButton />
              <PromptButtonText>Start Over</PromptButtonText>
            </button>
          </PromptButtonContainer>

          <button type='submit' onClick={onSubmit} disabled={isLoading}>
            <PlayButton />
          </button>

          <PromptButtonContainer>
            <button onClick={(e) => {
              setIsLoading(false);
              setResults([]);
              setCommand('');
              e.preventDefault();
            }}>
              <StopButton />
              <PromptButtonText>Stop</PromptButtonText>
            </button>
          </PromptButtonContainer>

        </PromptButtonSection>
      </PromptSection>


    </SidebarContainer>
  );
};

export default Sidebar;