import React from 'react';
import axios from 'axios';
import SigninModal from '../Modals/Signin/SigninModal.jsx';
import ShareModal from '../Modals/Share/ShareModal.jsx';
import { FaAngleLeft } from 'react-icons/fa';
import { FaShareAlt } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import './Intro.css';

class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      showSigninModal: false,
      showShareModal: false
    };
    this.fetchRestaurant = this.fetchRestaurant.bind(this);
    this.handleShowSignin = this.handleShowSignin.bind(this);
    this.handleHideSignin = this.handleHideSignin.bind(this);
    this.handleShowShare = this.handleShowShare.bind(this);
    this.handleHideShare = this.handleHideShare.bind(this);
  }

  handleShowSignin() {
    this.setState({
      showSigninModal: true
    });
  }

  handleHideSignin() {
    this.setState({
      showSigninModal: false
    });
  }

  handleShowShare() {
    this.setState({
      showShareModal: true
    });
  }

  handleHideShare() {
    this.setState({
      showShareModal: false
    });
  }

  /* NOTE: Had to have intro component fetch restaurant instead of receiving prop from App because the image
  was being fetched asynchronously and wasn't responding to CSS styling. */
  fetchRestaurant() {
    const _id = window.location.href.split("id=")[1];
    axios.get(`/api/restaurants/${_id}`)
    .then(({ data }) => {
      let restaurantInfo = data[0];
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

  render() {
    // Get info from restaurant and handle async
    let { name, image, address, phone, ratings } = this.state.restaurant;
    let address1 = null;
    let stars = null;
    let starSource = null;
    let numRatings = 0;
    let good = 0;
    let timely = 0;
    let correct = 0;
    let sampleCustomer = null;
    let sampleCustomerInitial = null;
    let sampleReview = null;
    if (address && ratings) {
      address1 = address['line1'];
      stars = ratings['stars'];
      numRatings = ratings['number'];
      good = ratings['good'];
      timely = ratings['timely'];
      correct = ratings['correct'];
      sampleCustomer = ratings['sampleReview']['name'];
      sampleCustomerInitial = sampleCustomer.slice(0, 1);
      sampleReview = ratings['sampleReview']['review'];
    } 
    // Set image for star ratings
    if (stars === 2.5) {
      starSource = "https://s3-us-west-1.amazonaws.com/kayjayhogan/Stars/2halfstars.png";
    } else if (stars === 3) {
      starSource = "https://s3-us-west-1.amazonaws.com/kayjayhogan/Stars/3stars.png";
    } else if (stars === 3.5) {
      starSource = "https://s3-us-west-1.amazonaws.com/kayjayhogan/Stars/3halfstars.png";
    } else if (stars === 4) {
      starSource = "https://s3-us-west-1.amazonaws.com/kayjayhogan/Stars/4stars.png";
    } else if (stars === 4.5) {
      starSource = "https://s3-us-west-1.amazonaws.com/kayjayhogan/Stars/4halfstars.png";
    } else {
      starSource = "https://s3-us-west-1.amazonaws.com/kayjayhogan/Stars/5stars.png";
    }
    // Get signin modal ready
    const signinModal = this.state.showSigninModal ? 
    (<SigninModal handleHide={this.handleHideSignin}></SigninModal>) : null;
    // Get share modal ready
    const shareModal = this.state.showShareModal ? 
    (<ShareModal handleHide={this.handleHideShare} restaurant={name}></ShareModal>) : null;

    return(<div className="intro-app">
      {signinModal}
      {shareModal}
      <div className="intro-img-container" style={{backgroundImage: `url(${image})`}}>
        <div className="intro-icon-container">         
          <button className="intro-back-btn"><FaAngleLeft /></button>
        </div>
        <div className="intro-icon-container">
          <button className="intro-share-btn" onClick={this.handleShowShare}><FaShareAlt /></button>
          <button className="intro-save-btn" onClick={this.handleShowSignin}><FaBookmark /></button>
        </div>
      </div>
      <div className="intro-summary">
        <div className="intro-logo-container">
          <img src="https://s3-us-west-1.amazonaws.com/kayjayhogan/default-img.png"></img>
        </div>
        <h1>{name}</h1>
        <p><span className="intro-add">{address1}</span><span>{phone}</span></p>
        <div className="intro-tooltip">
          <img src={starSource} className="intro-stars"></img>
          <span className="intro-num-ratings">{numRatings} ratings</span>
          <div className="intro-tooltip-bottom">
            <div className="intro-tooltip-container">
              <span className="intro-tooltip-header">Here's what people are saying:</span>
              <div className="intro-tooltip-breakdown">
                <span className="intro-tooltip-percent"><strong>{good}</strong>%</span>
                <br></br>
                <span className="intro-tooltip-label">Food was good</span>
              </div>
              <div className="intro-tooltip-breakdown-mid">
                <span className="intro-tooltip-percent"><strong>{timely}</strong>%</span>
                <br></br>
                <span className="intro-tooltip-label">Delivery was on time</span> 
              </div>
              <div className="intro-tooltip-breakdown">
                <span className="intro-tooltip-percent"><strong>{correct}</strong>%</span>
                <br></br>
                <span className="intro-tooltip-label">Order was correct</span>
              </div>              
            </div>
            <div className="intro-tooltip-review-container">
              <div className="intro-tooltip-avatar">{sampleCustomerInitial}</div>
              <div className="intro-tooltip-review">
                <span><strong>{sampleCustomer}:</strong></span>
                <br></br>
                <span>{sampleReview}</span>
              </div>
            </div>
            <div className="intro-tooltip-all-reviews">All Reviews ({numRatings})</div>
            <i></i>
          </div>
        </div>
        <span className="intro-rating-breakdown">
          <span className="intro-percent"><strong>{good}</strong>%</span> Food was good 
          <span className="intro-percent"><strong>{timely}</strong>%</span> Delivery was on time 
          <span className="intro-percent"><strong>{correct}</strong>%</span> Order was correct
        </span>
      </div>
    </div>);
  }
}

export default Intro;