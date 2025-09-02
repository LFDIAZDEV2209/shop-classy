import { Comment } from "../interfaces/comment.interface";

export const COMMENTS_DATA: Comment[] = [
    {
        id: 1,
        productId: 1, // Comentario para el producto con ID 1
        name: 'María González',
        comment: 'Excelente producto, muy suave en la piel y efectivo. Lo recomiendo totalmente.',
        rating: 5,
        date: new Date('2024-01-15')
    },
    {
        id: 2,
        productId: 1,
        name: 'Carlos Rodríguez',
        comment: 'Buen limpiador facial, aunque el precio es un poco alto. Funciona bien para pieles sensibles.',
        rating: 4,
        date: new Date('2024-01-10')
    },
    {
        id: 3,
        productId: 1,
        name: 'Ana Martínez',
        comment: 'Me encanta la textura y el aroma. Mi piel se siente más limpia y fresca.',
        rating: 5,
        date: new Date('2024-01-08')
    },
    {
        id: 4,
        productId: 2, // Comentario para el producto con ID 2
        name: 'Luis Pérez',
        comment: 'Producto de buena calidad, aunque tarda un poco en hacer efecto.',
        rating: 3,
        date: new Date('2024-01-12')
    },
    {
        id: 5,
        productId: 3, // Comentario para el producto con ID 3
        name: 'Sofia Herrera',
        comment: 'Increíble! Mi piel nunca se había sentido tan suave. Definitivamente lo compraré de nuevo.',
        rating: 5,
        date: new Date('2024-01-14')
    }
];

// Funciones helper para filtrar comentarios
export const getCommentsByProductId = (productId: number): Comment[] => {
    return COMMENTS_DATA.filter(comment => comment.productId === productId);
};

export const getAllComments = (): Comment[] => {
    return COMMENTS_DATA;
};

export const getCommentById = (id: number): Comment | undefined => {
    return COMMENTS_DATA.find(comment => comment.id === id);
};