import React, { Component } from "react";
import PropTypes from "prop-types"; //添加这一行导入静态检查的库
import * as RecordsAPI from "../utils/RecordsAPI"; //导入api
export default class Record extends Component {
  constructor() {
    super();
    this.state = {
      edit: false
    };
  }

  handleToggle() {
    this.setState({
      edit: !this.state.edit
    });
  }

  handleEdit(event) {
    event.preventDefault();
    const record = {
      date: this.refs.date.value,
      title: this.refs.title.value,
      amount: Number.parseInt(this.refs.amount.value, 0)
    };
    // console.log(record);
    //将得到的值传过去
    RecordsAPI.update(this.props.record.id, record)
      .then(response => {
        this.setState({ edit: false });
        this.props.handleEditRecord(this.props.record, response.data);
      })
      .catch(error => console.log(error.message));
  }

  recordRow() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{this.props.record.amount}</td>
        <td>
          <button
            className="btn btn-info mr-1"
            onClick={this.handleToggle.bind(this)}
          >
            Edit
          </button>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  }
  /*
  提取表单,输入框   默认值 defaultValue = {this.props.date}
   */
  RecordForm() {
    return (
      <tr>
        <td>
          <input
            type="text"
            className="form-control"
            defaultValue={this.props.record.date}
            ref="date"
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            defaultValue={this.props.record.title}
            ref="title"
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            defaultValue={this.props.record.amount}
            ref="amount"
          />
        </td>

        <td>
          <button
            className="btn btn-info mr-1"
            onClick={this.handleEdit.bind(this)}
          >
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={this.handleToggle.bind(this)}
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  }

  render() {
    //是ture不显示,是false显示,默认为false(不可编辑状态)
    if (this.state.edit) {
      return this.RecordForm();
    } else {
      return this.recordRow();
    }
  }
}

Record.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number
};
