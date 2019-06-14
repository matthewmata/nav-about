import React from 'react';
import axios from 'axios';
import './About.css';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      showFullSchedule: false
    };
    this.fetchRestaurant = this.fetchRestaurant.bind(this);
    this.handleShowSchedule = this.handleShowSchedule.bind(this);
  }

  fetchRestaurant() {
    const id = window.location.href.split("id=")[1];
    axios.get(`/api/restaurants/${id}`)
    .then(({ data }) => {
      let restaurantInfo = data;
      this.setState({
        restaurant: restaurantInfo
      });
    })
    .catch((err) => {
      console.log('Could not fetch restaurant: ', err);
    })
  }

  componentDidMount() {
    this.fetchRestaurant();
  }

  handleShowSchedule() {
    this.setState({
      showFullSchedule: true
    });
  }

  render() {
    let { name, categories, priceRange, address, phone, schedule } = this.state.restaurant;
    // handle getting categories despite async
    let listOfCategories = categories ? 
    (categories.map((category, i) => {
      if (i === categories.length - 1) {
        return <span key={i} className="about-category">{category}</span>
      } else {
        return <span key={i} className="about-category">{category}, </span>
      }
    })) : null;
    // handle getting price range despite async
    let price;
    if (priceRange === 1) {
      price = "$";
    } else if (priceRange === 2) {
      price = "$$";
    } else if (priceRange === 3) {
      price = "$$$";
    } else if (priceRange === 4) {
      price = "$$$$";
    } else {
      price = "$$$$$";
    }
    // handle getting address despite async
    let address1 = null;
    let address2 = null;
    let miles = null;
    if(address) {
      address1 = address['line1'];
      address2 = address['line2'];
      miles = address['milesAway'] + " mi";
    }
    // handle hours (part of which is based on the user's current day) despite async
    let weekdayDelivery;
    let weekdayPickup;
    let weekendDelivery;
    let weekendPickup;

    if(schedule) {
      weekdayDelivery = schedule['monFri']['delivery'];
      weekdayPickup = schedule['monFri']['pickup'];
      weekendDelivery = schedule['satSun']['delivery'];
      weekendPickup = schedule['satSun']['pickup'];
    }
    let d = new Date();
    let day = d.getDay();
    let todaysHours;
    if(day >= 1 && day <= 5) {
      todaysHours = 
      <div>
        <span className="about-hours-delivery">Delivery: <span>{weekdayDelivery}</span></span>
        <span className="about-hours-pickup">Pickup: <span>{weekdayPickup}</span></span>
      </div>
    } else {
      todaysHours = 
      <div>
        <span className="about-hours-delivery">Delivery: <span>{weekendDelivery}</span></span>
        <span className="about-hours-pickup">Pickup: <span>{weekendPickup}</span></span>
      </div>
    }

    let hours = this.state.showFullSchedule ?     
    (<div className="about-hours-container">
      <div className="about-hours-option">
        Mon-Fri
        <div className="about-hours">
          <div>
            <span className="about-hours-delivery">Delivery: <span>{weekdayDelivery}</span></span>
            <span className="about-hours-pickup">Pickup: <span>{weekdayPickup}</span></span>
          </div>
        </div>  
      </div>
      <div className="about-hours-option">
        Sat-Sun
        <div className="about-hours">
          <div>
            <span className="about-hours-delivery">Delivery: <span>{weekendDelivery}</span></span>
            <span className="about-hours-pickup">Pickup: <span>{weekendPickup}</span></span>
          </div>
        </div>
      </div>
    </div>) : 
    (
    <div>
      <div className="about-today-container">
        Today
        <div className="about-hours">{todaysHours}</div>    
      </div>
      <p id="see-full-sched" onClick={this.handleShowSchedule}>See the full schedule</p>
    </div>);

    return(
    <div className="about-app">
      <h3>About {name}</h3>
      {listOfCategories}
      <div className="about-price-container">
        <div className="about-price-range">{price}</div>
        <div className="about-price-base">$$$$$</div>
      </div>
      <div className="about-left">
        <img src="https://s3-us-west-1.amazonaws.com/kayjayhogan/map-default.png"></img>  
        <div className="about-address-container">
          <p>{address1}</p>
          <p>{address2}</p>
          <p>{miles}</p>
        </div>      
        <div className="about-phone-container">
          <p>{phone}</p>
        </div>
      </div>
      <div className="about-right">
        <h4>Hours</h4>
        {hours}
      </div>
    </div>);
  }
}



export default About;