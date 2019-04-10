import SearchBar from "./SearchBar.js";
import SearchResults from './SearchResults.js';
import React from 'react'

class FoodSearcher extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            info: [],
            inputValue: "",
            selectedndbno : null
        }
        this.submitToParent = this.submitToParent.bind(this)
    }

    handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({[name]: value})
    }

    /// Get Value from SearchBar Component then fetches api
    submitToParent(searchValue){
        if (searchValue !== ""){
            const api_key = (process.env.REACT_APP_NDBNO_API_KEY)
            const apiCall = `https://api.nal.usda.gov/ndb/search/?format=json&q=${searchValue}&sort=r&max=500&offset=0&api_key=${api_key}`
            fetch (apiCall)
            .then(response => response.json())
            .then(data => {
                    this.setState({info : data})
                }
            )
        }
        else {
            console.log("no value received from SearchBar")
        }
    }

    render(){       
        let properties = []
        //workaround for api call before fetch
        try {
            properties =
              this.state.info.list.item
        } catch (exception) {
            console.log("API fetch not yet received")
        }
        const productNames = properties.map(x => 
            <div key={x.ndbno} >
                <button  
                    type ="button"
                    value={x.ndbno} 
                    name="selectedndbno"
                    onClick={this.handleChange}
                >   
                {x.name}
                </button>
                <br />
            </div>)
        return(
            <div>   
                <SearchBar submitToParent={this.submitToParent}/> 
                <SearchResults resultList={this.state.info}/>
            </div>   
        )     
    }    
}

export default FoodSearcher