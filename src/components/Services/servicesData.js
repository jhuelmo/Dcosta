import serviceImage1 from '../../assets/Services/Service-1.jpg';
import serviceImage2 from '../../assets/Services/Service-2.jpg';
import serviceImage3 from '../../assets/Services/Service-3.jpg';

export const services = [
  {
    id: '01',
    title: 'Servicio numero 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    items: [
      'Propiedad numero 1',
      'Propiedad numero 2',
      'Propiedad numero 3'
    ],
    image: serviceImage1.src
  },
  {
    id: '02',
    title: 'Servicio numero 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis autem vel eum.',
    items: [
      'Propiedad numero 1',
      'Propiedad numero 2',
      'Propiedad numero 3'
    ],
    image: serviceImage2.src
  },
  {
    id: '03',
    title: 'Servicio numero 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    items: [
      'Propiedad numero 1',
      'Propiedad numero 2',
      'Propiedad numero 3'
    ],
    image: serviceImage3.src
  }
];
