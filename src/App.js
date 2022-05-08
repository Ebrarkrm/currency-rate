import './App.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {IoMdAddCircleOutline} from "react-icons/io"
import {BsArrowDownUp} from "react-icons/bs"


function App() {
    const [currencies,setCurrencies]= useState(["USD","EUR","TRY","RUB","BTC"])
    const [first,setFirst] =useState("USD")
    const [second,setSecond]=useState("TRY")
    const [rate,setRate]=useState(null)
    const [amount,setAmount]=useState(1)

    const newCurrency = useRef()

    useEffect(()=>{
        let data = first + "_" + second
            axios(`https://free.currconv.com/api/v7/convert?q=${data}&compact=ultra&apiKey=9d451b8387efce59b195`)
                .then((response)=>{
                    setRate(response.data[data])
                })
    },[first,second])

    useEffect(()=>{

        newCurrency.current.focus()
    },[])


    const addCurrency =()=>{
        let New = newCurrency.current.value.toUpperCase()
        if(!currencies.find((c) => c === New)) {
            currencies.push(New)
            let data = currencies
            setCurrencies([...data])
            newCurrency.current.value = ""
            alert("EKLENDİ")

        }
        else{

            alert("Bu zaten ekli")
        }
    }


    const karma = () =>{
        setFirst(second)
        setSecond(first)
    }


    return (
    <div className="keu">
        <h1>Currency Converter</h1>
        <div className="group">
            <select value={first}
                    onChange={(e)=>{setFirst(e.target.value)}}
                    placeholder="First Currency"
            >
                {currencies.map((c)=>(
                    <option className="opt" key= {c}>{c}</option>
                ))}
            </select>
            <input value={amount}
                   type="number"
                   onChange={(e)=>{setAmount(e.target.value)}}
            />
        </div>
        <i className="karma" onClick={karma}><BsArrowDownUp/></i>
        <div className="group-2">
            <select value={second}
                    onChange={(e)=>{setSecond(e.target.value)}}
                    placeholder="First Currency"
            >
                {currencies.map((c)=>(
                    <option key= {c}>{c}</option>
                ))}
            </select>
            <input value={amount*rate} />
        </div>
        <div className="group-3">
            <input className="add" ref={newCurrency} type="text"/>
            <button className="add-button" onClick={()=>{
                addCurrency()
            }}><IoMdAddCircleOutline className="icon"/></button>
        </div>
    </div>

  );
}

export default App;
