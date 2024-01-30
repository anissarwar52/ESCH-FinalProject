import React from 'react'
import Sidebar from '../../Sole Distributor/Components/Sidebar/SoleSidebar'

import Navbar from '../Components/navbar/Navbar'
import ChartS from '../Components/ChartS/ChartS'
import FeaturedS from '../Components/FeaturedS/FeaturedS'
import '../Components/Profile/Profile.css'

function soleHome() {
  return (
    <div className='home'>
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>

          <div className="charts">
                <FeaturedS/>
                <ChartS title="Last 6 Months (Sales)" aspect={2/1}/>
                </div>
          </div>
          </div>
          
  )
}

export default soleHome
