import React from 'react';
import { UC,LC,NUM,SYM } from './Data/PassChar';
import './App.css';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function App() {

  let [upperCase,setUpperCase]=useState(false);//to store the state of upper case checkbox
  let [lowerCase,setLowerCase]=useState(false);
  let [numbers,setNumbers]=useState(false);
  let [symbols,setSymbols]=useState(false);


  let [passwordLengthforInput,setPasswordLengthforInput]=useState(4);//to store the password length input by user

  let [fPass,setFPass]=useState('');//to store the final generated password
  

  let createPassword=()=>{
    let finalPassword="";//to store the generated password
    let charSet='';//to store the selected character set

    if(upperCase||lowerCase||numbers||symbols){//atleast one option is selected
      if(upperCase){//if upper case is selected
        charSet+=UC;
      }
      if(lowerCase){//if lower case is selected
        charSet+=LC;
      }
      if(numbers){//if numbers is selected
        charSet+=NUM;
      }
      if(symbols){//if symbols is selected
        charSet+=SYM;
      }
      

      for(let i=0;i<passwordLengthforInput;i++){//loop to generate password of required length
       
        finalPassword+=charSet.charAt(Math.floor(Math.random()*charSet.length));//selecting random character from charSet and adding to finalPassword
        setFPass(finalPassword);//updating the state to display the generated password in input box
        // console.log(finalPassword);
        }

    }
    
    else{//no option is selected
      toast.error("Please select atleast one option");   
    }
    
  }

  let copyPass=()=>{
    navigator.clipboard.writeText(fPass);//copying the generated password to clipboard
    //navigator is a inbuilt object in javascript
    //clipboard is a property of navigator object
    //writeText is a method of clipboard object
    toast.success("Password Copied to Clipboard");
   }

  return (
    <div className="App">
      <ToastContainer />
      <div className='passwordBox'>
        <h2>Password Generator</h2>
        <div className='inputBox'>
          <input type="text" value={fPass} readOnly/><button onClick={copyPass}>Copy</button>
        </div>
        <div className='passLength'>
          <label>. Password Length</label>
          <input type='number' value={passwordLengthforInput} max={20} min={4} onChange={(event)=>setPasswordLengthforInput(event.target.value)}/>{/*updating the state on change of input box*/}
        </div>
        <div className='passLength'>
          <label>. Including Uppercase Letters</label>
          <input type='checkbox' checked={upperCase} onChange={() => setUpperCase(!upperCase)}/>{/*toggle the state*/}
        </div>
        <div className='passLength'>
          <label>. Including Lowercase Letters</label>
          <input type='checkbox' checked={lowerCase} onChange={()=>setLowerCase(!lowerCase)}/>
          
        </div>
        <div className='passLength'>
          <label>. Including Numbers</label>
          <input type='checkbox' checked={numbers} onChange={() => setNumbers(!numbers)} />
        </div>
        <div className='passLength'>
          <label>. Including Symbols</label>
          <input type='checkbox' checked={symbols} onChange={() => setSymbols(!symbols)} />
        </div>
        <button className='btn' onClick={createPassword}>Generate Password</button>
      </div>
    </div>
  );
}

export default App;
