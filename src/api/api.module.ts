import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { GraphQLConfig } from '../config/config.interface';
import { DateScalar } from '../common/scalar/date.scalar';
import { AuthModule } from './resolvers/auth/auth.module';
import { AuthController } from './controllers/auth/auth.controller';
import { ServicesModule } from '../services/services.module';
import { UserModule } from './resolvers/user/user.module';
import { PostModule } from './resolvers/post/post.module';
import { PostController } from './controllers/post/post.controller';
import { APP_GUARD } from '@nestjs/core';
import { GQLAuthGuard } from './resolvers/auth/guards/auth.guard';
import { RequestContextService } from './common/request-context.service';
import { MagicLinkGateway } from './gateway/magiclink.gateway';
import { EventBusModule } from '../event-bus/event-bus.module';
import { UserController } from './controllers/user/user.controller';
import { CommentModule } from './resolvers/comment/comment.module';
import { UpvoteModule } from './resolvers/upvote/upvote.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const gqlConfig = configService.get<GraphQLConfig>('graphql');
        return {
          autoSchemaFile: gqlConfig.schema,
          debug: gqlConfig.debug,
          playground: gqlConfig.playground,
          sortSchema: true,
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          context: ({ req }) => ({ req }),
        };
      },
      inject: [ConfigService],
    }),
    EventBusModule,
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    UpvoteModule,
    ServicesModule,
  ],
  controllers: [AuthController, PostController, UserController],
  providers: [
    RequestContextService,
    {
      provide: APP_GUARD,
      useClass: GQLAuthGuard,
    },
    DateScalar,
  ],
})
export class ApiModule {}