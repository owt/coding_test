import React from "react";
import axios from "axios";
import Institution from "./Institution";

class InstitutionList extends React.Component{

    constructor(props) {
      super();
      this.state = { 
        institutions: [],
        filteredInstitutions: [],
        filterValue: '',
        sortBy: null
      };

      this.handleFilterChange = this.handleFilterChange.bind(this);
      this.getInstitutions = this.getInstitutions.bind(this);
      this.filterInstitutions = this.filterInstitutions.bind(this);
      this.sortInstitutions = this.sortInstitutions.bind(this);
      this.sortInstitutionsByName = this.sortInstitutionsByName.bind(this);
      this.sortInstitutionsByCountry = this.sortInstitutionsByCountry.bind(this);
    }

    render() {
      return (
        <div style={{"margin-top": "1rem"}}>
          <form>
            <div className="input-group mb-3">
              <input className="form-control" id="filter" type="text" placeholder="Filter institutions" value={this.state.filterValue} onChange={this.handleFilterChange} />
              <button type="button" className="btn btn-primary" onClick={this.filterInstitutions}>Filter</button>
            </div>
            
          </form>
          <div className="btn-group" role="group" aria-label="Sorting">
            <button type="button" className="btn btn-secondary" onClick={this.sortInstitutionsByName}>Sort by name</button>
            <button type="button" className="btn btn-secondary" onClick={this.sortInstitutionsByCountry}>Sort by country</button>
          </div>

          <div style={{"margin-top": "1rem"}}>
            <div className="accordion" id="institutionAccordion">
              {this.state.filteredInstitutions.map((institution) => {
                return <Institution institution={institution} key={institution.id} />
              })}          
            </div>
          </div>

        </div>
      )
    }

    componentDidMount() {
      this.getInstitutions(); 
    }

    filterInstitutions(event) {
      event.preventDefault();
      if(this.state.filterValue.length > 0) {
        let filterResult = this.state.institutions.filter((institution) => {
          return institution.name.toLowerCase().includes(this.state.filterValue.toLowerCase());
        });

        this.setState({
          filteredInstitutions: this.sortInstitutions(this.state.sortBy, filterResult)
        });
        
      } else {
        this.setState({ filteredInstitutions: this.sortInstitutions(this.state.sortBy, this.state.institutions) });
      }
      
    }

    sortInstitutionsByName(event) {
      event.preventDefault();
      this.setState({sortBy: "name"});
      this.setState({ filteredInstitutions: this.sortInstitutions("name", this.state.filteredInstitutions) });
    }

    sortInstitutionsByCountry(event) {
      event.preventDefault();
      this.setState({sortBy: "country"});
      this.setState({ filteredInstitutions: this.sortInstitutions("country", this.state.filteredInstitutions) });
    }

    sortInstitutions(sortBy, institutions) {
      
      if(sortBy === "country") {
        return institutions.sort((a,b) => {
          let countryA = a.country.toLowerCase();
          let countryB = b.country.toLowerCase();
          if(countryA < countryB) {
            return -1
          }
          if(countryA > countryB) {
            return 1;
          }
          return 0;
        });
      }
      
      if(sortBy === "name") {
        return institutions.sort((a,b) => {
          let nameA = a.name.toLowerCase();
          let nameB = b.name.toLowerCase();
          if(nameA < nameB) {
            return -1
          }
          if(nameA > nameB) {
            return 1;
          }
          return 0;
        });
      }

      // If no method is chosen, no sorting is done
      return institutions

    }

    getInstitutions() {
      axios.get(`${process.env.REACT_APP_API_URL}/institutions`)
      .then((response) => {
        this.setState({ institutions: response.data.institutions });
        this.setState({ filteredInstitutions: response.data.institutions });
      })
      .catch(() => { 

      });
    }

    handleFilterChange(event) {    
      this.setState({filterValue: event.target.value});
      event.preventDefault();
    }
    

}

export default InstitutionList;