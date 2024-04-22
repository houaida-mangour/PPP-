import { faHouseUser, faInfoCircle, faAddressBook, faCalendar, faUnlock, faUser,faCog } from '@fortawesome/free-solid-svg-icons';

export const SectionsData = [
    {
        title: 'Home',
        url: '#',
        cName: 'nav-links',
        icon: faHouseUser, 
    },
    {
        title: 'About us',
        url: '#AboutUs',
        cName: 'nav-links',

        icon: faInfoCircle 
    },
    {
        title: 'Services',
        url: '#work-service',
        cName: 'nav-links',

        icon: faCog 
    },
    {
        title: 'Contact',
        url: '#Contact',
        cName: 'nav-links',
        icon: faAddressBook 
    },
    {
        title: 'Events',
        url: '#',
        cName: 'nav-links',
        icon: faCalendar 
    },
    {
        title: 'Login',
        url: '#LogIn',
        cName: 'nav-links-mobile',
        icon: faUnlock 
    },
    {
        title: 'Signup',
        url: '#SignUp',
        cName: 'nav-links-mobile',
        icon: faUser 
    }   
];
