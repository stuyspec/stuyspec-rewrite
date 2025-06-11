interface AdvertisementOptions {
    print: boolean;
  title: string;
  description?: string;
  unit?: string;
  width?: number;
  height?: number;
  cost: CostOptions[];
}
interface CostOptions {
  sizeLowerBound: number;
  sizeUpperBound?: number;
  cost: number;
}
const purchaseOptions: AdvertisementOptions[] = [
  {
    print: true,
    title: "Full Page",
    description: undefined,
    unit: "in",
    width: 15.5,
    height: 9.5,
    cost: [
      { sizeLowerBound: 1, sizeUpperBound: undefined, cost: 500 },
      { sizeLowerBound: 2, sizeUpperBound: 6, cost: 450 },
      { sizeLowerBound: 7, sizeUpperBound: 15, cost: 400 },
      { sizeLowerBound: 16, sizeUpperBound: undefined, cost: 240 },
    ],
  },
  {
    print: true,
    title: "Half Page",
    description: undefined,
    unit: "in",
    width: 7.5,
    height: 9.5,
    cost: [
      { sizeLowerBound: 1, sizeUpperBound: undefined, cost: 350 },
      { sizeLowerBound: 2, sizeUpperBound: 6, cost: 300 },
      { sizeLowerBound: 7, sizeUpperBound: 15, cost: 250 },
      { sizeLowerBound: 16, sizeUpperBound: undefined, cost: 130 },
    ],
  },
  {
    print: true,
    title: "Quarter Page",
    description: undefined,
    unit: "in",
    width: 7.5,
    height: 5,
    cost: [
      { sizeLowerBound: 1, sizeUpperBound: undefined, cost: 200 },
      { sizeLowerBound: 2, sizeUpperBound: 6, cost: 160 },
      { sizeLowerBound: 7, sizeUpperBound: 15, cost: 120 },
      { sizeLowerBound: 16, sizeUpperBound: undefined, cost: 70 },
    ],
  },
  {
    print: true,
    title: "Eighth Page",
    description: undefined,
    unit: "in",
    width: 4,
    height: 5,
    cost: [
      { sizeLowerBound: 1, sizeUpperBound: undefined, cost: 120 },
      { sizeLowerBound: 2, sizeUpperBound: 6, cost: 85 },
      { sizeLowerBound: 7, sizeUpperBound: 15, cost: 60 },
      { sizeLowerBound: 16, sizeUpperBound: undefined, cost: 40 },
    ],
  },
  {
    print: false,
    title: "Box",
    description: undefined,
    unit: "px",
    width: 375,
    height: 500,
    cost: [
      { sizeLowerBound: 2, sizeUpperBound: undefined, cost: 150 },
      { sizeLowerBound: 4, sizeUpperBound: 8, cost: 135 },
      { sizeLowerBound: 9, sizeUpperBound: 15, cost: 120 },
      { sizeLowerBound: 16, sizeUpperBound: undefined, cost: 90 },
    ],
  },
  {
    print: false,
    title: "Banner",
    description: undefined,
    unit: "px",
    width: 900,
    height: 200,
    cost: [
      { sizeLowerBound: 2, sizeUpperBound: undefined, cost: 125 },
      { sizeLowerBound: 4, sizeUpperBound: 8, cost: 115 },
      { sizeLowerBound: 9, sizeUpperBound: 15, cost: 100 },
      { sizeLowerBound: 16, sizeUpperBound: undefined, cost: 75 },
    ],
  },
];
const GetPurchaseOptions = ():AdvertisementOptions[] => {
    return purchaseOptions;
}
export default GetPurchaseOptions;