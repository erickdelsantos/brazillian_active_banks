import Card from 'react-bootstrap/Card';


const BanksList = ( {banks, handleRemoveBank} ) => {

  return banks.map( bank => {

    return (

      <Card className="mt-2" KEY={bank.ispb}>
        <Card.Body>
        <span><strong>{bank.name}</strong></span>
        <br/>
        <span>Razão Social: <em>{bank.fullName}</em></span>
        <br/>
        <span>Código: { bank.code ? ( bank.code ) : ( <em>Não tem código</em> ) }</span>
        <br/>
        <span>ISPB: {bank.ispb}</span>
        </Card.Body>
      </Card>

    );
  
  });
  
}

export default BanksList;