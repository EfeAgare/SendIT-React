const parcelId = window.location.search.replace('?parcelid=','');
const loader = document.querySelector('.loader');
const messageText = document.getElementById('messageText');
const name = document.getElementById('name');
const deliveryAddress = document.getElementById('delivery-address');
const phoneNumber = document.getElementById('phone-number');
const pickUpLocation = document.getElementById('pick-up');
const currentLocation = document.getElementById('current-location');
const itemDescription = document.getElementById('item-description');
const itemWeight = document.getElementById('item-weight');
const itemQuantity = document.getElementById('item-quantity');
const parcelDate = document.getElementById('date');
const status = document.getElementById('status');
const price = document.getElementById('price');


window.addEventListener('load', (event) => {
  event.preventDefault();
  let url = `https://efe-sendit.herokuapp.com/api/v1/parcels/${parcelId}`;
  fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  })
  .then(res => res.json())
  .then((res) => {
    loader.style.display = 'none';
    if (res.message === 'Parcel retrieved successfully'){
      const date = new Date(res.data.registered);
      name.innerHTML = res.data.name;
      deliveryAddress.innerHTML = res.data.deliveryaddress;
      phoneNumber.innerHTML = res.data.deliverypnumber;
      pickUpLocation.innerHTML = res.data.pickupaddress;
      currentLocation.innerHTML = res.data.currentlocation;
      itemDescription.innerHTML = res.data.itemdescription;
      itemWeight.innerHTML = res.data.itemweight;
      itemQuantity.innerHTML = res.data.itemquantity;
      price.innerHTML = (res.data.itemweight)*(res.data.itemquantity)*2000
      parcelDate .innerHTML = date.toLocaleDateString()
      status.innerHTML = res.data.status;
    }else if (res.message === 'No valid resource found for provided ID'){
      messageText.innerHTML = res.message
    }else {
      messageText.innerHTML = res.message
    }
  })
})
