import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import Papa from "papaparse";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

class App extends React.Component {

  constructor() { 
    super();
    this.state = {
      data: [],
      filterEnabled: false,
      isMobile: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/dog-broad/Test-Repo/main/CurrentCodeRankingLeaderboard.csv"
      );
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await response.text();
      // Processing the fetched text as CSV data using PapaParse
      const parsedData = Papa.parse(text, { header: true }).data;
      this.setState({ data: parsedData });

      // Detect if the device is mobile
      const isMobile = window.innerWidth <= 768; // Change the breakpoint as needed
      this.setState({ isMobile });
    } catch (error) {
      console.error("Error fetching CSV data:", error);
    }

    // Event listener for window resize
    window.addEventListener("resize", this.handleWindowResize);
  }


  componentWillUnmount() {
    // Remove the event listener on component unmount
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize = () => {
    const isMobile = window.innerWidth <= 768; // Change the breakpoint as needed
    this.setState({ isMobile });
  };

  handleFilterChange = (event) => {
    const filterEnabled = event.target.value === "enabled";
    this.setState({ filterEnabled });
  };

  render() {
    const { data } = this.state;
    const columns = [
      {
        Header: "Rank",
        accessor: "Rank",
        width: this.state.isMobile ? 50 : 100,
        fixed: "left",
        // set sort to be based on integer
        sortMethod: (a, b) => parseInt(a) - parseInt(b),
      },
      {
        Header: "Handle",
        accessor: "Handle",
        width: this.state.isMobile ? 100 : 150,
        fixed: "left",
        filterable: this.state.filterEnabled,
      },
      {
        Header: "Codeforces Handle",
        accessor: "Codeforces_Handle",
        width: 180,
      },
      {
        Header: "Codeforces Rating",
        accessor: "Codeforces_Rating",
        width: 150,
        // set sort to be based on integer
        sortMethod: (a, b) => parseInt(a) - parseInt(b),
      },
      {
        Header: "GFG Handle",
        accessor: "GFG_Handle",
        width: 150,
      },
      {
        Header: "GFG Contest Score",
        accessor: "GFG_Contest_Score",
        width: 180,
        // set sort to be based on integer
        sortMethod: (a, b) => parseInt(a) - parseInt(b),
      },
      {
        Header: "GFG Practice Score",
        accessor: "GFG_Practice_Score",
        width: 180,
        // set sort to be based on integer
        sortMethod: (a, b) => parseInt(a) - parseInt(b),
      },
      {
        Header: "Leetcode Handle",
        accessor: "Leetcode_Handle",
        width: 150,
      },
      {
        Header: "Leetcode Rating",
        accessor: "Leetcode_Rating",
        width: 150,
        // set sort to be based on integer
        sortMethod: (a, b) => parseInt(a) - parseInt(b),
      },
      {
        Header: "Codechef Handle",
        accessor: "Codechef_Handle",
        width: 150,
      },
      {
        Header: "Codechef Rating",
        accessor: "Codechef_Rating",
        width: 150,
        // set sort to be based on integer
        sortMethod: (a, b) => parseInt(a) - parseInt(b),
      },
      {
        Header: "HackerRank Handle",
        accessor: "HackerRank_Handle",
        width: 180,
      },
      {
        Header: "HackerRank Practice Score",
        accessor: "HackerRank_Practice_Score",
        width: 220,
        // set sort to be based on integer
        sortMethod: (a, b) => parseInt(a) - parseInt(b),
      },
      {
        Header: "Percentile",
        accessor: "Percentile",
        width: 130,
        // set sort to be based on float
        sortMethod: (a, b) => parseFloat(a) - parseFloat(b),
      },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 20px)" }}>
        <div>
          <h1>Current Code Ranking Leaderboard</h1>
        </div>
        <div style={{ display: "flex" }}>
          <label>
            <input
              type="radio"
              name="filter"
              value="enabled"
              checked={this.state.filterEnabled === true}
              onChange={this.handleFilterChange}
            />
            Enable Search
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="disabled"
              checked={this.state.filterEnabled === false}
              onChange={this.handleFilterChange}
            />
            Disable Search
          </label>
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <ReactTableFixedColumns
            data={data}
            columns={columns}
            defaultPageSize={20}
            pageSizeOptions={[5, 10, 20, 25, 50, 100, 500]}
            className="-striped"
            style={{ height: "100%" }}
          />
        </div>
        <div style={{ height: "20px", backgroundColor: "white" }}></div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
document.body.style.overflow = "hidden";
document.body.style.height = "100vh";