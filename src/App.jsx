import { useState,useEffect ,useCallback,useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState("8");
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  //useref
  const passwordref = useRef(null);

  //fn is the function to excuted the re-render the code.
  const passwordgenrator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (numberAllow) str += "1234567890";
    if (charAllowed) str += "``~!@#$%^&*()_-+={}[]:;''<>,.?/ ";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length,numberAllow, charAllowed, setpassword]);

  // Function to copy password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password); //copy the password in the keybord 
  }, [password]);

  // Effect to generate a new password when dependencies change
  useEffect(() => {
    passwordgenrator()
  }, [length, numberAllow, charAllowed, passwordgenrator]);

  return (
    <center>
      <div className="w-full max-w-md p-2 px-4 mx-auto my-8 bg-gray-500 rounded-lg shadow-md">
        <h1 className="mt-5 text-3xl text-center">Password Generator</h1>
        <div className="flex items-center overflow-hidden">
          <input
            type="text"
            className="w-full px-2 py-2 mt-5 mb-2 rounded-lg outline-none"
            value={password}
            ref={passwordref}
            readOnly
            placeholder="Advsdv@##$123csdsd"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="flex items-center justify-center h-10 px-4 mt-2.5 ml-0 ml-0.5 font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-2 focus:ring-blue-300"
          >
            Copy
          </button>
        </div>
        <div className="flex mt-1 text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center grap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllow}
              id="numberInput"
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center grap-x-1">
            <input
              type="checkbox"
              checked={charAllowed} // Use `checked` for controlled components
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev); // Toggle state on change
              }}
            />
            <label htmlFor="charInput" className="ml-2">
              Characters
            </label>
          </div>
        </div>
      </div>
    </center>
  );
}

export default App;
