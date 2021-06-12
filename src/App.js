import React,{useState,useEffect} from "react"
import Select from "./Select";


const countries_url="https://g-currency-converter.herokuapp.com/countries";
const base="https://g-currency-converter.herokuapp.com/";

function App() {
  const [countries, setcountries] = useState([]);
  const [loading, setloading] = useState(true);
  const [from, setfrom] = useState('U.S. Dollar (USD)');
  const [to, setto] = useState('Indian rupee (INR)');
  const [converting, setconverting] = useState(false);
  const [amount, setamount] = useState(1);
  const [rate, setrate] = useState(null);

    useEffect(() => {
      async function getcountries(){
        const res=await fetch(countries_url);
        const data=await res.json();
       
        let arr=[];
        let keys=Object.keys(data);
        for(let i=0;i<keys.length;i++){
          if(!arr.includes(data[keys[i]].currencyName)){
            arr.push(data[keys[i]].currencyName+` (${data[keys[i]].currencyId})`);
          }
         

        }
        setcountries(arr);
        //console.log(arr);

        setloading(false);
      }
      getcountries();
      
      return () => {
        
      }
    }, [])

    function changefrom(e){
      
      console.log(e.target.value);
      setfrom(e.target.value)
    }

    function changeto(e){
     setto(e.target.value)
    }

    if(loading){
      return <div class="loading">
        <center> <h1>Loading...</h1></center>
       
      </div>
    }

     async function convert(){
       setconverting(true);
       console.log(from,to);
         const res=await fetch(base+`getrates?from=${from}&to=${to}`);
         const data=await res.json();
         setrate(data.rate)
         //console.log(data);
         setconverting(false);

       
     }



  return (
    <div className="container">
      <div class="card text-center">
        <div class="card-header">Currency Converter</div>
        <div class="card-body">
       
         <Select data={countries} handleChange={changefrom} des="From" value={from}/>
         <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Amount</span>
          <input type="number"  value={amount} onChange={(e)=>setamount(e.target.value)} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        </div>
         <Select data={countries} handleChange={changeto} des="To" value={to}/>
         <button class="btn btn-primary" onClick={convert}>{converting?"Converting...":"Convert"}</button>
        </div>
        
        {
          rate!=null && <h2>{amount*rate}</h2>
        }
        
      </div>
    </div>
  );
}

export default App;
