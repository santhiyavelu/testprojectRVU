import {Plan} from '../models/Plan_Model';
import {plansData} from '../mock/planMockData';

const VAT_RATE = 0.05; //5% VAT
const DAYS_IN_YEAR = 365;

export function calculateAnnualCharge(plan: Plan, annualUsage: number): number {
  let remainingUsage = annualUsage;
  let totalCost = 0;

  // Calculate cost for each rate tier
  for (const rate of plan.rates) {
    if (rate.threshold !== undefined && remainingUsage > 0) {
      const usageAtThisRate = Math.min(remainingUsage, rate.threshold);

      console.log(usageAtThisRate, 'usageAtThisRate----');

      totalCost += usageAtThisRate * rate.price;

      console.log(totalCost, 'totalcost-----');

      remainingUsage -= usageAtThisRate;
    } else if (remainingUsage > 0) {
      console.log(remainingUsage, 'remainingusuage-');

      totalCost += remainingUsage * rate.price;
      console.log(totalCost, 'totalcost else---');

      remainingUsage = 0;
    }
  }

  const standingChargeAnnual = (plan?.standing_charge ?? 0) * DAYS_IN_YEAR;
  console.log(standingChargeAnnual, 'standingChargeAnnual');

  totalCost = (totalCost + standingChargeAnnual) / 100;
  console.log(totalCost, 'totalcost------');

  const totalCostWithVAT = totalCost * (1 + VAT_RATE);

  return parseFloat(totalCostWithVAT.toFixed(2));
}

export function logPlanPrices(plans: Plan[], annualUsage: number) {
  plans.forEach(plan => {
    const totalCharge = calculateAnnualCharge(plan, annualUsage);

    console.log(`${plan.supplier},${plan.plan},${totalCharge.toFixed(2)}`);
  });
}
