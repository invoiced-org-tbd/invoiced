import type { db } from './client';

type Db = typeof db;
export type Tx = Parameters<Parameters<Db['transaction']>[0]>[0];
