import React,{useState} from 'react'
import Navbar from '../../../Sole Distributor/Components/navbar/Navbar';
import Sidebar from '../../../Sole Distributor/Components/Sidebar/SoleSidebar';
import SalesChart from './SalesChart';
const store_country_mapping = {
    '1': "Pakistan",
  };
  
  const product_mapping = {
    1: "Samsung Galaxy Tab A 10.1 (2019)",
    2: "Xiaomi Redmi Note 12S",
    3: "Lenovo V15 G3 Core",
    4: "Fitbit Sense 2",
    5: "Apple Iphone 15 Pro Max",
    6: "HP EliteBook 745 G3",
    7: "Apple iPad (2022)",
    8: "Haier 32",
    9: "X8 Ultra Bluetooth",
    10: "Samsung Galaxy Tab S7 FE",
    11: "Redmi Pad",
    12: "Microsoft Surface Pro 9",
    13: "Acer Predator Helios",
    14: "Apple Watch Series 8",
    15: "Samsung Watch 4 46mm R890",
    16: "LG 65NANO80UPA",
    17: "Ecostar CX-43UD962",
    18: "TCL 32D310",
    19: "Oppo A17K",
    20: "Realme C51",
  };
  
  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    marginTop: '8px',
    boxSizing: 'border-box',
  };
  
  const buttonStyle = {
    backgroundColor: "rgb(7, 95, 153)",
    color:"rgb(255, 255, 255)",
    padding: "11px 55px",
    border: "medium",
    borderRadius: "54px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease 0s",
    height: "45px",
    marginTop: "42px",
    marginLeft: "77px"
  };
  
  const Trending = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [predictionResult, setPredictionResult] = useState(null);
    const [predictionData, setPredictionData] = useState({});
  
    const handlePredict = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/predict_sales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_name: product_mapping[selectedProduct],
            country_name: store_country_mapping[selectedCountry],
            start_date: startDate,
            end_date: endDate,
          }),
        });
  
        const data = await response.json();
        setPredictionData(data);
        console.log("DATA",predictionData);
      } catch (error) {
        console.error('Error during prediction:', error);
      }
    };
  
    return (
      <div className="list">
          <Sidebar />
          <div className="listContainer">
            <Navbar />
  
              <div className='new' 
              style={{
                boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
                padding: "10px",
                margin: "20px",
                display: "flex"
              }}>
               <h1 
               style={{
                color:"lightgray",
                fontSize: "20px",
               }}   
               >Predict Sales</h1>
               </div>
  
          <div style={{ maxWidth: '83vw', padding: '5px', 
        borderRadius: '8px',
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
        backgroundColor: "rgb(255, 255, 255)",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        marginLeft: "19px",
        marginTop: "22px",
        marginBottom: "-9px"
        
      }}>
  
  
  
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>Product Name:</label>
              <select style={inputStyle} onChange={(e) => setSelectedProduct(e.target.value)}>
                <option value="">Select Product</option>
                {Object.entries(product_mapping).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
  
            <div style={{ marginBottom: '20px', marginLeft: "54px" }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>Country:</label>
              <select style={inputStyle} onChange={(e) => setSelectedCountry(e.target.value)}>
                <option value="">Select Country</option>
                {Object.entries(store_country_mapping).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
  
            <div style={{ marginBottom: '20px', marginLeft: "54px" }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>Start Date:</label>
              <input style={inputStyle} type="date" onChange={(e) => setStartDate(e.target.value)} />
            </div>
  
            <div style={{ marginBottom: '20px', marginLeft: "54px" }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>End Date:</label>
              <input style={inputStyle} type="date" onChange={(e) => setEndDate(e.target.value)} />
            </div>
  
            <button style={buttonStyle} onClick={handlePredict}>Predict</button>
          </div>
          <div style = {{marginBottom: '25px'}}>
         
          {predictionData && (
         
            <div
              style={{
                maxWidth: '800px', // Adjust the maximum width to your preference
                margin: 'auto',
                padding: '20px',
                borderRadius: '8px',
                // boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden', // Hide overflow to prevent horizontal scrolling
              }}
            >
             
              <SalesChart predictionData={predictionData} />
            </div>
          )}
          </div>
       
        </div>
      </div>
    );
  }
  
  export default Trending;