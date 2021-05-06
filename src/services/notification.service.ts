import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBus } from '../event-bus/event-bus';
import { CreateCommentsEvents } from '../event-bus/events/comment-events';

@Injectable()
export class NotificationService implements OnModuleInit {
  constructor(private eventBus: EventBus) {}

  onModuleInit(): any {
    const commentCreateEvent$ = this.eventBus.ofType(CreateCommentsEvents);
  }

  async createCommentEmailNotification({ comment }) {}
}
