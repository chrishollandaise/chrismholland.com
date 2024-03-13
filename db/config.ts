import { column, defineDb, defineTable } from 'astro:db';

// https://astro.build/db/config

export const Contact = defineTable({
  columns: {
    name: column.text(),
    email: column.text(),
    dateSent: column.date(),
    message: column.text(),
    metadata: column.json()
  }
});


export default defineDb({
  tables: { Contact }
});
