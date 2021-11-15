import {Component} from "react";

class PlayfairComponent extends Component {

    state = {
        isLoaded: false,
        text: '',
        key: '',
        isEncrypt: false,
        alphabetTable: [],
        fixedKey:[],
        output: [],
    }


    componentWillMount() {
        const data = {
            isEncrypt: false,
            key: this.state.key,
            text: this.state.text
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data})
        };
        fetch("http://localhost:8081/playfair-table", requestOptions)
            .then(res => res.json())
            .then(res => this.setState({alphabetTable: res, isLoaded: true}));
        console.log(this.state.alphabetTable);

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
        fetch("http://localhost:8081/playfair-logic", requestOptions)
            .then(res => res.json())
            .then(res => this.setState({output: res}))
        fetch("http://localhost:8081/fixed-message", requestOptions)
            .then(res => res.json())
            .then(res => this.setState({fixedKey: res}))
        value.preventDefault()
    }

    updateAlphabet(e) {
        this.setState({
            key: e.target.value
        })
        const data = {
            key: e.target.value
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data})
        };
        fetch("http://localhost:8081/playfair-table", requestOptions)
            .then(res => res.json())
            .then(res => this.setState({alphabetTable: res, isLoaded: true}));
        e.preventDefault()
    }


    render() {
        let table = [];
        if (this.state.isLoaded) {
            table = this.state.alphabetTable.map(array => {
                return <table>
                    <tr>
                        {array.map(x => {
                            return <td>{x}</td>
                        })
                        }
                    </tr>
                </table>
            })
        }
        return (
            <>
                <h1>Szyfr Playfair</h1>
                <form>
                    <div>
                        <h4>Input</h4>
                        <input onChange={(e) => this.setState({text: e.target.value})} placeholder='Input'></input>
                        <br/>
                    </div>

                    <div>
                        <h4>Encryption key</h4>
                        <input onChange={(e) => this.updateAlphabet(e)}
                               placeholder='Encryption key'></input>
                        <br/>
                    </div>
                    <div style={{display: "inline-block"}}>
                        <button onClick={(e) => this.handleEvent(e)} id='encrypt'>Encrypt</button>
                        <button onClick={(e) => this.handleEvent(e)} id='decrypt'>Decrypt</button>
                    </div>
                    <h4>Updated message</h4>
                    <input placeholder="Updated message" value={this.state.fixedKey}></input>
                    <h4>Output</h4>
                    <input placeholder="Output" value={this.state.output}></input>
                </form>
                <h4>Alfabet:</h4>
                {table}
            </>


        );
    }
}

export default PlayfairComponent;