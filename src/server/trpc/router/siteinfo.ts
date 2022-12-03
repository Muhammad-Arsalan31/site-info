import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const siteInfoRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.site_info.findMany();
  }),
  // paginated: publicProcedure
  // .input(z.object({
  //   limit: z.number().min(1).max(100).nullish(),
  //   cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
  // }))    .query( async ({ input }) => {
  //   const limit = input.limit ?? 50;
  //   const { cursor } = input;
  //   const items = await prisma?.site_info.findMany({
  //     take: limit + 1, // get an extra item at the end which we'll use as next cursor
  
  //     cursor: cursor ? { myCursor: cursor } : undefined,
  //     orderBy: {
  //       myCursor: 'asc',
  //     },
  //   })
  //   let nextCursor: typeof cursor | undefined = undefined;
  //   if (items!.length > limit) {
  //     const nextItem = items!.pop()
  //     nextCursor = nextItem!.myCursor;
  //   }
  //   return {
  //     items,
  //     nextCursor,
  //   };
  // })
});