import {Component} from "react";

class VigenereComponent extends Component {

    state = {
        isLoaded: false,
        text: [],
        key: '',
        isEncrypt: false,
        alphabetTable: [],
        output: [],
    }


    componentWillMount() {
        fetch("http://localhost:8081/alphabet-table")
            .then(res => res.json())
            .then(res => this.setState({alphabetTable: res, isLoaded: true}));

    };

    handleEvent(value) {
        console.log(value);
        const isEncrypt = value.target.id === 'encrypt';
        console.log(this.state);

        const data = {
            isEncrypt: isEncrypt,
            key: this.state.key,
            text: this.state.text
        }
        console.log(data);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data})
        };
        fetch("http://localhost:8081/vigenere", requestOptions)
            .then(res => res.json())
            .then(res => this.setState({output: res}))
        value.preventDefault()
    }

    render() {
        let table = [];
        if (this.state.isLoaded) {
            table = this.state.alphabetTable.map(array => {
                return <table>
                    <tr>
                        {array.map(x => {
                            return <td>{x}</td>})
                        }
                    </tr>
                </table>
            })
        }
        return (
            <>
                <h1>Szyfr Vigenere</h1>
                <form>
                    <div>
                        <h4>Input</h4>
                        <input onChange={(e) => this.setState({text: e.target.value})} placeholder='Input'></input>
                        <br/>
                    </div>

                    <div>
                        <h4>Encryption key</h4>
                        <input onChange={(e) => this.setState({key: e.target.value})}
                               placeholder='Encryption key'></input>
                        <br/>
                    </div>
                    <div style={{display: "inline-block"}}>
                        <button onClick={(e) => this.handleEvent(e)} id='encrypt'>Encrypt</button>
                        <button onClick={(e) => this.handleEvent(e)} id='decrypt'>Decrypt</button>
                    </div>
                    <h4>Output</h4>
                    <input placeholder="Output" value={this.state.output}></input>
                </form>
                <h4>Alfabet:</h4>
                {table}
            </>


        );
    }


}

export default VigenereComponent;