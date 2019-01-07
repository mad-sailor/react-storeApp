import React, { Component } from 'react';
import styles from './css/index.module.scss';
import banner1 from '../assets/img/banner1.jpg';
import banner2 from '../assets/img/banner2.jpg';
import banner3 from '../assets/img/banner3.jpg';
import banner4 from '../assets/img/banner4.jpg';
class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            left: 0,
            delay: 'all 1.5s linear'
        }
        this.timer = null
    }
    componentDidMount(){
        let i = 0;
        this.timer = setInterval(()=>{
            i++;
            if(i<=4){
                this.setState({
                    left: -1024*i,
                    delay: 'all 1.5s linear'  
                })
            }else{
                i = 0;
                this.setState({
                    left: 0,
                    delay: 'none'
                })
            }
        },3000)
    }
    componentWillReceiveProps(){}
    shouldComponentUpdate(nextProps,nextState){return true;}
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render(){
        return (
            <div className={styles.main}>
                <h2>Welcome To My Own Computer Shop</h2>
                <div>
                    <ul style={{left: this.state.left+'px',transition: this.state.delay}}>
                        <li>
                            <img src={banner1} alt=''></img>
                        </li>
                        <li>
                            <img src={banner2} alt=''></img>
                        </li>
                        <li>
                            <img src={banner3} alt=''></img>
                        </li>
                        <li>
                            <img src={banner4} alt=''></img>
                        </li>
                        <li>
                            <img src={banner1} alt=''></img>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Index;