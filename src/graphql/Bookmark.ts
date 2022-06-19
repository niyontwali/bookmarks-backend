import { extendType, nonNull, objectType, intArg, stringArg  } from 'nexus';

export const Bookmark = objectType({
  name: "Bookmark",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string('description');
    t.nonNull.string("link");
  }
})

// Query

export const BookmarkQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field("allBookmarks", {
      type: 'Bookmark',
      resolve(parent, args, context, info) {
        return context.prisma.bookmark.findMany()
      }
    }),
     // find one bookmark
   t.field('oneBookmark', {
    type: "Bookmark",
    args: {
      id: nonNull(intArg())
    },
    resolve (parent, args, context) {
      return context.prisma.bookmark.findUnique({
        where: {
          id: args.id
        },
      })
    }
  })
  }
})

// Mutation

export const bookmarkMutation = extendType({
  type: "Mutation",
  definition(t) {

    // creating a bookmark
    t.nonNull.field("createBookmark", {
      type: "Bookmark",
      args: {
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        link: nonNull(stringArg())
      },
      resolve(parent, args, context) {
        const { title, description, link } = args;
        const newBookmark = context.prisma.bookmark.create({
          data: {
            title,
            description,
            link
          }
        });
        return newBookmark;
      }
    })

    // upating a bookmark
    t.nonNull.field('updateBookmark', {
      type: "Bookmark",
      args: {
        id: nonNull(intArg()),
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        link: nonNull(stringArg())

      },
      resolve(parent, args, context) {
        const {title, description, link, id } = args;
        const updatedBookmark = context.prisma.bookmark.update({
          where: {
            id
          },
          data: {
            title,
            description,
            link
          }
        })
        return updatedBookmark
      }
    })

    // deleting a bookmark
    t.nonNull.field('deleteBookmark', {
      type: 'Bookmark',
      args: {
        id: nonNull(intArg())
      },
      resolve(parent, args, context) {
        const { id } = args;
        return context.prisma.bookmark.delete({
          where: {
            id
          }
        })
      }
    })

  }
})




