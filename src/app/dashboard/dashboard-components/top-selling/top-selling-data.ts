export interface Product {
    image: string,
    uname: string,
    gmail: string,
    productName: string,
    status: string,
    weeks: number,
    budget: string
}

export const TopSelling: Product[] = [

    {
        image: 'assets/images/users/user1.jpg',
        uname: 'Rama1',
        gmail: 'ram1@gmail.com',
        productName: 'Austin, TX',
        status: 'danger',
        weeks: 35,
        budget: '95K'
    },
    {
        image: 'assets/images/users/user2.jpg',
        uname: 'Rama2',
        gmail: 'ram2@gmail.com',
        productName: 'California, CA',
        status: 'info',
        weeks: 35,
        budget: '95K'
    },
    {
        image: 'assets/images/users/user3.jpg',
        uname: 'Rama3',
        gmail: 'ram3@gmail.com',
        productName: 'New York, NY',
        status: 'warning',
        weeks: 35,
        budget: '95K'
    },
    {
        image: 'assets/images/users/user4.jpg',
        uname: 'Rama4',
        gmail: 'ram4@gmail.com',
        productName: 'Sanjose, CA',
        status: 'success',
        weeks: 35,
        budget: '95K'
    },

]