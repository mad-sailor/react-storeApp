import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPro, addPro } from '../actions/index';
import styles from './css/goods.module.scss';

class Goods extends Component{
    constructor(props){
        super(props);
        this.state = {
            pages: [],
            pno: 1,
            isShow: false,
            i: 0
        }
        this.handleClick= this.handleClick.bind(this);
        this.handleFN = this.handleFN.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
    componentDidMount(){
        if(this.props.prolist.length === 0){
            getAllPro(this.props.dispatch).then(res=>{
                let len = Math.ceil(res.length/6);
                let pages = [];
                for(let i=1;i<=len;i++){
                    pages.push(i);
                }
                this.setState({
                    pages
                })
            })
            .catch(err=>alert(err))
        }else{
            let len = Math.ceil(this.props.prolist.length/6);
            let pages = [];
            for(let i=1;i<=len;i++){
                pages.push(i);
            }
            this.setState({pages})
        }
    }
    componentWillReceiveProps(){}
    shouldComponentUpdate(nextProps,nextState){return true;}
    handleClick(i){
        this.setState({
            pno: i
        })
    }
    handleFN(i){
        let pno = this.state.pno;
        if( this.state.pno === 1 && i === 1 ){
            return 0;
        }else if( this.state.pno === this.state.pages.length && i === 2 ){
            return 1;
        }
        else if( i === 1 ){
            pno -= 1;
        }else if( i === 2 ){
            pno += 1;
        }
        this.setState({
            pno
        })
    }
    handleShow(i){
        this.setState({
            isShow: !this.state.isShow,
            i
        })
    }
    handleAdd(cid){
        if(!this.props.userInfo.uid){
            alert('请先登录')
            this.props.history.push('/login')
        }else{
            var uid = this.props.userInfo.uid;
            var uname = this.props.userInfo.uname;
            addPro({uid,uname,cid}).then(res=>{
                alert('加入购物车成功')
            })
            .catch(err=>alert(err))
        }
    }
    render(){
        return (
            <div>
                <div className={styles.shop_list}>
                    {
                        this.props.prolist.map((item,index)=>{
                            if(index<this.state.pno*6 && index>=(this.state.pno-1)*6){    
                                return (
                                    <div className={styles.shop} key={index} onClick={()=>this.handleShow(index)}>
                                        <div className={styles.radius}></div>
                                        <div className={styles.img}>
                                            <img src={require('../assets/'+item.pic)} alt="" />
                                        </div>
                                        <p className={styles.p1}>{item.mtitle}</p>
                                        <p className={styles.p2}>RMB&nbsp;{item.price}&nbsp;起售</p>
                                        <ul className={styles.desc}>
                                            {
                                                item.screen
                                                &&
                                                <li className={styles.no_wrap}>{item.screen}</li>
                                            }
                                            <li dangerouslySetInnerHTML={{__html:item.cpu}}></li>
                                            <li>
                                                {item.ssd}
                                                <sup>2</sup>
                                            </li>
                                            {
                                                item.touch
                                                &&
                                                <li dangerouslySetInnerHTML={{__html:item.touch}}></li>
                                            }
                                            {
                                                item.keyboard
                                                &&
                                                <li>{item.keyboard}</li>
                                            }
                                        </ul>
                                    </div>
                                )
                            }else{
                                return true;
                            }
                        })
                    }
                </div>
                <div>
                    <ul className={styles.page}>
                        <li onClick={()=>this.handleFN(1)} className={this.state.pno===1?styles.disabled:''}>
                            <span>上一页</span>
                        </li>
                        {
                            this.state.pages.map((item,index)=>{
                                return (
                                    <li key={index} onClick={()=>this.handleClick(item)} className={this.state.pno===item?styles.active:''}>
                                        <span>{item}</span>
                                    </li>
                                )
                            })
                        }
                        <li onClick={()=>this.handleFN(2)} className={this.state.pno===this.state.pages.length?styles.disabled:''}>
                            <span>下一页</span>
                        </li>
                    </ul>
                </div>
                {   
                    this.state.isShow
                    &&
                    <div className={styles.mask}>
                        <div className={styles.info}>
                            <img src={require('../assets/'+this.props.prolist[this.state.i].pic)} alt='this is a pic'></img>
                            <ul>
                                <li>{this.props.prolist[this.state.i].mtitle}</li>
                                <li dangerouslySetInnerHTML={{__html:this.props.prolist[this.state.i].cpu}}></li>
                                <li>{this.props.prolist[this.state.i].touch}</li>
                                <li>{this.props.prolist[this.state.i].keyboard}</li>
                                <li>{this.props.prolist[this.state.i].screen}</li>
                                <li>{this.props.prolist[this.state.i].ssd}</li>
                                <li>{this.props.prolist[this.state.i].price}</li>
                                <li>
                                    <button className={styles.join} onClick={()=>this.handleAdd(this.props.prolist[this.state.i].cid)}>加入购物车</button>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.close} onClick={()=>this.handleShow(1)}>×</div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        prolist: state.pros,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps)(Goods);