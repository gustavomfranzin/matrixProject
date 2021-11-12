import { useState, useEffect, useRef  } from 'react';
import styled from 'styled-components';
import { Quotes } from './components';
import { getQuote } from './services';

export function App() {
  const isMounted = useRef(true);

  const [quoteState, setQuoteState] = useState({ 
    quote: '',
    speaker: 'loading...'
  });
  
  const onUpdate = async () => {
    const quote = await getQuote();

    setQuoteState(quote);
  };

  useEffect(() => {
    onUpdate();

      return () => {
        isMounted.current = false;
      };
  }, []);

  return (
    <Content>
      <Quotes {...quoteState} onUpdate={onUpdate} />
    </Content>
  );
}

const Content = styled.div`
  height: 100vh;
  padding: 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
