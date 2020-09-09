import React from "react";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        maximumDistance: 50,
        foodTypeSearch: "",
        randomize: false,
        latitude: this.props.cordinates ? this.props.cordinates.latitude : null,
        longitude: this.props.cordinates ? this.props.cordinates.longitude : null,
        options: [],
        columnDefs: [
          { headerName: "Name", field: "Applicant" },
          { headerName: "Address", field: "Address" },
          { headerName: "Block", field: "block" },
          { headerName: "Lot", field: "lot" },
          { headerName: "Schedule", field: "Schedule" },
          { headerName: "Food Types", field: "FoodItems"}
        ]
      };  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
      event.preventDefault();
      console.log('handled click');
      // consturct the URL 

      let url = "http://localhost:3000/foodOptions";
      url = url + `?maxDistance=${this.state.maximumDistance}`;
      if(this.state.foodTypeSearch !== "") {
          url = url + `&foodType=${this.state.foodTypeSearch}`;
      }
      if(this.state.randomize === true) {
          url = url + `&randomize=${this.state.randomize}`;
      }

      url = url + `&latitude=${this.state.latitude}`;
      url = url + `&longitude=${this.state.longitude}`;

      // Make call
      console.log(`making call to: ${url}`);
      axios.get(url)
      .then(res => {
          console.log(res);
          this.setState({options: res.data})
      })

  }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
            Latitude:
              <input
                name="latitude"
                type="number"
                value={this.state.latitude}
                onChange={this.handleInputChange} />
            </label>
            <p />
            <label>
            Longitude:
              <input
                name="longitude"
                type="number"
                value={this.state.longitude}
                onChange={this.handleInputChange} />
            </label>
            <p />
            <label>
            Maximum Distance (Miles):
              <input
                name="maximumDistance"
                type="number"
                value={this.state.maximumDistance}
                onChange={this.handleInputChange} />
            </label>
            <p />
            <label>
              Food Type or Search:
              <input
                name="foodTypeSearch"
                type="text"
                value={this.state.foodTypeSearch}
                onChange={this.handleInputChange} />
            </label>
            <p />
            <label>
            Randomize Pick?:
            <input
              name="randomize"
              type="checkbox"
              checked={this.state.randomize}
              onChange={this.handleInputChange} />
            </label>
            <p />
            <input type="submit" value="Search Options" disabled={!this.state.latitude || !this.state.longitude}/>
            <p />
          </form>



          {this.state.options.length > 0 ? (

            <div className="ag-theme-alpine" style={ {height: '800px', width: '1200px'} }>
              <AgGridReact
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.options}
                  enableRangeSelection={true}
                  pagination={true}
              ></AgGridReact>
            </div>) 
          
          : null }

        </div>
      );
    }
  }

  export default Form;