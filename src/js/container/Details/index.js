import React from 'react';
import {Row,Col,BackTop} from 'antd';
import styles from './index.scss'
import { Header,Footer,PCNewsImageBlock, CommonComments } from '../../components'

export default class PCNewsDetails extends React.Component {
	
	constructor() {
		super();
		this.state = {
			newsItem: '',
		};
	};

	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="
		        + this.props.params.uniquekey,  myFetchOptions)
		        .then(response => response.json())
		        .then(json => {
			      this.setState({newsItem: json});
			      document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
	    })
	};



	createMarkup() {
		return {__html: this.state.newsItem.pagecontent};
	};

	render(){
		return(
			<div>
				<Header />
				<Row>
					<Col span={2}></Col>
					<Col span={14} className={styles.container}>				
						<div className={ styles.articleContainer } dangerouslySetInnerHTML={this.createMarkup()}></div>
						<CommonComments uniquekey={this.props.params.uniquekey}/>
					</Col>
					<Col span={6}>
						<PCNewsImageBlock count={40} type='top' width="100%" cardTitle="相关新闻" imageWidth="175px"/>
					</Col>
					<Col span={2}></Col>
				</Row>
				<Footer />
				<BackTop />
				{
				//回到顶部
				}
			</div>
		)
	}

}