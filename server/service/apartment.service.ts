import Apartments from "../model/apartmentSchema";

export const createApartments = async (data) => Apartments.create(data);
export const listApartments = async () => Apartments.find();
export const getApartmentById = async (id) => Apartments.findById(id);
export const updateApartment = async (id, data) =>
  Apartments.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

export const removeApartment = async (id) => {
  const apartment = await Apartments.findById(id);
  apartment.remove();
};
