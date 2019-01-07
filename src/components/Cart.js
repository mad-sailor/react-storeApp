import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCart, delPro, changeCount, changeCheck } from '../actions';
import styles from './css/cart.module.scss';

class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {}
        this.handleDel = this.handleDel.bind(this);
        this.handleCount = this.handleCount.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }
    componentWillMount(){
        if(!this.props.userInfo.uid){
            alert('请先登录')
            this.props.history.push('/login')
        }else{
            if(this.props.cart.length===0){
                getCart({uid:this.props.userInfo.uid},this.props.dispatch).then(res=>{
                    console.log(res)
                })
                .catch(err=>alert(err))
            }
        }
    }
    componentWillReceiveProps(){}
    shouldComponentUpdate(nextProps,nextState){return true;}
    handleDel(i,cid){
        delPro({index:i,cid,uid:this.props.userInfo.uid},this.props.dispatch).then(res=>{
            console.log('删除一行成功')
        })
        .catch(err=>alert(err))
    }
    handleCount(cid,coun,id){
        if( id === 1 && coun === 1){
            return 0;
        }else if(id === 1 && coun > 1){
            coun--;
        }else if( id === 2 ){
            coun ++;
        }   
        changeCount({cid,coun,uid:this.props.userInfo.uid},this.props.dispatch).then(res=>{
            console.log('更改数量成功')
        })
        .catch(err=>alert(err))
    }
    handleCheck(selection,cid){
        selection = selection === 0 ? 1 : 0;
        changeCheck({cid,selection,uid:this.props.userInfo.uid},this.props.dispatch).then(res=>{
            console.log('更改选择成功')
        })
        .catch(err=>alert(err))
    }
    render(){
        return (
            <div className={styles.cart}>      
                <table>
                    <thead>
                        <tr>
                            <th>选择</th>
                            <th>图片</th>
                            <th>标题</th>
                            <th>单价</th>
                            <th>数量</th>
                            <th>总价</th>
                            <th>删除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.cart.map((item,index)=>{
                                return (
                                    <tr key={item.cid}>
                                        <td>
                                            <input type="checkbox" checked={item.selection === 0?false:true} onChange={()=>this.handleCheck(item.selection,item.cid)}></input>
                                        </td>
                                        <td>
                                            <img src={require('../assets/'+item.pic)} alt='这是一张图'></img>
                                        </td>
                                        <td>
                                            <p>{item.mtitle}</p>
                                            <p>{item.screen}</p>
                                        </td>
                                        <td>
                                            <i>¥ {item.price.toFixed(2)}</i>
                                        </td>
                                        <td className={styles.count}>
                                            <button onClick={()=>this.handleCount(item.cid,item.coun,1)}>-</button>
                                            <span>{item.coun}</span>
                                            <button onClick={()=>this.handleCount(item.cid,item.coun,2)}>+</button>
                                        </td>
                                        <td>
                                            <b>¥ {(item.price * item.coun).toFixed(2)}</b>
                                        </td>
                                        <td>
                                            <button onClick={()=>this.handleDel(index,item.cid)}>删除</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Cart);