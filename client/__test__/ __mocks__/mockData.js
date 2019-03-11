import sinon from 'sinon';

export const user = {
  isAuthenticated: true,
  detail: {
    name: 'Efe',
    lastname: 'Agare',
    role:'user'
  }
};

export const event = {
  preventDefault() {},
  target: { name: 'the-value', lastname: 'Agare',
  role:'user' }
};
export const spyUserSigninSuccess = sinon.spy(() =>
  Promise.resolve({ message: 'Sign in successfully' })
);
export const spyUserSignupFailure = sinon.spy(() =>
  Promise.resolve({ message: 'Email already exist' })
);
export const spyhandleDestinationChange = sinon.spy(() =>
  Promise.resolve({ message: 'Parcel destination changed successfully' })
);

export const spyLoadParcelSuccess = sinon.spy(() =>
  Promise.resolve({ message: 'Parcels retrieved successfully' })
);

export const spyhandleStatusChange = sinon.spy(() =>
  Promise.resolve({ message: 'Parcel Status Updated successfully and Email sent successfully' })
);
export const spyhandleCancelParcel = sinon.spy(() =>
  Promise.resolve({ message: 'Parcel cancelled successfully' })
);
export const spyhandleCurrentLocationChange = sinon.spy(() =>
  Promise.resolve({ message: 'Parcel Location Updated successfully  and Email sent successfully' })
);
export const parcelOrder = [
  {
    id: 1,
    name: 'Efename',
    deliveryAddress: 'deliveryAddress',
    deliveryPNumber: '09080977876',
    pickUpAddress: 'req.body.pickUpAddress',
    itemDescription: 'req.body.itemDescription',
    itemWeight: '1',
    itemQuantity: '2'
  },
  {
    id: 2,
    name: 'Efename',
    deliveryAddress: 'deliveryAddress',
    deliveryPNumber: '09080977876',
    pickUpAddress: 'req.body.pickUpAddress',
    itemDescription: 'req.body.itemDescription',
    itemWeight: '1',
    itemQuantity: '1'
  },
  {
    id: 3,
    name: 'Efename',
    deliveryAddress: 'deliveryAddress',
    deliveryPNumber: '09080977876',
    pickUpAddress: 'req.body.pickUpAddress',
    itemDescription: 'req.body.itemDescription',
    itemWeight: '1',
    itemQuantity: '1'
  }
];
