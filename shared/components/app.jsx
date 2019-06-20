import React from 'react';
import MediaWrapper from './media-wrapper.jsx';
import Checkout from './checkout.jsx';
import Spinner from './spinner.jsx';

class App extends React.Component {
  // static fetchImages() {
  //   return fetch(`http://${window.location.hostname}:3001/images`)
  //     .then(res => res.json())
  //     .then(data => data)
  //     .catch(err => err);
  // }

  // static fetchProducts() {
  //   return fetch(`http://${window.location.hostname}:3001/products`)
  //     .then(res => res.json())
  //     .then(data => data.row)
  //     .catch(err => err);
  // }

  constructor(props) {
    super(props);
    let { images, activeImage, product } = this.props;
    console.log('images component', product, '\n\n\n\n\n------------------');
    this.state = {
      images: images,
      activeImage: activeImage, // {},
      carouselPosition: 0,
      activeColor: 'flame',
      product: product,
      // product: {
      //   productName: '',
      //   companyName: '',
      //   itemNumber: 0,
      //   color: '',
      //   price: '80.00',
      //   rating: '5',
      //   noRatings: 0,
      //   shoeSizes: [],
      //   activeColor: 'flame',
      // },
      mousePosition: {
        x: 0,
        y: 0,
        absX: 0,
        absY: 0,
      },
      size: null,
      quantity: 1,
      shippingOption: 'ship',
      hover: false,
    };

    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleCarouselPos = this.handleCarouselPos.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.handleShoeSizeSelect = this.handleShoeSizeSelect.bind(this);
    this.handleQuantityClick = this.handleQuantityClick.bind(this);
    this.handleQuantityInput = this.handleQuantityInput.bind(this);
    this.handleShippingInput = this.handleShippingInput.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
    this.updateHover = this.updateHover.bind(this);
  }

  // componentDidMount() {
  //   // The set timeout simulates real-world loading times so the spinner can do its things.
  //   // To get rid of the spinner, change 1500 to 0
  //   App.fetchImages()
  //     .then(data => data.rows.map((item, i) => {
  //       item.id = i + 1;
  //       return item;
  //     }))
  //     .then(data => this.setState({
  //       images: data,
  //       activeImage: data.find(img => img.size === 'full' && img.color === 'flame'),
  //     }, () => {
  //       console.log(this.state);
  //     }));

  //   App.fetchProducts()
  //     .then(data => this.setState({ product: data }))
  //     .then(() => {
  //       const { product } = this.state;
  //       document.title = product.productName;
  //       console.log(this.state);
  //     });
  // }

  handleCarouselPos(e) {
    const { carouselPosition } = this.state;
    // 120 is the width of an image container
    const carouselWidth = e.target.parentNode.parentNode.offsetWidth + 120;
    const newPosition = e.target.value === 'inc' ? carouselPosition + 400 : carouselPosition - 400;

    if (newPosition < 1 && newPosition > -carouselWidth) {
      this.setState({
        carouselPosition: newPosition,
      });
    }
  }

  // This picks the image out of the carousel and makes it the active image
  handleImageClick(e) {
    // Users can click the image itself or the DIV but only the IMG has the dataset attributes.
    // So, if a user clicks the div, we specify the dataset of the child
    const { dataset } = e.target.tagName === 'DIV' ? e.target.children[0] : e.target;
    const { images } = this.state;
    const fullImg = images.find(img => img.color === dataset.color && img.orientation === dataset.orientation && img.size === 'full');
    // index is used by the imageInfo component. Example: 'Image {index} of 10'
    // fullImg.index = Number(dataset.index);
    return this.setState({ activeImage: fullImg });
  }

  handleZoom(e) {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left); //* 2 - 160;
    const y = (e.clientY - rect.top); //* 2 - 240;
    this.setState({
      mousePosition: {
        x,
        y,
        absX: e.pageX,
        absY: e.pageY,
      },
    });
    document.getElementById('zoom-cursor').style.display = 'block';
  }

  updateHover(e) {
    this.setState({
      hover: e.type !== 'mouseout',
    });
  }

  // Checkout handlers
  handleShoeSizeSelect(e) {
    const shoeSize = e.target.value;
    this.setState({
      size: shoeSize,
    });
  }

  handleColorSelect(e) {
    // see note in HandleImageClick
    const node = e.target.tagName === 'DIV' ? e.target.children[0] : e.target;
    const color = node.alt.split(' ')[0];
    const { images } = this.state;
    const newActiveImg = images.find(img => img.color === color && img.size === 'full');
    this.setState({
      activeImage: newActiveImg,
      activeColor: color,
    });
  }

  handleQuantityClick(e) {
    e.target = e.target.tagName === 'BUTTON' ? e.target : e.target.parentNode;
    const val = e.target.dataset.val === 'inc' ? 1 : -1;
    const { quantity } = this.state;
    console.log(e.target.dataset);
    if (quantity + val === 0) {
      return false;
    }
    return this.setState({
      quantity: quantity + val,
    });
  }

  handleQuantityInput(e) {
    const input = Number(e.target.value);
    if (input < 1) {
      return false;
    }
    return this.setState({
      quantity: input,
    });
  }

  handleShippingInput(e) {
    this.setState({
      shippingOption: e.target.value,
    });
  }

  render() {
    const {
      images, activeColor, activeImage, product, quantity, shippingOption, carouselPosition,
      mousePosition, hover,
    } = this.state;
    const checkoutHandlers = {
      shoeSizeSelect: this.handleShoeSizeSelect,
      handleQuantityClick: this.handleQuantityClick,
      handleQuantityInput: this.handleQuantityInput,
      handleShippingInput: this.handleShippingInput,
      handleColorSelect: this.handleColorSelect,
    };
    const mediaHandlers = {
      handleImageClick: this.handleImageClick,
      handleCarouselPos: this.handleCarouselPos,
      handleZoom: this.handleZoom,
      updateHover: this.updateHover,
    };
    // if (activeImage === undefined) {
    //   return (
    //     <div id="product-wrapper">
    //       <Spinner />
    //     </div>
    //   );
    // }
    return (
      <div id="product-wrapper">
        <MediaWrapper
          images={images.filter(img => img.color === activeColor && img.size === 'thumb')}
          active={activeImage}
          handlers={mediaHandlers}
          carouselPosition={carouselPosition}
          mousePosition={mousePosition}
          hover={hover}
        />
        <Checkout
          product={product}
          handlers={checkoutHandlers}
          quantity={quantity}
          images={images.filter(img => img.size === 'select')}
          shippingOption={shippingOption}
          activeColor={activeColor}
        />
      </div>
    );
  }
}

export default App;
