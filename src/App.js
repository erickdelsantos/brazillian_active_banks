import { useEffect, useState, useReducer } from 'react';
import BanksList from './BanksList';
import Search from './Search';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const banksReducer = (state, action) => {

  switch( action.type ) {

    case 'SET_BANKS':

      return action.payload;
    
    case 'REMOVE_BANK':

      return state.filter(
        bank => action.payload.id !== bank.id
      );

    default:

      throw new Error();

  }

};


const App = () => {

  const [searchText,setSearchText] = useState(
  
    localStorage.getItem('searchText') || ''
  
  );


  const [isLoading, setIsLoading] = useState(false);


  const [banks, dispatchBanks] = useReducer(
    banksReducer,
    []
  );


  const handleSearch = event => {
  
    setSearchText( event.target.value );

  }


  const handleRemoveCourse = bank => {

    dispatchBanks({
    
      type: 'REMOVE_BANK',
      payload: bank
    
    });

  }


  useEffect( () => {
  
    localStorage.setItem( 'searchText', searchText );
  
  }, [searchText]);


  useEffect(() => {

    fetch('https://brasilapi.com.br/api/banks/v1')
      .then(response => response.json())
      .then(result => {
        dispatchBanks({
          type: 'SET_BANKS',
          payload: result
        });
      })
      .catch((e) => console.log("Error fetching banks from Brasil API ... " + e))

  }, []);


  const filteredBanks = banks.filter( bank => {
    
    return bank.name.toLowerCase().includes( searchText.toLowerCase() ) //|| bank.code.includes( searchText );

  })


  return (
    
    <Container>

      <Row>

        <Col>

          <h1>Lista de bancos ativos no Brasil</h1>

        </Col>
      
      </Row>

        <hr />

      <Row>

        <Col>

            <Search value={searchText} onSearch={handleSearch} />

            { isLoading ? (
            
                <p>Carregando bancos...</p>

            ) : (
            
                <BanksList banks={filteredBanks} handleRemoveCourse={handleRemoveCourse} />

            )}

        </Col>
      
      </Row>

    </Container>
  );

}

export default App;
