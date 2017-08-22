'use strict'

import React from 'react'
import styles from './index.scss'
import {Row,Col} from 'antd'

class Footer extends React.Component {
  render () {
    return (
      <footer>
      	<Row>
      		<Col span={2}></Col>
      		<Col span={20} className={styles.footer}>
				&copy;&nbsp;2016 ReactNews. All Right Reserved.
      		</Col>
      		<Col span={2}></Col>
      	</Row>
      </footer>
    )
  }
}

export default Footer;
