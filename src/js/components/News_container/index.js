import React from 'react';
import {Row, Col} from 'antd';
import {Tabs,Carousel} from 'antd';

const TabPane = Tabs.TabPane;

import styles from './index.scss'
import PCNewsBlock from '../News_block'
import PCNewsImageBlock from '../News_image_block'
import PCNewsDetails from '../News_details'
import PCNewsProducts from '../News_products'



export default class PCNewsContainer extends React.Component {
	render(){

	const settings = {
        dots:true,
        infinite:true,
        speed: 500,
        slidesToShow:1,
        autoplay:true
    };

		return(
			<div>
				<Row>
					<Col span={2}></Col>
					<Col span={20} className={styles.container}>
						<div className={styles.leftContainer}>
							<div className={styles.carousel}>
		                		<Carousel {...settings}>
									<div><img src="src/images/carousel_1.jpg"/></div>
                  					<div><img src="src/images/carousel_2.jpg"/></div>
                  					<div><img src="src/images/carousel_3.jpg"/></div>
                  					<div><img src="src/images/carousel_4.jpg"/></div>
		                		</Carousel>
	                		</div>
	                		<PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="105px"/>
                		</div>
                		<Tabs className={styles.tabs_news}>
                			<TabPane tab="头条新闻" key="1">
								<PCNewsBlock count={22} type="top"/>
                			</TabPane>
                			<TabPane tab="国际" key="2">
								<PCNewsBlock count={22} type="guoji"/>
                			</TabPane>
                			<TabPane tab="娱乐" key="3">
								<PCNewsBlock count={22} type="yule"/>
                			</TabPane>
                		</Tabs>
                		<Tabs className={styles.tabs_news}>
                			<TabPane tab="体育" key="1">
								<PCNewsBlock count={22} type="yiyu"/>
                			</TabPane>
                			<TabPane tab="科技" key="2">
								<PCNewsBlock count={22} type="keji"/>
                			</TabPane>
                			<TabPane tab="时尚" key="3">
								<PCNewsBlock count={22} type="时尚"/>
                			</TabPane>
                		</Tabs>

                		<div>
	                		<PCNewsImageBlock count={9} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="140px"/>
	                		<PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐" imageWidth="140px"/>
                		</div>

					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
		)
	}

	
}