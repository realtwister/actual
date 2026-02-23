import type { components } from './enablebanking-openapi.js';
import type { Transaction } from './enablebanking.js';

export type BankProcessor = {
  debug: boolean;
  name: string;

  skipTransaction: (
    transaction: components['schemas']['Transaction'],
    edited_transaction?: Transaction,
  ) => boolean;

  normalizeTransaction: (
    transaction: components['schemas']['Transaction'],
  ) => Transaction;
};
