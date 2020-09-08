import React, { Component } from 'react';
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";

export default class DataArea extends Component {
  // Set the state for the users array and order to descend
  state = {
    users: [{}],
    order: "descend",
    filteredUsers: [{}]
  }

  headings = [
    { name: "Image", width: "10%"},
    { name: "Name", width: "10%"},
    { name: "Phone", width: "20%"},
    { name: "Email", width: "20%"},
    { name: "DOB", width: "10%"},
  ]

  handleSort = heading => {
    if (this.state.order === "descend") {
      this.setState({
        order: "ascend"
      })      
    } else {
      this.setState({
        order: "descend"
      })
    }

    const compareFnc = (a, b) => {
      if (this.state.order === "ascend") {
        // accounts for any missing values
        if (a[heading] === undefined) {
          return 1;           
        } else if (b[heading] === undefined) {
          return -1;
        }

        // numerically does the same
        else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else {
          return a[heading] - b[heading];
        }
      } else {
        // account for missing values 
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1; 
        }
        // numerically does the same
        else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        } else {
          return b[heading] - a[heading];
        }
      }

    }

    // sets filteredUsers to equal sortedUsers so we can use it later
    const sortedUsers = this.state.filteredUsers.sort(compareFnc);
    this.setState({ filteredUsers: sortedUsers });
  }

  handleSearchChange = event => {
    console.log(event.target.value);
    const filter = event.target.value;
    const filteredList = this.state.users.filter(item => {
      // merges the data together, then check to see if users input is anywhere inside the array
      let values = Object.values(item)
      .join("")
      .toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    this.setState({ filteredUsers: filteredList });
  }


  // mounts the component and then gets the users from the random user API
  componentDidMount() {
    API.getUsers().then(results => {
      this.setState({
        users: results.data.results,
        filteredUsers: results.data.results
      });
    });
  }

  render() {
    return (
      <>
      <Nav handleSearchChange={this.handleSearchChange} />
      <div className="data-area">
        <DataTable
        headings={this.headings}
        users={this.state.filteredUsers}
        handleSort={this.handleSort}
        />
      </div>
      </>
    );
  }
}