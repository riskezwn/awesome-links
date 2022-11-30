import { enumType, objectType } from 'nexus';
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
    t.list.field('bookmarks', {
      type: Link,
      async resolve(_parent, _args, ctx) {
        return ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id as string,
            },
          })
          .bookmarks();
      },
    });
  },
});
