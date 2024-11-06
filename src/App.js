import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [currency, setCurrency] = useState([])

  useEffect(() => {
    axios.get("https://api.currencyfreaks.com/v2.0/rates/latest?", {
      params: {
        'apikey': '8f6fecdfedb64622a3aad45096a27f95',
        'symbols': 'CAD,IDR,JPY,CHF,EUR,GBP'
      }
    })
      .then(res => {
        const stringRates = Object.fromEntries(
          Object.entries(res.data.rates).map(([key, value]) => [key, value.toString()])
        );
        setCurrency(stringRates)
      })
  }, [])

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundColor: "#dc7101",
        height: "100vh",
        color: "white"
      }}>
      <div className="container">
        <table class="table table-striped table-hover table-sm">
          <thead>
            <th className='fs-5 fw-bold text-center'>Currency</th>
            <th className='fs-5 fw-bold text-center'>We Buy</th>
            <th className='fs-5 fw-bold text-center'>Exchange Rate</th>
            <th className='fs-5 fw-bold text-center'>We Sell</th>
          </thead>

          <tbody>
            {
              currency && Object.keys(currency).map(item => (
                <tr key={item}>
                  <td className='text-center text-white' style={{ backgroundColor: "#dc7101" }}>{item}</td>
                  <td className='text-center text-white' style={{ backgroundColor: "#dc7101" }}>{parseFloat(currency[item] * 1.05)}</td>
                  <td className='text-center text-white' style={{ backgroundColor: "#dc7101" }}>{parseFloat(currency[item])}</td>
                  <td className='text-center text-white' style={{ backgroundColor: "#dc7101" }}>{parseFloat(currency[item] * 0.95)}</td>
                </tr> 
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <h6>Rate are based from 1 USD</h6>
        <h6>This apllication use API from https://currencyfreaks.com/</h6>
      </div>
    </div>
  );
}

export default App;
