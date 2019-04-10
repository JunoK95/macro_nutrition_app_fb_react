import React from 'react'

class SearchBar extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            inputValue: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        const name = event.target.name
        const value = event.target.value
        this.setState({[name]: value})
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.submitToParent(this.state.inputValue)
        this.setState({inputValue: ""})
    }

    render(){
        return(
            <div className="container">
                <form className="input-group" onSubmit={this.handleSubmit}>
                    <input type="text" name="inputValue" className="form-control" value={this.state.inputValue} placeholder="Search" onChange={this.handleChange}></input>
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="submit"><i className="fa fa-search" /></button>
                    </span>
                </form>
            </div>
        )
    }
}

export default SearchBar