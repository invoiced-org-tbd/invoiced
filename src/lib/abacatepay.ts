import '@tanstack/react-start/server-only';

import { AbacatePay } from '@abacatepay/sdk';
import { envServer } from './envServer';

export const abacatepay = AbacatePay({ secret: envServer.ABACATEPAY_API_KEY });
