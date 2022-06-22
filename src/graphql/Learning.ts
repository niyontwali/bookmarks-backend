import { extendType, nonNull, objectType, intArg, stringArg } from "nexus";

export const Learning = objectType({
  name: "Learning",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("excerpt");
    t.nonNull.string("content");
    t.nonNull.string("category")
  },
});

// Query
export const LearningQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allLearnings", {
      type: "Learning",
      args: {
        filter: stringArg(),
      },
      resolve(parent, args, context, info) {
        const where = args.filter
        ? {
          OR: [
            { category: { contains: args.filter } },
          ],
        }
        : {};
        return context.prisma.learning.findMany({
          where,
          orderBy: [
            {
              id: "desc",
            },
          ],
        });
      },
    }),
      // find one learning
      t.field("oneLearning", {
        type: "Learning",
        args: {
          id: nonNull(intArg()),
        },
        resolve(parent, args, context) {
          return context.prisma.learning.findUnique({
            where: {
              id: args.id,
            },
          });
        },
      });
  },
});

// Mutation

export const LearningMutation = extendType({
  type: "Mutation",
  definition(t) {
    // creating a Learning card
    t.nonNull.field("createLearning", {
      type: "Learning",
      args: {
        title: nonNull(stringArg()),
        excerpt: nonNull(stringArg()),
        content: nonNull(stringArg()),
        category: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { title, excerpt, content, category } = args;
        const newLearning = context.prisma.learning.create({
          data: {
            title,
            excerpt,
            content,
            category,
          },
        });
        return newLearning;
      },
    });

    // upating a learning
    t.nonNull.field("updateLearning", {
      type: "Learning",
      args: {
        id: nonNull(intArg()),
        title: nonNull(stringArg()),
        excerpt: nonNull(stringArg()),
        content: nonNull(stringArg()),
        category: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { title, excerpt, content, category, id } = args;
        const updatedLearning = context.prisma.learning.update({
          where: {
            id,
          },
          data: {
            title,
            excerpt,
            content,
            category,
          },
        });
        return updatedLearning;
      },
    });

    // deleting a learning
    t.nonNull.field("deleteLearning", {
      type: "Learning",
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        const { id } = args;
        return context.prisma.learning.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
