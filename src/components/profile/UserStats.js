import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormSelect,
  Container
} from "shards-react";
import SmallStats from "../../components/common/SmallStats";


class UserStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smallStats: [
        {
          label: "Posts",
          value: "100",
          percentage: "4.7%",
          increase: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "6", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(0, 184, 216, 0.1)",
              borderColor: "rgb(0, 184, 216)",
              data: [1, 2, 1, 3, 5, 4, 7]
            }
          ]
        },
        {
          label: "Likes",
          value: "572",
          percentage: "12.4",
          increase: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "6", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(23,198,113,0.1)",
              borderColor: "rgb(23,198,113)",
              data: [1, 2, 3, 3, 3, 4, 4]
            }
          ]
        },
        {
          label: "Comments",
          value: "351",
          percentage: "3.8%",
          increase: false,
          decrease: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "4", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(255,180,0,0.1)",
              borderColor: "rgb(255,180,0)",
              data: [2, 3, 3, 3, 4, 3, 3]
            }
          ]
        },
        {
          label: "New Subscribers",
          value: "207",
          percentage: "2.4%",
          increase: false,
          decrease: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "4", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgb(0,123,255,0.1)",
              borderColor: "rgb(0,123,255)",
              data: [3, 2, 3, 2, 4, 5, 4]
            }
          ]
        }
      ]
      ,smallStats2: [
        {
          label: "Average Likes",
          value: "12000",
          percentage: "4.7%",
          increase: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "6", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(0, 184, 216, 0.1)",
              borderColor: "rgb(0, 184, 216)",
              data: [1, 2, 1, 3, 5, 4, 7]
            }
          ]
        },
        {
          label: "Average Comment",
          value: "800",
          percentage: "4.7%",
          increase: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "6", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(0, 184, 216, 0.1)",
              borderColor: "rgb(0, 184, 216)",
              data: [1, 2, 1, 3, 5, 4, 7]
            }
          ]
        }
      ]
    }
  }

  render() {
    const {
      smallStats,
      smallStats2
    } = this.state;
    return (
      <Container >
        <Row>
          <Col lg="12" className="mb-2">
          <div style={{width:"100px",display:"inline-block"}}>Total </div>
            <FormSelect
              size="sm"
              value="last-week"
              style={{ maxWidth: "130px" }}
              onChange={() => { }}
            >
              <option value="last-week">Last Week</option>
              <option value="today">Last Month</option>
              <option value="last-month">Last Year</option>
            </FormSelect>
          </Col>
        </Row>
        <Row>
          {smallStats.map((stats, idx) => (
            <Col className="col-lg mb-2" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>
        <Row>
          <Col lg="12" className="mb-2">
           <div style={{width:"100px",display:"inline-block"}}>Engagement </div>
            <FormSelect
              size="sm"
              value="last-week"
              style={{ maxWidth: "130px" }}
              onChange={() => { }}
            >
              <option value="last-week">Last Week</option>
              <option value="today">Last Month</option>
              <option value="last-month">Last Year</option>
            </FormSelect>
          </Col>
        </Row>
        <Row>
          {smallStats2.map((stats, idx) => (
            <Col className="col-lg mb-2" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default UserStats;