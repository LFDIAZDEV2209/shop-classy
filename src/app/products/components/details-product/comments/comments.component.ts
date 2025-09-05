import { Component, input, computed, signal, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommentService } from "../../../services/comment.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'comments-component',
  templateUrl: './comments.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {
  // Input para recibir el ID del producto
  readonly productId = input<number | null>(null);
  
  // Signals para el estado del componente
  readonly isLoading = signal(false);
  readonly showAddComment = signal(false);
  
  // Formulario para nuevo comentario
  readonly newComment = signal({
    name: '',
    comment: '',
    rating: 5
  });

  constructor(private commentService: CommentService) {}

  // Computed para obtener comentarios del producto
  readonly comments = computed(() => {
    const id = this.productId();
    if (!id) return [];
    return this.commentService.getCommentsByProductIdSync(id);
  });

  // Computed para estadísticas de comentarios
  readonly commentStats = computed(() => {
    const id = this.productId();
    if (!id) return null;
    return this.commentService.getCommentStats(id)();
  });

  // Método para agregar un nuevo comentario
  addComment() {
    const id = this.productId();
    const comment = this.newComment();
    
    if (!id || !comment.name.trim() || !comment.comment.trim()) {
      return;
    }

    this.commentService.addComment({
      productId: id,
      name: comment.name.trim(),
      comment: comment.comment.trim(),
      rating: comment.rating
    });

    // Limpiar el formulario
    this.newComment.set({
      name: '',
      comment: '',
      rating: 5
    });
    
    this.showAddComment.set(false);
  }

  // Método para toggle del formulario
  toggleAddComment() {
    this.showAddComment.update(show => !show);
  }

  // Método para actualizar la calificación
  updateRating(rating: number) {
    this.newComment.update(comment => ({ ...comment, rating }));
  }

  // Método para obtener el conteo de una calificación específica
  getRatingCount(rating: number): number {
    const stats = this.commentStats();
    if (!stats) return 0;
    return stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] || 0;
  }

  // Método para obtener el porcentaje de una calificación específica
  getRatingPercentage(rating: number): number {
    const stats = this.commentStats();
    if (!stats || stats.totalComments === 0) return 0;
    return (this.getRatingCount(rating) / stats.totalComments) * 100;
  }
}