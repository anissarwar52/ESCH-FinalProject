import React from 'react'
import Sidebar from '../../Distributor/Components/Sidebar/DisSidebar'
import Widget from "../Components/Widget/WidgetD";
import Navbar from '../Components/navbar/Navbar'
import ChartD from '../Components/ChartD/ChartD'
import FeaturedD from '../Components/FeaturedD/FeaturedD'
import '../Components/Profile/Profile'

function soleHome() {
  return (
    <div className='home'>
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          <div className="widgets">
          <Widget type="user"/>
          <Widget type="order"/>
          <Widget type="sales"/>
          <Widget type="products"/>
          </div>

          <div className="charts">
                <FeaturedD/>
                <ChartD title="Last 12 Months (Sales)" aspect={2/1}/>
                </div>
          </div>
          </div>
          
  )
}

export default soleHome
