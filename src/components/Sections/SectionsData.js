import { faHouseUser, faInfoCircle, faAddressBook, faCalendar, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons';

export const SectionsData = [
    {
        title: 'Home',
        url: '#',
        cName: 'nav-links',
        icon: faHouseUser, 
    },
    {
        title: 'About us',
        url: '#',
        cName: 'nav-links',

        icon: faInfoCircle 
    },
    {
        title: 'Contact',
        url: '#',
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
        url: '#',
        cName: 'nav-links-mobile',
        icon: faUnlock 
    },
    {
        title: 'Signup',
        url: '#',
        cName: 'nav-links-mobile',
        icon: faUser 
    }   
];
