export interface IApartment {
  _id: any;
  title: string;
  description: string;
  address: string;
  city: string;
  date?: Date;

  squareMeter: number;
  bedrooms: number;
  bathrooms: number;
  price: number;

  apartment: boolean;
  incoming: boolean;
  house: boolean;
  commerce: boolean;

  deposit?: number;
  rentGuarantee?: string;
  parking: boolean;
  newlyBuilt: boolean;
  imagePath?: [
    {
      type: string;
    }
  ];
}

export interface IApartmentFilter {
  apartment: boolean;
  incoming: boolean;
  house: boolean;
  commerce: boolean;
  newlyBuilt: boolean;
  city: string;
}

export interface IApartmentProps {
  props: IApartment;
}
