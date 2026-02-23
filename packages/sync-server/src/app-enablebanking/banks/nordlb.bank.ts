import { components } from '../models/enablebanking-openapi.js';
import { Transaction } from '../models/enablebanking.js';

import { BankProcessorFor } from './bank-registry.js';
import { FallbackBankProcessor } from './fallback.bank.js';
import { isKeyValueCache } from './utils.js';

@BankProcessorFor(['DE_NORD/LB'])
export class NordLBBankProcessor extends FallbackBankProcessor {
  name = 'NordLBBankProcessor';

  skipTransaction(t: components['schemas']['Transaction']): boolean {
    const transaction = super.normalizeTransaction(t);

    // Sometimes the Nord/LB return transactions with a value of zero. 
    // Usually these are payroll accounting (Entgeldabrechnungen) transactions 
    // where the return is less then one cent.
    // The client cant handle transactions with a value of zero so we have to filter them out.
    return transaction.amount == 0;
  }

  normalizeTransaction(t: components['schemas']['Transaction']): Transaction {
    const transaction = super.normalizeTransaction(t);

    transaction.booked = transaction.status == "BOOK";

    return transaction;
  }
}
