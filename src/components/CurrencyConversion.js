import currency from "currency-code-map";
import { useEffect, useState } from "react";

import "./CurrencyConversion.css";

const CurrencyConversion = (props) => {
  const [countryCurrency, setCountryCurrency] = useState("");
  const [conversions, setConversions] = useState([]);
  useEffect(() => {
    setCountryCurrency(currency[props.countryCode]);
    const fetchCurrencyConversion = async () => {
      if (countryCurrency !== "") {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/274cc74b484107c4afd74066/latest/${countryCurrency}`
        );
        const responseData = await response.json();
        console.log(responseData);
        const result = Object.keys(responseData.conversion_rates).map((key) => [
          key,
          responseData.conversion_rates[key],
        ]);

        setConversions(result);
        console.log(result);
      }
    };

    fetchCurrencyConversion();
  }, []);

  return (
    <div>
      {conversions.length !== null ? (
        <table>
          <tr>
            <th>Currency</th>
            <th>Price</th>
          </tr>
          {conversions.map((currency) => (
            <tr>
              <td>INR{currency[0]}</td>
              <td>{currency[1]}</td>
            </tr>
          ))}
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CurrencyConversion;
