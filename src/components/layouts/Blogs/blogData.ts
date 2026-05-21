import blogImage1 from '../../../assets/Blog/Blog-1.jpg';
import blogImage2 from '../../../assets/Blog/Blog-2.jpg';
import blogImage3 from '../../../assets/Blog/Blog-3.jpg';

export interface Post {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}

export const blog: Post[] = [
  {
    id: '01',
    category: 'Consejos de Salud',
    date: 'December 9, 2025',
    title: 'Qué esperar en tu primera consulta ortodóncica',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In this post, we share five easy daily habits that can drastically improve your oral health — from brushing techniques to smart food choices.',
    imageUrl: blogImage1.src,
  },
  {
    id: '02',
    category: 'Tratamientos',
    date: 'December 9, 2025',
    title: 'Ortodoncia invisible vs brackets tradicionales',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
    imageUrl: blogImage2.src,
  },
  {
    id: '03',
    category: 'Cuidado Dental',
    date: 'December 9, 2025',
    title: 'Cómo mantener una sonrisa sana después del tratamiento',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    imageUrl: blogImage3.src,
  },
];