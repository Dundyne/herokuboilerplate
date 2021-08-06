import * as mongoose from "mongoose";
import { model, Types, Document } from "mongoose";
//import { IApartment } from "../../interfaces/IApartment";
interface IApartment extends Document {
  title: String;
  description: String;
  address: String;
  city: String;
  date?: Date;
  squareMeter: Number;
  bedrooms: Number;
  bathrooms: Number;
  price: Number;
  apartment: Boolean;
  incoming: Boolean;
  house: Boolean;
  commerce: Boolean;
  deposit?: Number;
  rentGuarantee?: String;
  parking: Boolean;
  newlyBuilt: Boolean;
  imagePath?: 
  [
    {
      type: String;
    }

  ]
}

const ApartmentSchema: mongoose.Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Fyll ut tittel!"],
    },
    description: {
      type: String,
      required: [true, "Fyll ut beskrivelse!"],
    },
    address: {
      type: String,
      required: [true, "Fyll ut adresse!"],
    },
    city: {
      type: String,
      required: [true, "Fyll ut by!"],
    },
    date: {
      type: Date,
      required: [false, "Fyll ut dato!"],
    },
    squareMeter: {
      type: Number,
      required: [true, "Fyll ut kvadratmeter!"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Fyll ut antall soverom!"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Fyll ut antall bad!"],
    },
    price: {
      type: Number,
      required: [true, "Fyll ut pris!"],
    },
    apartment: {
      type: Boolean,
      required: [true, "Fyll ut leilighet!"],
    },
    incoming: {
      type: Boolean,
      required: [true, "Fyll ut innkommende!"],
    },
    house: {
      type: Boolean,
      required: [true, "Fyll ut hus!"],
    },
    commerce: {
      type: Boolean,
      required: [true, "Fyll ut næringsbygg!"],
    },
    deposit: {
      type: Number,
      required: [false, "Fyll ut depositum!"],
    },
    rentGuarantee: {
      type: String,
      required: [false, "Fyll ut leiegaranti!"],
    },
    parking: {
      type: Boolean,
      required: [true, "Fyll ut parkering!"],
    },
    newlyBuilt: {
      type: Boolean,
      required: [true, "Fyll ut nybygg!"],
    },
    imagePath: 
    [
      {
        type: String,
      }
  
    ]
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default mongoose.model<IApartment>("Apartments", ApartmentSchema);
