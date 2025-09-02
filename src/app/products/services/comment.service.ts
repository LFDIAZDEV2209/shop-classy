import { computed, Injectable, signal } from "@angular/core";
import { COMMENTS_DATA, getCommentsByProductId, getAllComments, getCommentById } from "../../shared/data/comments.data";
import { Comment } from "../../shared/interfaces/comment.interface";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private readonly commentsSignal = signal<Comment[]>(COMMENTS_DATA);

    // Computed para obtener comentarios por ID de producto
    getCommentsByProductId(productId: number) {
        return computed(() => 
            this.commentsSignal().filter(comment => comment.productId === productId)
        );
    }

    // Método síncrono para obtener comentarios por ID de producto
    getCommentsByProductIdSync(productId: number): Comment[] {
        return getCommentsByProductId(productId);
    }

    getAllComments(): Comment[] {
        return getAllComments();
    }

    getCommentById(id: number): Comment | undefined {
        return getCommentById(id);
    }

    // Método para agregar un nuevo comentario
    addComment(comment: Omit<Comment, 'id' | 'date'>): void {
        const newComment: Comment = {
            ...comment,
            id: this.getNextId(),
            date: new Date()
        };
        
        this.commentsSignal.update(comments => [...comments, newComment]);
    }

    // Método para obtener el siguiente ID disponible
    private getNextId(): number {
        const comments = this.commentsSignal();
        return comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1;
    }

    // Método para obtener estadísticas de comentarios por producto
    getCommentStats(productId: number) {
        return computed(() => {
            const comments = this.commentsSignal().filter(comment => comment.productId === productId);
            const totalComments = comments.length;
            const averageRating = totalComments > 0 
                ? comments.reduce((sum, comment) => sum + comment.rating, 0) / totalComments 
                : 0;
            
            return {
                totalComments,
                averageRating: Math.round(averageRating * 10) / 10, // Redondear a 1 decimal
                ratingDistribution: {
                    5: comments.filter(c => c.rating === 5).length,
                    4: comments.filter(c => c.rating === 4).length,
                    3: comments.filter(c => c.rating === 3).length,
                    2: comments.filter(c => c.rating === 2).length,
                    1: comments.filter(c => c.rating === 1).length
                }
            };
        });
    }
}