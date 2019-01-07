import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../css/myHeader.module.scss'

class MyHeader extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){}
    componentWillReceiveProps(){}
    shouldComponentUpdate(nextProps,nextState){return true;}
    render(){
        return (
            <div className={styles.head}>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName={styles.selected}>首页</NavLink>
                    </li>
                    <li>
                        <NavLink to='/goods' exact activeClassName={styles.selected}>商品</NavLink>
                    </li>
                    <li>
                        <NavLink to='/cart' exact activeClassName={styles.selected}>购物车</NavLink>
                    </li>
                    <li>z
                        <NavLink to='/login' exact activeClassName={styles.selected}>登录</NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}

export default MyHeader;