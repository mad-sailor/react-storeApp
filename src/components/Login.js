import React, { Component } from 'react';
import styles from './css/login.module.scss';
import { connect } from 'react-redux';
import { login,regis } from '../actions/index';
import md5 from 'js-md5';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShow: true,
            isChecked: false,
            luname: '',
            lupwd: '',
            uname: '',
            upwd: '',
            cpwd: '',
            email: ''
        }
        this.showLogRegis = this.showLogRegis.bind(this);
        this.clickReg = this.clickReg.bind(this);
        this.clickLog = this.clickLog.bind(this);
        this.clickAgree = this.clickAgree.bind(this);
        this.handleRegis = this.handleRegis.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    componentDidMount(){}
    componentWillReceiveProps(){}
    shouldComponentUpdate(nextProps,nextState){return true;}
    handleChange(e){
        var o = {}
        o[e.target.name] = e.target.value;
        this.setState(o);
    }
    handleLogin(){
        login({uname:this.state.luname,upwd:md5(this.state.lupwd)},this.props.dispatch)
        .then(res=>{
            alert('登录成功！');
            this.props.history.push('/goods')
        }).catch(err=>alert(err))
    }
    handleRegis(){
        this.state.upwd === this.state.cpwd
        &&
        regis({uname:this.state.uname,upwd:md5(this.state.upwd),email:this.state.email})
        .then(res=>{
            alert('注册成功！');
            this.clickLog();
        }).catch(err=>alert(err))
    }
    showLogRegis(){
        if(this.state.isShow){
            return (
                <div className={styles.login}>
                    <div>
                        <input type="text" placeholder="昵称" name="luname" value={this.state.luname} onChange={this.handleChange}/><br />
                        <span className={styles.info}></span>
                        <input type="password" placeholder="密码" name="lupwd" value={this.state.lupwd} onChange={this.handleChange}/><br />
                        <span className={styles.info}></span>
                        <button className={styles.chose} onClick={this.handleLogin}>登录</button>
                        <button onClick={this.clickReg}>注册</button>
                    </div>
                </div>
            );
        }else{
            return (
                <div className={styles.register}>
                    <div>
                        <input type="text" placeholder="昵称(3-9位,字母开头)" name="uname" value={this.state.uname} onChange={this.handleChange} />
                        <input type="password" placeholder="密码(6-16位字符,区分大小写)" name="upwd" value={this.state.upwd} onChange={this.handleChange}/>
                        <input type="password" placeholder="确认密码" name="cpwd" value={this.state.cpwd} onChange={this.handleChange}/>
                        <input type="email" placeholder="邮箱" name="email" value={this.state.email} onChange={this.handleChange}/>
                        <input type="checkbox" id="agree" className={styles.agree} checked={this.state.isChecked} onChange={this.clickAgree}/><label htmlFor="agree">我已同意</label><br />
                        <button className={this.state.isChecked?'':styles.disable} disabled={!this.state.isChecked} onClick={this.handleRegis}>注&nbsp;&nbsp;&nbsp;册</button>
                    </div>
                </div>
            );
        }
    }
    clickLog(){
        if(!this.state.isShow)
            this.setState({
                isShow: true
            })
    }
    clickAgree(){
        var bool = !this.state.isChecked
        this.setState({
            isChecked: bool 
        })
    }
    clickReg(){
        if(this.state.isShow)
            this.setState({
                isShow: false
            })
    }
    render(){
        return (
            <div id={styles.user}>
                <div className={styles.topLine}></div>
                <b className={this.state.isShow?styles.chose:''} onClick={this.clickLog}>登录</b>
                <b className={this.state.isShow?'':styles.chose} onClick={this.clickReg}>注册</b>
                {
                    this.showLogRegis()
                }
            </div>
        )
    }
}

export default connect()(Login);  