const numberOfParcel = document.getElementById('number-order-parcel');
const loader = document.querySelector('.loader');
const username = document.querySelector('.myname');
const parcelTable = document.querySelector('.responsive-table');
const prevButton = document.querySelectorAll('.pagination button')[0];
const nextButton = document.querySelectorAll('.pagination button')[1];
const pageNumber = document.getElementById('page-num');

let totalParcelOrder;
let pageCounter = 1;
const limit = 20;

const refreshPagination = () => {
    pageCounter = 1;
    pageNumber.textContent = 'Page 1';
    nextButton.style.visibility = 'visible';
    prevButton.style.visibility = 'visible';
    nextButton.disabled = false;
    nextButton.style.backgroundColor = '#15437F';
    prevButton.disabled = true;
    prevButton.style.backgroundColor = 'grey';
  }
  const fetchParcelOrder = (url) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
    })
      .then(res => res.json())
      .then((res) => {
        loader.style.display = 'none';
        if (res.data) {
          totalParcelOrder = res.parcelCount;
          username.innerHTML =  localStorage.getItem('username');
          numberOfParcel.innerHTML = res.parcelCount;
          parcelTable.innerHTML = `<li class="table-header">
          <div class="col col-1">ORDER Date</div>
          <div class="col col-2">Name</div>
          <div class="col col-3">Current Location</div>
          <div class="col col-4">Destination</div>
          <div class="col col-5">Delivery date</div>
          <div class="col col-6">Price(₦)</div>
          <div class="col col-7">Status</div>
          <div class="col col-8"></div>
        </li>`;
          res.data.forEach((parcelOrder) => {
            const date = new Date(parcelOrder.registered);
            const orderId = parcelOrder.id;
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate() + 10;
            let newdate = new Date();
            newdate.setFullYear(year,month,day+10);
            parcelTable.innerHTML += ` <li class="table-row">
            <div class="col col-1" data-label="Order Date: " id="date">${date.toLocaleDateString()}</div>
            <div class="col col-2" data-label="Customer Name:" id="name">${parcelOrder.name}</div>
            <div class="col col-3" data-label="Pickup Address:" id="pickup-address">${parcelOrder.pickupaddress}  </div>
            <div class="col col-4" data-label="Destination: " id="destination">${parcelOrder.deliveryaddress} </div>
            <div class="col col-5" data-label="DeliveryDate: " id="delivery-date">${newdate.toLocaleDateString()}</div>
            <div class="col col-6" data-label="Price: " id="price">${parcelOrder.itemweight  * parcelOrder.itemquantity* 2000}</div>
            <div class="col col-7" data-label="Status:" id="status">${parcelOrder.status} </div>
            <div class="col col-8" data-label="options">
                <div class="dropdown">
                    <div  class="dropbtn">
                        <div id="myDropdown" class="dropdown-content">
                            <p>OPTIONS</p>
                            <p>OPTIONS</p>
                            <a href="#"onclick="cancelparcel(${orderId})">Cancel Parcel</a>
                            <a href="#" onclick="changeDestination(${orderId} )">change destination</a>
                            <a href="parceldetails.html?parcelid=${orderId}">View Details</a>
                          </div>
                    </div>
                  </div>
            </div>`;
          });
        } else if (res.message === 'Authentication Failed') {
          document.body.innerHTML = 'You are not logged in....';
          window.location.href = 'signin.html';
        }else {
          parcelTable.innerHTML = '<p class="text-center">No result found</p>';
        }
      });
  }
  window.addEventListener('load', (event) => {
    event.preventDefault();
    let url = `https://efe-sendit.herokuapp.com/api/v1/users/${ localStorage.getItem('userid')}/parcels`;
    fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
    })
      .then(res => res.json())
      .then((res) => {
        username.innerHTML =  localStorage.getItem('username');
        numberOfParcel.innerHTML = res.parcelCount;
        loader.style.display = 'none';
        if (res.data) {
          totalParcelOrder = res.parcelCount;
          if (totalParcelOrder <= limit) {
            nextButton.style.display = 'none';
            prevButton.style.display = 'none';
            pageNumber.style.display = 'none';
          } else {
            refreshPagination();
          }
          res.data = res.data.slice(0, limit);
          parcelTable.innerHTML = `<li class="table-header">
          <div class="col col-1">ORDER Date</div>
          <div class="col col-2">Name</div>
          <div class="col col-3">Current Location</div>
          <div class="col col-4">Destination</div>
          <div class="col col-5">Delivery date</div>
          <div class="col col-6">Price(₦)</div>
          <div class="col col-7">Status</div>
          <div class="col col-8"></div>
        </li>`;
          res.data.forEach((parcelOrder) => {
            const date = new Date(parcelOrder.registered);
            const orderId = parcelOrder.id;
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            let newdate = new Date();
            newdate.setFullYear(year,month,day+10);
            parcelTable.innerHTML += ` <li class="table-row">
            <div class="col col-1" data-label="Order Date: " id="date">${date.toLocaleDateString()}</div>
            <div class="col col-2" data-label="Customer Name:" id="name">${parcelOrder.name}</div>
            <div class="col col-3" data-label="Pickup Address:" id="pickup-address">${parcelOrder.pickupaddress}  </div>
            <div class="col col-4" data-label="Destination: " id="destination">${parcelOrder.deliveryaddress} </div>
            <div class="col col-5" data-label="DeliveryDate: " id="delivery-date">${newdate.toLocaleDateString()}</div>
            <div class="col col-6" data-label="Price: " id="price">${parcelOrder.itemweight  * parcelOrder.itemquantity* 2000}</div>
            <div class="col col-7" data-label="Status:" id="status">${parcelOrder.status} </div>
            <div class="col col-8" data-label="options">
            <div class="dropdown">
            <div  class="dropbtn">
                <div id="myDropdown" class="dropdown-content">
                    <p>OPTIONS</p>
                    <a href="#"onclick="cancelparcel(${orderId})">Cancel Parcel</a>
                    <a href="#" onclick="changeDestination(${orderId})">change destination</a>
                    <a href="parceldetails.html?parcelid=${orderId}">View Details</a>
                  </div>
            </div>
          </div>
            </div>
            </li>`;
          });
        } else if (res.message === 'Authentication failed') {
          document.body.innerHTML = 'You are not logged in....';
          window.location.href = 'signin.html';
        }else if(res.parcelCount === 0){
          parcelTable.innerHTML = '<p class="text-center">No Parcel Order Created yet. You can easily add a parcel order by clicking the Order button at the top of the page</p>';
        }
      });
  });

