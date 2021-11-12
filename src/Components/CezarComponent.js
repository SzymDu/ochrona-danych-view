import {Component} from "react";

class CezarComponent extends Component {

    state = {
        numberOfSwitch: 0,
        isLoaded: false,
        text: [],
        isEncrypt: false,
        output: []
    }

    handleEvent(value) {
        console.log(value);
        const isEncrypt = value.target.id === 'encrypt';
        console.log(this.state);

        const data = {
            isEncrypt: isEncrypt,
            numberOfSwitch: parseInt(this.state.numberOfSwitch),
            text: this.state.text
        }
        console.log(data);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data})
        };
        fetch("http://localhost:8081/cezar", requestOptions)
            .then(res => res.json())
            .then(res => this.setState({output: res}))
        value.preventDefault()
    }

    render() {
        const {list, isLoaded, text, decryptedText} = this.state;
        return (
            <>
                <h1>Szyfr cezara</h1>
                <form>
                <div>
                    <h4>Input</h4>
                    <input onChange={(e) => this.setState({text: e.target.value})} placeholder='Input'></input>
                    <br/>
                </div>

                <div style={{display: "inline-block"}}>
                    <input placeholder='Number to switch' type="number" id="numberToSwitch" min="0" max="81" onChange={(e) => this.setState({numberOfSwitch: e.target.value})} ></input>
                    <button onClick={(e) => this.handleEvent(e)} id='encrypt'>Encrypt</button>
                    <button onClick={(e) => this.handleEvent(e)} id='decrypt'>Decrypt</button>
                </div>
                <h4>Output</h4>
                <input placeholder="Output" value={this.state.output}></input>
                </form>
            </>


        );
    }


}

export default CezarComponent;