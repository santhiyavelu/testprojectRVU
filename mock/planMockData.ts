import {Plan} from '../models/Plan_Model';

export const plansData: Plan[] = [
  {
    supplier: 'sse',
    plan: 'standard',
    rates: [
      {price: 13.5, threshold: 150},
      {price: 11.1, threshold: 100},
      {price: 10},
    ],
    standing_charge: 9,
  },
  {
    supplier: 'ovo',
    plan: 'standard',
    rates: [{price: 12.5, threshold: 300}, {price: 11}],
  },
  {
    supplier: 'edf',
    plan: 'fixed',
    rates: [
      {price: 14.5, threshold: 250},
      {price: 10.1, threshold: 200},
      {price: 9},
    ],
  },
  {
    supplier: 'bg',
    plan: 'standing-charge',
    rates: [{price: 9}],
    standing_charge: 7,
  },
];

/**
 * {
        supplier: 'eon',
        plan: 'variable',
        rates: [{price: 13.5, threshold: 100}, {price: 10}],
      },
      {
        supplier: 'ovo',
        plan: 'standard',
        rates: [{price: 12.5, threshold: 300}, {price: 11}],
      },
      {
        supplier: 'edf',
        plan: 'fixed',
        rates: [
          {price: 14.5, threshold: 250},
          {price: 10.1, threshold: 200},
          {price: 9},
        ],
      },
      {
        supplier: 'bg',
        plan: 'standing-charge',
        rates: [{price: 9}],
        standing_charge: 7,
      },
 */
