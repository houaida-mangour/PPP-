import { faHouseUser, faInfoCircle, faAddressBook, faCalendar, faUnlock, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

export const SectionsData = [
    {
        title: 'Home',
        url: '/', // This might need to be adjusted based on your Home section's id
        cName: 'nav-links',
        icon: faHouseUser, 
    },
    {
        title: 'About us',
        url: '#AboutUs', // Ensure this matches the id in the AboutUs component
        cName: 'nav-links',
        icon: faInfoCircle 
    },
    {
        title: 'Services',
        url: '#work-service', // Ensure this matches the id in the Services component
        cName: 'nav-links',
        icon: faCog 
    },
    {
        title: 'Contact',
        url: '#Contact', // Ensure this matches the id in the Contact component
        cName: 'nav-links',
        icon: faAddressBook 
    },
    {
        title: 'Events',
        url: '/EventPage', // This will now navigate to the EventPage route
        cName: 'nav-links',
        icon: faCalendar 
    },
    {
        title: 'Login',
        url: '/LogIn2', // Adjust based on your routing setup
        cName: 'nav-links-mobile',
        icon: faUnlock 
    },
    {
        title: 'Signup',
        url: '/SignUp2', // Adjust based on your routing setup
        cName: 'nav-links-mobile',
        icon: faUser 
    }   
];
