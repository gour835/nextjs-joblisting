import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

export default definePrismaConfig({
  skills: {
    agents: [],  // Removes all agent sync targets (.claude, .cursor, etc.)
    check: false, // Stops CLI from complaining about out-of-date skills
  },
  orm: ormConfig({
    contract: "./src/prisma/contract.prisma",
    db: {
      connection: process.env['DATABASE_URI']!,
    },
  }),
});
