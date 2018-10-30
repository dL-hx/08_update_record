### 本节目标:实现更新,编辑操作

![day08](http://ww1.sinaimg.cn/large/006pJUwqly1fwpfzg14cnj30q505c3z0.jpg)



- 1.显示Edit   Delete按钮

`src\components\Record.js`:

```js
import React, { Component } from "react";
import PropTypes from "prop-types"; //添加这一行导入静态检查的库
export default class Record extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.title}</td>
        <td>{this.props.amount}</td>

        <td>
          <button className="btn btn-info mr-1">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  }
}

Record.propTypes = {...};
```

![day8_01](http://ww1.sinaimg.cn/large/006pJUwqly1fwpghu70kij313p0dxq3t.jpg)

- 点击`Edit`框(状态):

  - 1. 开启,开启后Date ,Title, Amount,input框都可进行点击编辑
    2. 关闭  ,点击cancle 按钮回到这个页面 

    创建构造函数,设置状态    `edit `  (默认为false)不可编辑

    通过控制edit 状态是true或为false ,控制状态是否可以编辑

  ```js
    constructor(){
      super();
      this.state ={
        edit:false
      };
    }
  ```

  然后怎么控制该属性,用什么方法来判断是`true`或`false`来控制编辑状态是否被显示

- 将代码重构,抽取return 中的方法  并改名为 `recordRow()`

- onClick = {this.handleToggle.bind(this)绑定方法

- 更改edit状态 true变false   false变true

- cancel也要绑定这个方法

  ```js
  import React, { Component } from "react";
  import PropTypes from "prop-types"; //添加这一行导入静态检查的库
  export default class Record extends Component {
    constructor() {...}
    
    handleToggle(){
      this.setState({
        edit:!this.state.edit
      });
    }
    
    recordRow() {
      return (
        <tr>
          <td>{this.props.date}</td>
          <td>{this.props.title}</td>
          <td>{this.props.amount}</td>
  
          <td>
            <button className="btn btn-info mr-1" onClick = {this.handleToggle.bind(this)>Edit</button>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
      );
    }
    
      /*
    提取表单,输入框   默认值 defaultValue = {this.props.date}
     */
    RecordForm(){
      return (
        <tr>
        <td><input type="text" className = "form-control" defaultValue = {this.props.date}/></td>
        <td><input type="text" className = "form-control" defaultValue = {this.props.title}/></td>
        <td><input type="text" className = "form-control" defaultValue = {this.props.amount}/></td>
  
        <td>
          <button className="btn btn-info mr-1">Update</button>
          <button className="btn btn-danger" onClick = {this.handleToggle.bind(this)}>Cancel</button>
        </td>
      </tr>
      );
    }
    
    render() {
      //这里是ture不显示,是false显示,默认为false(不可编辑状态)
      //点一下改变状态后   变为true可以编辑
      if(this.state.edit){
        return this.RecordForm();
      }else{
        return this.recordRow();
      }
    }
  }
  
  Record.propTypes = {...};
  
  ```

  ![day0802](http://ww1.sinaimg.cn/large/006pJUwqly1fwphiu56uig31dq0g543v.gif)

  - 点击更新(Update)后将数据更新

    - 1.发送请求,创建api 

    - `src\utils\RecordsAPI.js`:

    - ```js
      export const update = (id , body) => axios.put(`${api}/api/v1/records/${id}`, body);
      ```

    - `src\components\Record.js`

    - ```js
      import React, { Component } from "react";
      import PropTypes from "prop-types"; //添加这一行导入静态检查的库
      import * as RecordsAPI from '../utils/RecordsAPI';//导入api
      export default class Record extends Component {
        constructor() {
          super();
          this.state = {
            edit: false
          };
        }
      
        handleToggle(){
          this.setState({
            edit:!this.state.edit
          });
        }
      
        handleEdit(event){
          event.preventDefault();
          const record = {
            date:this.refs.date.value,
            title:this.refs.title.value,
            amount:Number.parseInt(this.refs.amount.value,0),
          }
          // console.log(record);
          //将得到的值传过去
          RecordsAPI.update(this.props.record.id,record).then(
            response => {
              this.setState({edit:false});
              this.props.handleEditRecord(this.props.record, response.data);
            }
          )
          .catch(error => console.log(error.message));
      }
        
      
        recordRow() {
          return (
            <tr>
              <td>{this.props.record.date}</td>
              <td>{this.props.record.title}</td>
              <td>{this.props.record.amount}</td>
      
              <td>
                <button className="btn btn-info mr-1" onClick = {this.handleToggle.bind(this)}>Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          );
        }
        /*
        提取表单,输入框   默认值 defaultValue = {this.props.date}
         */
        RecordForm(){
          return (
            <tr>
            <td><input type="text" className = "form-control" defaultValue = {this.props.record.date} ref="date"/></td>
            <td><input type="text" className = "form-control" defaultValue = {this.props.record.title} ref="title"/></td>
            <td><input type="text" className = "form-control" defaultValue = {this.props.record.amount} ref="amount"/></td>
      
            <td>
              <button className="btn btn-info mr-1" onClick = {this.handleEdit.bind(this)}>Update</button>
              <button className="btn btn-danger" onClick = {this.handleToggle.bind(this)}>Cancel</button>
            </td>
          </tr>
          );
        }
      
        render() {
          //是ture不显示,是false显示,默认为false(不可编辑状态)
          if(this.state.edit){
            return this.RecordForm();
          }else{
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
      
      ```

    - `SRC /组件/ Records.js**`

    - ```js
      import React, { Component } from "react";
      import Record from "./Record";
      import * as RecordsAPI from "../utils/RecordsAPI";
      import RecordForm from "./RecordForm";
      class Records extends Component {
        constructor() {
          super();
          this.state = {
            error: null,
            isLoaded: false,
            records: []
          };
        }
      
        componentDidMount() {
          RecordsAPI.getAll()
            .then(response =>
              this.setState({
                records: response.data,
                isLoaded: true
              })
            )
            .catch(error =>
              this.setState({
                isLoaded: true,
                error
              })
            );
        }
        addRecord(record) {
          //得到传入的值
          //console.log(record);
          this.setState({
            error: null,
            isLoaded: true,
            records: [...this.state.records, record]
          });
        }
        updateRecord(record,data){
          const recordIndex = this.state.records.indexOf(record);
          const newRecords = this.state.records.map( (item, index) => {
            if(index !== recordIndex) {
              // This isn't the item we care about - keep it as-is
              return item;
            }
      
            // Otherwise, this is the one we want - return an updated value
            return {
              ...item,
              ...data
            };
          });
          this.setState({
            records: newRecords
          });
        }
        render() {
          const { error, isLoaded, records } = this.state;
          let recordsComponents; //添加此行
      
          if (error) {
            recordsComponents = (
              <div>
                Error:
                {error.message}
              </div>
            );
          } else if (!isLoaded) {
            recordsComponents = <div>Loading...</div>;
          } else {
            recordsComponents = (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map(record => (
                    <Record key={record.id}
                    record = {record} 
                    handleEditRecord = {this.updateRecord.bind(this)}
                    />
                  ))}
                  {/* <Record  /> */}
                </tbody>
              </table>
            );
          }
          return (
            <div>
              <h2>Records</h2>
              <RecordForm handleNewRecord={this.addRecord.bind(this)} />
      
              {recordsComponents}
            </div>
          );
        }
      }
      export default Records;
      
      ```

    - 此次代码更改

    - https://github.com/hfpp2012/react-accounts-app/commit/96f815c24c44e9b4cea394ed87dabd61a624c62b

    - [![Edit 08_update(record)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/j35mrk64v9)
