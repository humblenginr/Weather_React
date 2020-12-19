import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useRef, useState } from "react";
import {Alert, Button, Form, Input, InputGroup, Label} from "reactstrap"


function App() {
  const reference = useRef();
  const [temp, setTemp] = useState();
  const [city,setCity] = useState();
  const [error, setError] = useState();
  console.log(error);

  return (
    <div className="App">
        {!error && <h1 className="postion-absolute left-40">The temperature at  {city && city}  is  {temp && temp}  </h1>}
        <Form className="mt-5 d-flex justify-content-center align-items-center ml-5 vh-100" onSubmit={(e) => {
          setError(null)
                e.preventDefault();
                const city = reference.current.value;
                setCity(city);
                Axios.get('http://api.openweathermap.org/data/2.5/weather', {params: {'q': city, 'appid': 'f05928e5df234e00d837194ff176172f'}}).then(
                  res => setTemp(res.data.main.temp)
                )
                .catch(err => {setError("Data does not exist!")
                })
        }}>
          <InputGroup>
          <Label className="mr-3"> Enter the city :   </Label>
          <input ref={reference}></input>
          <br></br>
          {error && <Alert color="danger">{error}</Alert>} 
          </InputGroup>
          <br></br>
          <Button color="primary ml-3" onClick={() => {console.log(reference.current.value)}}>SUBMIT</Button>
        </Form>
    </div>
  );
}

export default App;