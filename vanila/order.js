const button = document.getElementById('submit-btn');
const messageText = document.getElementById('messageText');

button.addEventListener('click', (event) => {
    const name = document.getElementById('name');
    const deliveryAddress = document.getElementById('delivery-address');
    const phoneNumber = document.getElementById('phone-number');
    const pickUpAddress = document.getElementById('pickup-address');
    const itemDescription = document.getElementById('item-description');
    const itemWeight = document.getElementById('item-weight');
    const itemQuantity = document.getElementById('item-quantity');
    
    const inputData = {
        name: name.value,
        deliveryAddress: deliveryAddress.value,
        deliveryPNumber:  phoneNumber.value,
        pickUpAddress : pickUpAddress .value,
        itemDescription: itemDescription.value,
        itemWeight: itemWeight.value,
        itemQuantity: itemQuantity.value,
    };
    event.preventDefault();
    fetch(`https://efe-sendit.herokuapp.com/api/v1/parcels`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(inputData),
            mode: 'cors'
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            if (res.message === 'Parcels created successfully') {
                const date = new Date(res.data.registered);
                localStorage.setItem('parcelId', res.data.id)
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('deliveryAddress', res.data.deliveryaddress);
                localStorage.setItem('phoneNumber', res.data.deliverypnumber);
                localStorage.setItem('pickUpAddress ', res.data.pickupaddress );
                localStorage.setItem('currentLocation ', res.data.pickupaddress );
                localStorage.setItem('itemDescription', res.data.itemdescription);
                localStorage.setItem('itemWeight', res.data.itemweight);
                localStorage.setItem('itemQuantity', res.data.itemquantity);
                localStorage.setItem('orderDate', date.toLocaleDateString());
                localStorage.setItem('status', res.data.status)
                ;
                localStorage.setItem('userid', res.data.userid)
                window.location.href = 'profile.html';         
            } else if (res.message === 'Can\t create parcel') {
                messageText.textContent = res.message;
            } else {
                messageText.textContent = res.errors;
            }
        })
        .catch(error => {
            messageText.textContent = error + 'server error'
        })
});