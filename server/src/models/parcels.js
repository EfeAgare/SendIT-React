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
            lastName: 'Agare',
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
        email: "hr@yahoo.com",
        phoneNumber: "09084943978",
        status: 'Delivered'
    },
    {
        id: 2,
        deliveryAddress: {
            firstName: 'Regina',
            lastName: 'Paul',
            streetAddress: '10 ake street',
            addressCity: 'Mariga',
            addressState: 'Niger'
        },
        expectedArrival: {
            from: '2018-10-14 2:48 PM',
            to: '2018-11-17 2:48 PM',

        },
        itemShipped: {
            name: 'Tecno W3',
            description: 'Tecno W3 internal memory 8gb ',
        },
        email: "hrefe@yahoo.com",
        phoneNumber: "08052465959",
        status: 'Awaiting Pickup'
    }
]
export default parcels;