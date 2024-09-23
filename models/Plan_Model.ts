export type Rate = {
  price: number;
  threshold?: number;
};

export type Plan = {
  supplier: string;
  plan: string;
  rates: Rate[];
  standing_charge?: number;
};
