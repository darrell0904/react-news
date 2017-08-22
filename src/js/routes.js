import React from 'react'
import { Route, IndexRoute } from 'react-router'

import {
  App,
  Home,
  Details,
  NotFoundPage,
  Shop,
  UserCenter
} from './container'

export default (
  <Route path="/" component={App}> 
    <IndexRoute component={Home}/> 
    
    <Route path="details/:uniquekey" component={Details} />

    <Route path="usecenter" component={ UserCenter } />

    <Route path="shop" component={Shop} />
    
    <Route path="*" component={ NotFoundPage }/>
  
  </Route>
);