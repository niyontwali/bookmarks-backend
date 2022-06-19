"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkMutation = exports.BookmarkQuery = exports.Bookmark = void 0;
const nexus_1 = require("nexus");
exports.Bookmark = (0, nexus_1.objectType)({
    name: "Bookmark",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.string('description');
        t.nonNull.string("link");
    }
});
exports.BookmarkQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field("allBookmarks", {
            type: 'Bookmark',
            resolve(parent, args, context, info) {
                return context.prisma.bookmark.findMany();
            }
        }),
            t.field('oneBookmark', {
                type: "Bookmark",
                args: {
                    id: (0, nexus_1.nonNull)((0, nexus_1.intArg)())
                },
                resolve(parent, args, context) {
                    return context.prisma.bookmark.findUnique({
                        where: {
                            id: args.id
                        },
                    });
                }
            });
    }
});
exports.bookmarkMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createBookmark", {
            type: "Bookmark",
            args: {
                title: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                description: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                link: (0, nexus_1.nonNull)((0, nexus_1.stringArg)())
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
        });
        t.nonNull.field('updateBookmark', {
            type: "Bookmark",
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                title: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                description: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                link: (0, nexus_1.nonNull)((0, nexus_1.stringArg)())
            },
            resolve(parent, args, context) {
                const { title, description, link, id } = args;
                const updatedBookmark = context.prisma.bookmark.update({
                    where: {
                        id
                    },
                    data: {
                        title,
                        description,
                        link
                    }
                });
                return updatedBookmark;
            }
        });
        t.nonNull.field('deleteBookmark', {
            type: 'Bookmark',
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)())
            },
            resolve(parent, args, context) {
                const { id } = args;
                return context.prisma.bookmark.delete({
                    where: {
                        id
                    }
                });
            }
        });
    }
});
