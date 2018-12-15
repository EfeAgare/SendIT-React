const cancelParcel= document.getElementById('cancel-btn');
const modal = document.getElementsByClassName('modal')[0];
const modalBtn = document.getElementById('modal-btn');

cancelParcel.addEventListener('click', (event) => {
    event.preventDefault();
    modal.style.display = 'block';
  });
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalMessageText.textContent = '';
  });

  window.addEventListener('click', (event) => {
    if (event.target.className === 'modal') modal.style.display = 'none';
  });
  modalBtn.addEventListener('click', (event) => {
    event.preventDefault();
    modalMessageText.style.color = 'yellow' ;
    modalMessageText.textContent = 'Processing..';
    fetch(`https://efe-sendit.herokuapp.com/api/v1/parcels/${localStorage.getItem('parcelId')}/cancel`, {
      method: 'PUT',
      headers: { 
          'content-type': 'application/json',
          'x-access-token': localStorage.getItem('token')
     }
    })
      .then(res => res.json())
      .then((res) => {
        modalMessageText.style.color = 'green' ;
        if (res.message === 'Parcel cancelled successfully') {
          modalMessageText.textContent = res.message;
      }  else if (res.message === 'Parcel No longer valid to be cancelled') {
        modalMessageText.textContent = res.message;
    } else {
        modalMessageText.textContent = res.errors;
    }
  })
  .catch(error => {
    messageText.textContent = error +''+ 'server error'
  })
  });


  //             <div ${class="modal"}>
//             <div ${class="modal-content clearfix"}> <div ${class="close"}>&times;</div>
//   <p>Are you very sure you want to cancel this Parcel Order</p> 
//       <p ${id = "modal-messageText" class="text-center"} ></p>
//       <button ${id="modal-btn" type="submit"}>Submit</button>
   
//   </div>
// </div>