import {Component} from "react";

class MonoDecryptComponent extends Component {

    state = {
        list: [],
        isLoaded: false,
        text: [],
        decryptedText: []
    }

    handleChange(value) {
        let changeLetterWrapper = [].slice.call(value.target.form.children).map(input => {
            const orginal = input.placeholder;
            let letterToChange = input.value;
            if(letterToChange ==='') {
                letterToChange = orginal;
            }
            return {
                orginal,
                letterToChange
            }
        })

        const data = {
            changeLetterWrapper,
            currentText: this.state.decryptedText
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...data})
        };
        console.log(data)
        fetch("http://localhost:8081/decrypt", requestOptions)
            .then(res => res.json())
            .then(res => this.setState({decryptedText:res}))
            // .then(data => this.setState({ postId: data.id }));
    }

    componentWillMount() {
        fetch("http://localhost:8081/letters")
            .then(res => res.json())
            .then(res => this.setState({list:res,
            isLoaded:true}));
        fetch("http://localhost:8081/file")
            .then(res => res.json())
            .then(res => this.setState({text:res, decryptedText:res}));
    };
    render() {
        const {list, isLoaded, text, decryptedText} = this.state;
        if(!isLoaded){
            return 'Ladowanie';
        }
        return (
            <>
                <h1>Rozszyfrowanie monoalfabetyczne </h1>
                <div style={{position: "absolute",
                    left: "25px"}}>
                    <h4>TEXT</h4>
                    <textarea style={{width: "600px", height:"500px", left: "800px"}} value={decryptedText}></textarea>
                        <form onChange={(e) =>  this.handleChange(e)}>
                        {list.map(value =>
                            <input type="text" id={value} maxLength="1" placeholder={value}  style={{width: "30px"}}></input>)}
                        </form>

                </div>
            </>

            );
        }


}

export default MonoDecryptComponent;