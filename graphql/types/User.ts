import {
  enumType, extendType, objectType, stringArg,
} from 'nexus';
import { Link } from './Link';

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN'],
});

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('image');
    t.field('role', { type: Role });
    t.list.field('favorites', {
      type: Link,
      async resolve(_parent, _args, ctx) {
        return ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id as string,
            },
          })
          .favorites();
      },
    });
  },
});

export const UserFavorites = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('favorites', {
      type: 'Link',
      async resolve(_, _args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user?.email,
          },
          include: {
            favorites: true,
          },
        });
        if (!user) throw new Error('Invalid user');
        return user.favorites;
      },
    });
  },
});

export const BookmarkLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('bookmarkLink', {
      type: 'Link',
      args: {
        id: stringArg(),
      },
      async resolve(_, args, ctx) {
        const link = await ctx.prisma.link.findUnique({
          where: { id: args.id as string },
        });

        if (!link) {
          throw new Error('Link not found');
        }

        await ctx.prisma.user.update({
          where: {
            email: ctx.user?.email,
          },
          data: {
            favorites: {
              connect: {
                id: link.id,
              },
            },
          },
        });
        return link;
      },
    });
  },
});
