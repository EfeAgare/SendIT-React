const parcels = [
    {
        id: 0,
        deliveryAddress: {
            firstName: 'Success',
            lastName: 'Shaw',
            streetAddress: '9 izomo street',
            addressCity: 'Warri',
            addressState: 'Delta'
        },
        expectedArrival: {
            from: '2018-11-14 2:48 PM',
            to: '2018-11-17 2:48 PM',
        },
        itemShipped: {
            name: 'Dell Inspiron n411z',
            description: 'Dell mini 4gb ram black',
        },
        email: "hrtiuo@yahoo.com",
        phoneNumber: "09070911674",
        status: 'In Transit'
    },
    {
        id: 1,
        deliveryAddress: {
            firstName: 'Churchill',
            lastName: 'Paul',
            streetAddress: '10 ake street',
            addressCity: 'Mariga',
            addressState: 'Niger'
        },
        expectedArrival: {
            from: '2018-11-24 2:48 PM',
            to: '2018-11-27 2:48 PM',
        },
        itemShipped: {
            name: 'Xtouch E',
            description: 'Xtouch white internal memory 8gb ',
        },
        email: "hrtiuo@yahoo.com",
        phoneNumber: "09070911674",
        status: 'Delivered'
    },
    {
        id: 2,
        deliveryAddress: {
            firstName: 'Churchill',
            lastName: 'Paul',
            streetAddress: '10 ake street',
            addressCity: 'Mariga',
            addressState: 'Niger'
        },
        expectedArrival: {
            from: '2018-11-14 2:48 PM',
            to: '2018-11-17 2:48 PM',

        },
        itemShipped: {
            name: 'Tecno W3',
            description: 'Tecno W3 internal memory 8gb ',
        },
        email: "hrtiuo@yahoo.com",
        phoneNumber: "09070911674",
        status: 'Awaiting Pickup'
    }
]
export default parcels;