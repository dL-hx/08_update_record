import React, { Component } from "react";

import * as RecordsAPI from "../utils/RecordsAPI";

export default class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      title: "",
      amount: ""
      
    };
  }

  //è¿ä¸ªæ¹æ³ç¨æ¥å¤æ­ä¸ä¸ªæ¡åæ¶æå¼æ¯å¦ææ
  valid() {
    return this.state.date && this.state.title && this.state.amount;
  }

  //åå»ºhandleChange()æ¹æ³
  handleChange(event) {
    let name, obj;
    name = event.target.name;
    this.setState(((obj = {}), (obj["" + name] = event.target.value), obj));
  }

  handleSubmit(event) {
    event.preventDefault(); //é»æ­¢æµè§å¨çgetè¯·æ±,å³ç°å¨æ¯postæ¹å¼
    // this.state
    // ç¸å½äº{date:this.state.date, title:this.state.title,amount:this.state.amount}
    /* RecordsAPI.create({date:this.state.date, title:this.state.title,amount:Number.parseInt(this.state.amount,0)}).then( 
    response => console.log(response.data)
    ).catch(error => console.log(error.message)
    ) */
    //ä¸é¢çåæ³å¤ªé¿äº  ä½¿ç¨ä¸é¢çåæ³

    const data = {
      date: this.state.date,
      title: this.state.title,
      amount: Number.parseInt(this.state.amount, 0)
    };

    RecordsAPI.create(data)
      .then(
        //   response => console.log(response.data)
        response => {
          this.props.handleNewRecord(response.data);
          //ç¹å»æé®æ¸ç©ºåè¡¨
          this.setState({
            date: "",
            title: "",
            amount: ""
          });
        }
      )
      .catch(error => console.log(error.message));
  }
  render() {
    return (
      <form
        className="form-inline mb-3"
        onSubmit={this.handleSubmit.bind(this)}
      >
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange.bind(this)}
            placeholder="Date"
            name="date"
            value={this.state.date}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange.bind(this)}
            placeholder="Title"
            name="title"
            value={this.state.title}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange.bind(this)}
            placeholder="Amount"
            name="amount"
            value={this.state.amount}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!this.valid()}
        >
          Create Record
        </button>
      </form>
    );
  }
}
