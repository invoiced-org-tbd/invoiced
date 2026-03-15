import { sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import * as s from 'drizzle-orm/sqlite-core';

export const idColumn = () =>
	s
		.text()
		.primaryKey()
		.$defaultFn(() => uuidv4())
		.notNull();

export const createdAtColumn = () =>
	s
		.integer({ mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`);

export const updatedAtColumn = () =>
	s
		.integer({ mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.$onUpdate(() => new Date());
