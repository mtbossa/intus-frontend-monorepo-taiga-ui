import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from '@intus/tenant/environments/environment';

import { ValidPostForm } from '../feature/post-form/post-form.component';
import { PaginatedResponse } from '../../shared/data-access/interfaces/PaginatedResponse.interface';

export interface Post {
  id: number;
  description: string;
  showing: boolean;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  media_id: number;
  displays_ids: Array<number>;
  expose_time: number | null;
  recurrence_id: number | null;
  created_at: string;
  updated_at: string;
}

export type Key =
  | 'id'
  | 'description'
  | 'start_date'
  | 'end_date'
  | 'start_time'
  | 'end_time'
  | 'expose_time';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  private posts$ = new BehaviorSubject<Post[] | null>(null);

  public fetchIndex(key: Key, direction: -1 | 1, page: number, size: number) {
    return this.http
      .get<PaginatedResponse<Post>>(`${environment.apiUrl}/api/posts`, {
        params: {
          page,
          size,
        },
      })
      .pipe(take(1));
  }

  // Needs to be FormData since we need to upload the file
  public create(data: ValidPostForm) {
    return this.http
      .post<Post>(`${environment.apiUrl}/api/posts`, data)
      .pipe(take(1));
  }

  public show(postId: number, withDisplaysIds = false) {
    return this.http
      .get<Post>(`${environment.apiUrl}/api/posts/${postId}`, {
        params: {
          withDisplaysIds,
        },
      })
      .pipe(take(1));
  }

  public update(postId: number, data: ValidPostForm) {
    return this.http
      .patch<Post>(`${environment.apiUrl}/api/posts/${postId}`, data)
      .pipe(take(1));
  }

  public updateDescription(
    postId: number,
    data: Pick<ValidPostForm, 'description'>
  ) {
    return this.http
      .patch<Post>(
        `${environment.apiUrl}/api/posts/${postId}/description`,
        data
      )
      .pipe(take(1));
  }

  public getPosts() {
    return this.posts$.asObservable();
  }

  public remove(postId: number) {
    return this.http
      .delete(`${environment.apiUrl}/api/posts/${postId}`)
      .pipe(take(1));
  }
}
