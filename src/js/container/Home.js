import React, { Component } from 'react'

import {Footer,Content,Header,News_container } from '../components/index.js'

export default class Home extends Component {

  render() {
    return (
      <div className="box">
        <Header />
        <News_container />
        <Footer />
      </div>
    )
  }
}