nextButton.addEventListener('click', () => {
  pageCounter += 1;
  prevButton.disabled = false;
  prevButton.style.backgroundColor = '#15437F';
  if ((pageCounter) * limit >= totalParcelOrder) {
    nextButton.disabled = true;
    nextButton.style.backgroundColor = 'grey';
  }
  pageNumber.textContent = `Page ${pageCounter}`;
  fetchParcelOrder(`https://efe-sendit.herokuapp.com/api/v1/users/${ localStorage.getItem('userid')}/parcels?page=${pageCounter}&limit=${limit}`);
});
prevButton.addEventListener('click', () => {
  nextButton.disabled = false;
  nextButton.style.backgroundColor = '#15437F';
  pageCounter -= 1;
  if ((pageCounter - 1) < 1) {
    prevButton.disabled = true;
    prevButton.style.backgroundColor = 'grey';
  }
  pageNumber.textContent = `Page ${pageCounter}`;
  fetchParcelOrder(`https://efe-sendit.herokuapp.com/api/v1/users/${ localStorage.getItem('userid')}/parcels?page=${pageCounter}&limit=${limit}`);
});

const modal = document.getElementsByClassName('modal')[0];
const modalBtn = document.getElementById('modal-btn');
const modalMessageCancelText = document.querySelector('#modal-messageText');
const closeBtn = document.querySelector('.close');
const modalDest = document.getElementsByClassName('modal-dest')[0];
const destBtn = document.getElementById('dest-btn');
const modalDestMessageText = document.querySelector('#dest-messageText');
const closeBtnDest = document.querySelector('.close-dest');
const modalDestInput = document.getElementById('dest-input')

const cancelparcel = (parcelid) => {
  modal.style.display = 'block';
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    window.location.reload()
    modalMessageCancelText.textContent = '';
  });
  modalBtn.addEventListener('click', (event) => {
    event.preventDefault();
    modalMessageCancelText.textContent = 'Processing..';
    fetch(`https://efe-sendit.herokuapp.com/api/v1/parcels/${parcelid}/cancel`, {
      method: 'PUT',
      headers: { 
        'content-type': 'application/json',
        'x-access-token': localStorage.getItem('token')
       }
    })
      .then((res) => {
        if (res.message === 'Parcel cancelled successfully') {
          modalMessageCancelText.textContent = res.message;
      }  else if (res.message === 'Parcel No longer valid to be cancelled') { modalMessageCancelText.textContent = res.message;
    } else { modalMessageCancelText.textContent = res.errors; }
  })
  .catch(error => { modalMessageCancelText.textContent = error +''+ 'server error' })
  });
}
const changeDestination = (parcelid) => {
  modalDest.style.display = 'block';
  closeBtnDest.addEventListener('click', () => {
    modalDest.style.display = 'none';
    window.location.reload()
    modalDestMessageText.textContent = '';
  });
  destBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const inputData = { deliveryAddress: modalDestInput.value};
    modalDestMessageText.textContent = 'Processing..';
    fetch(`https://efe-sendit.herokuapp.com/api/v1/parcels/${parcelid}/destination`, {
      method: 'PUT',
      headers: { 
        'content-type': 'application/json',
        'x-access-token': localStorage.getItem('token')
       },
       body: JSON.stringify(inputData),
       mode: 'cors'
    })
      .then(res => res.json())
      .then((res) => {
        if (res.message === 'Parcel destination changed successfully') {
          modalDestMessageText.textContent = res.message;
      }  else if (res.message === 'Parcel Destination can no longer be Changed') {
        modalDestMessageText .textContent = res.message;
    } else { modalDestMessageText.textContent = res.errors;    }
  })
  .catch(error => { modalDestMessageText .textContent = error +''+ 'server error'  })
  });
}