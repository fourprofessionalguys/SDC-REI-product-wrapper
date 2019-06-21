import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/components/app.jsx';
import { fetchImages, fetchProduct } from './postgresFetch.js'

const style = `
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");
@import url("https://fonts.googleapis.com/css?family=Domine&display=swap");
body {
  margin: 0; }

#product-wrapper {
  display: flex;
  position: relative;
  font-family: Roboto, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #292b2c;
  padding: 5vh 10vw;
  /*****************
     ** LEFT COLUMN **
    ******************/
  /*******************
     ** RIGHT COLUMN **
    ******************/ }
  #product-wrapper a, #product-wrapper .product-shipping-button {
    color: #3278ae;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer; }
  #product-wrapper a:hover {
    text-decoration: underline; }
  #product-wrapper hr {
    height: 0;
    border-top: 1px solid #e5e5e5;
    border-bottom: 0;
    border-left: 0;
    border-right: 0;
    margin: 24px 0; }
  #product-wrapper .row {
    display: flex;
    justify-content: space-around; }
  #product-wrapper .hidden {
    display: none !important; }
  #product-wrapper .spinner {
    margin-top: -20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    min-height: 50rem;
    height: 100%;
    background: #fff;
    z-index: 10; }
  #product-wrapper .product-media-wrapper {
    width: 66%;
    max-height: 30rem;
    background: #fff;
    display: block;
    z-index: 2; }
    #product-wrapper .product-media-wrapper .jumbo-wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      z-index: 1; }
      #product-wrapper .product-media-wrapper .jumbo-wrapper .hover-wrapper {
        display: block;
        position: absolute;
        height: 15rem;
        width: 10rem;
        transform: scale(1);
        border: 1px solid #ddd;
        pointer-events: none;
        outline: rgba(255, 255, 255, 0.59) solid 150rem;
        z-index: 0; }
      #product-wrapper .product-media-wrapper .jumbo-wrapper img {
        cursor: none;
        max-height: 100%;
        max-width: 100%; }
    #product-wrapper .product-media-wrapper .product-info {
      align-items: flex-start;
      font-size: 14px;
      text-align: left;
      justify-content: flex-start; }
      #product-wrapper .product-media-wrapper .product-info span {
        color: #767676; }
    #product-wrapper .product-media-wrapper .carousel {
      position: relative;
      background: #fff;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-top: 1.3rem;
      padding-bottom: 10px;
      overflow: hidden;
      z-index: 1; }
      #product-wrapper .product-media-wrapper .carousel .row {
        left: -270px;
        overflow-x: scroll;
        display: inline-flex;
        position: relative;
        flex-shrink: 0; }
      #product-wrapper .product-media-wrapper .carousel .row::-webkit-scrollbar {
        display: none; }
      #product-wrapper .product-media-wrapper .carousel div .active {
        border-color: #4eaaff; }
      #product-wrapper .product-media-wrapper .carousel .carousel-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        width: 114px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin: 4px;
        cursor: pointer; }
        #product-wrapper .product-media-wrapper .carousel .carousel-item div > * {
          pointer-events: none; }
        #product-wrapper .product-media-wrapper .carousel .carousel-item img {
          max-height: 76px;
          max-width: 110px;
          padding: 4px; }
      #product-wrapper .product-media-wrapper .carousel button {
        display: block;
        width: 3.2rem;
        position: absolute;
        top: 0;
        height: 100%;
        padding: 0;
        text-align: center;
        border: none;
        z-index: 1; }
      #product-wrapper .product-media-wrapper .carousel .left {
        left: 0;
        background: linear-gradient(to right, #fff 0, #fff 30%, rgba(255, 255, 255, 0) 100%); }
      #product-wrapper .product-media-wrapper .carousel .right {
        right: 0;
        background: linear-gradient(to left, #fff 0, #fff 70%, rgba(255, 255, 255, 0) 100%); }
    #product-wrapper .product-media-wrapper #zoom-cursor {
      height: 30rem;
      width: 20rem;
      position: absolute;
      top: 20vh;
      left: 59vw;
      overflow: hidden;
      border: 1px solid #292b2c;
      z-index: 2;
      background: #fff; }
      #product-wrapper .product-media-wrapper #zoom-cursor img {
        display: block;
        position: relative;
        max-height: 480px;
        max-width: 540px;
        transform: scale(2);
        transform-origin: top left; }
  #product-wrapper .checkout-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: .8rem 30px;
    width: 34%;
    background: #fff; }
    #product-wrapper .checkout-wrapper h1 {
      margin: 0 0 5px 0; }
    #product-wrapper .checkout-wrapper .product-name h1 {
      font-size: 28px;
      line-height: 1.3;
      font-family: Domine; }
    #product-wrapper .checkout-wrapper .product-current-price {
      font-family: Domine;
      font-size: 20px;
      font-weight: 700; }
    #product-wrapper .checkout-wrapper .product-info-row {
      display: flex;
      justify-content: space-between; }
    #product-wrapper .checkout-wrapper .message-wrapper {
      margin: 24px 0; }
    #product-wrapper .checkout-wrapper .product-shipping-button {
      background: #fff;
      border: none;
      font-size: 1em; }
    #product-wrapper .checkout-wrapper .price-messaging {
      color: #C00; }
    #product-wrapper .checkout-wrapper .details-link {
      font-weight: bold;
      text-decoration: underline;
      cursor: pointer; }
    #product-wrapper .checkout-wrapper .color-wrapper {
      color: #292b2c;
      font-size: 14px;
      width: 150px; }
      #product-wrapper .checkout-wrapper .color-wrapper .icon {
        height: 3.2rem;
        width: 3.4rem;
        padding: 0px 2px;
        display: flex;
        align-items: center;
        justify-content: center; }
      #product-wrapper .checkout-wrapper .color-wrapper .active {
        height: 3.2rem;
        width: 3.4rem;
        z-index: 1;
        border: 1px solid #4eaaff;
        position: absolute;
        border-radius: 5px;
        background: rgba(78, 170, 255, 0.4); }
      #product-wrapper .checkout-wrapper .color-wrapper img {
        width: auto;
        max-height: 100%;
        max-width: 100%; }
    #product-wrapper .checkout-wrapper .user-selection-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end; }
    #product-wrapper .checkout-wrapper .shoe-size-select .select-labels {
      display: flex;
      justify-content: space-between; }
    #product-wrapper .checkout-wrapper .shoe-size-select label {
      font-size: 14px; }
    #product-wrapper .checkout-wrapper .shoe-size-select .size-chart-tab a {
      font-weight: 400;
      font-size: 14px; }
    #product-wrapper .checkout-wrapper .shoe-size-select select {
      color: #2e2e2e;
      height: 40px;
      font-size: 16px;
      border-radius: 2px;
      width: 100%; }
    #product-wrapper .checkout-wrapper .checkout-quantity {
      text-align: center; }
      #product-wrapper .checkout-wrapper .checkout-quantity p {
        font-size: 14px;
        margin: 0;
        color: #292b2c; }
      #product-wrapper .checkout-wrapper .checkout-quantity .row {
        align-items: center; }
      #product-wrapper .checkout-wrapper .checkout-quantity button {
        -webkit-appearance: none;
        border: 1px solid #c5c5c5;
        border-radius: 50%;
        height: 1.4rem !important;
        width: 1.4rem !important;
        padding: 5px;
        font-size: 10px;
        cursor: pointer; }
      #product-wrapper .checkout-wrapper .checkout-quantity input {
        height: 28px !important;
        width: 38px;
        padding: 5px;
        text-align: center;
        font-family: Roboto;
        font-size: 16px;
        border-radius: 2px;
        border: 1px solid #c5c5c5;
        margin: 4px; }
    #product-wrapper .checkout-wrapper .shipping-options {
      margin-left: 1.2rem;
      margin-bottom: .5rem; }
      #product-wrapper .checkout-wrapper .shipping-options a {
        font-weight: 400;
        font-size: 16px; }
      #product-wrapper .checkout-wrapper .shipping-options .radio input[type=radio] {
        opacity: 0; }
      #product-wrapper .checkout-wrapper .shipping-options .radio input[type=radio] + label {
        display: block;
        color: inherit;
        position: relative;
        cursor: pointer; }
      #product-wrapper .checkout-wrapper .shipping-options .radio input[type=radio] + label::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: .4rem;
        left: -1.2rem;
        height: 8px;
        width: 8px;
        border: .2rem solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 0.125rem #222;
        vertical-align: -.2rem; }
      #product-wrapper .checkout-wrapper .shipping-options .radio label::after {
        background: black;
        display: inline-block;
        height: 8px;
        width: 8px;
        border-radius: 50%;
        position: absolute;
        left: -1rem;
        top: .6rem; }
      #product-wrapper .checkout-wrapper .shipping-options .radio input[type=radio] + label::after {
        content: none; }
      #product-wrapper .checkout-wrapper .shipping-options .radio input[type=radio]:checked + label::after {
        content: ''; }
      #product-wrapper .checkout-wrapper .shipping-options .radio input[type=radio]:focus + label::before {
        outline: #3b99fc auto 5px; }
    #product-wrapper .checkout-wrapper .buy {
      text-align: center; }
      #product-wrapper .checkout-wrapper .buy button {
        cursor: pointer;
        border-radius: 2px;
        font-size: 16px; }
      #product-wrapper .checkout-wrapper .buy .primary-checkout-btn {
        background: #426c90;
        border: none;
        color: white;
        padding: 16px 32px;
        width: 100%; }
      #product-wrapper .checkout-wrapper .buy .primary-checkout-btn:hover {
        background: #2b455c; }
      #product-wrapper .checkout-wrapper .buy .secondary-btns {
        display: flex;
        justify-content: space-between;
        margin-top: .5rem; }
        #product-wrapper .checkout-wrapper .buy .secondary-btns button {
          background: #fff;
          border: 1px solid #c5c5c5;
          padding: 12px 0;
          width: 100%; }
        #product-wrapper .checkout-wrapper .buy .secondary-btns button:nth-child(1) {
          margin-right: 1rem; }
        #product-wrapper .checkout-wrapper .buy .secondary-btns button:nth-child(2) {
          margin-left: 1rem; }
        #product-wrapper .checkout-wrapper .buy .secondary-btns button:hover {
          background: #f4f4f4; }
      #product-wrapper .checkout-wrapper .buy a {
        display: block;
        font-weight: 400;
        margin: 20px 10px; }
`;


const renderPage = function (callback) {
  fetchImages().then(({ images, activeImage }) => {
    fetchProduct().then(({ product }) => {
      const initialData = { images, activeImage, product };
      callback({ style, initialData });
    });
  });
};

export default renderPage;