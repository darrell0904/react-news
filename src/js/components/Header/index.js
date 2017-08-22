'use strict'

import React from 'react'
import { Link } from 'react-router'
import styles from './index.scss'

import {Row,Col} from 'antd'
import {  
  Menu, 
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Button,
  CheckBox,
  Modal 
} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userid: 0
    };
  };

  componentWillMount(){

    console.log(localStorage.userid)
    if (localStorage.userid!='') {
      this.setState({hasLogined:true});
      this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
    }
  };

  handleClick = (e) => {
    // console.log('click ', e);

    if(e.key === 'register'){
      this.setState({modalVisible:true});
      current:'register';
    }else{
      this.setState({
        current: e.key,
      });
    }
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  }

  _change = (key) => {

    console.log(key) 

    if(key === '1'){
      this.setState({action:'login'})
    }else if(key === '2'){
      this.setState({action:'register'}) 
    }    
  }

  handleSubmit = (e) =>{

    e.preventDefault();
    
    const myFetchOptions = {
      method:'GET'
    };

    let formData = this.props.form.getFieldsValue();
    
    console.log(formData);

    console.log(this.state.action)

    // 密码为空的时候返回，不再执行接下去的操作
    if(this.state.action === 'login'){
      if( formData.userName === undefined || formData.password === undefined ){
        alert('用户名密码不能为空');
        return
      }
    }else if(this.state.action === 'register'){
      if(formData.r_userName === undefined || formData.r_password === undefined || formData.r_confirmPassword === undefined){
        alert('注册用户名、密码不能为空');
        return
      }
    }
    // }else if(this.state.action === 'register'){
    //   if(formData.r_userName === undefined || formData.r_password === undefined || formData.r_confirmpassword){
    //     alert('注册用户名、密码不能为空');
    //     return
    //   }
    // }

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action 
      + "&username=" + formData.userName 
      + "&password=" + formData.password 
      + "&r_userName=" + formData.r_userName 
      + "&r_password=" + formData.r_password 
      + "&r_confirmPassword=" + formData.r_confirmPassword,
      myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({userNickName:json.NickUserName,userid:json.UserId});
        localStorage.userid = json.UserId;
        localStorage.userNickName = json.NickUserName;
      });
    
    if(this.state.action === 'login'){
      this.setState({hasLogined:true})
    }
    
    message.success('请求成功；');
    this.setState({modalVisible:false,})

  }

  logout = () => {
      localStorage.userid = '';
      localStorage.userNickName = '';
      this.setState({hasLogined:false})
  }


  render () {
    
    const { getFieldDecorator } = this.props.form;

    const userShow = this.state.hasLogined
      ? <Menu.Item key='logout' className={styles.register}>
            <Button type="primary" htmlType='button'>
                {this.state.userNickName}
            </Button>
            &nbsp;&nbsp;
            <Link target="" to="/usecenter" >
                <Button type="dashed" htmlType="button">个人中心</Button>
            </Link>
            &nbsp;&nbsp;
            <Button type="ghost" htmlType='button' onClick={this.logout}>退出</Button>
        </Menu.Item>
      :
      <Menu.Item  key="register" className="register">
          <Icon type="appstore" />注册／登录
      </Menu.Item>

    return (
      <header>
            <Row>
              <Col span={2}></Col>
              <Col span={3}>
                  <a href="/" className={styles.logo}>
                    <img src= '/src/images/news.png' alt="logo"/>
                    <span>ReactNews</span>
                  </a>
              </Col>
              <Col span={17}>
                  <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]} style={{borderBottom:'none',}} >
                      <Menu.Item key="top">
                          <Icon type="appstore" />头条
                      </Menu.Item>
                      <Menu.Item key="shehui">
                          <Icon type="appstore" />社会
                      </Menu.Item>
                      <Menu.Item key="guonei">
                          <Icon type="appstore" />国内
                      </Menu.Item>
                      <Menu.Item key="guoji">
                          <Icon type="appstore" />国际
                      </Menu.Item>
                      <Menu.Item key="yule">
                          <Icon type="appstore" />娱乐
                      </Menu.Item>
                      <Menu.Item key="tiyu">
                          <Icon type="appstore" />体育
                      </Menu.Item>
                      <Menu.Item key="keji">
                          <Icon type="appstore" />科技
                      </Menu.Item>
                      <Menu.Item key="shishang">
                          <Icon type="appstore" />时尚
                      </Menu.Item>
                      {
                        userShow
                      }
                  </Menu>
                  
                  <Modal  title="用户中心" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel} okText="关闭">
                    <Tabs type="card" onChange={this._change} >
                      <TabPane tab="登录" key="1">
                         <Form layout="horizontal" onSubmit={this.handleSubmit}>
                           <FormItem label="账户">
                            {
                              // <Input placeholder="请输入你的账号" {...getFieldDecorator('r_userName')}/>
                            }
                            {getFieldDecorator('userName', {
                              rules: [{ required: true, message: '请输入账号' }],
                            })(<Input placeholder="请输入你的账号"/>)}
                            {
                              // <span>{this.props.form.getFieldValue('r_username')}</span>
                              // 此为这个组件的双向绑定，使用onchangge()
                            }
                           </FormItem>
                           <FormItem label="密码">
                            {
                              // <Input type="password" placeholder="请输入你的密码" {...getFieldDecorator('r_password')}/>
                            } 
                            {getFieldDecorator('password', {
                              rules: [{ required: true, message: '请输入密码' }],
                            })(<Input placeholder="请输入你的密码" type="password"/>)}                          
                           </FormItem>
                           <Button type="primary" htmlType="submit">登陆</Button>
                           
                        </Form>
                      </TabPane>
                      <TabPane tab="注册" key="2">
                        <Form layout="horizontal" onSubmit={this.handleSubmit}>
                          <FormItem label="账户">
                            {
                              // <Input placeholder="请输入你的账号" {...getFieldDecorator('r_userName')}/>
                            }
                            {getFieldDecorator('r_userName', {
                              rules: [{ required: true, message: '请输入账号' }],
                            })(<Input placeholder="请输入你的账号"/>)}
                            {
                              // <span>{this.props.form.getFieldValue('r_username')}</span>
                              // 此为这个组件的双向绑定，使用onchangge()
                            }
                          </FormItem>
                          <FormItem label="密码">
                            {
                              // <Input type="password" placeholder="请输入你的密码" {...getFieldDecorator('r_password')}/>
                            } 
                            {getFieldDecorator('r_password', {
                              rules: [{ required: true, message: '请输入密码' }],
                            })(<Input placeholder="请输入你的密码" type="password"/>)}                          
                          </FormItem>
                          <FormItem label="确认密码">
                            {
                              // <Input type="password" placeholder="请再次输入你的密码" {...getFieldDecorator('r_confirmPassword')}/>
                            }
                            {getFieldDecorator('r_confirmPassword', {
                              rules: [{ required: true, message: '请再次输入密码' }],
                            })(<Input placeholder="请再次输入你的密码" type="password"/>)}
                          </FormItem>
                          <Button type="primary" htmlType="submit">注册</Button>
                        </Form>
                      </TabPane>
                    </Tabs>
                  </Modal>
              </Col>
              <Col span={2}></Col>
            </Row>
      </header>
    )
  }
}

const HeaderForm = Form.create()(Header);

export default HeaderForm;
