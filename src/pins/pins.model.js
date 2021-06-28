const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
    name: String,
    urlImg: String,
    boardId: {type: mongoose.Schema.Types.ObjectId, ref: "boards"},
    userId: mongoose.Schema.Types.ObjectId,
});

const PinModel = mongoose.model('pins', PinSchema);


const getAll = async () => {
    const pins = await PinModel.find();
    return pins;
}

const searchWord = async (query) => {
    const pins = await PinModel.findOne(query);
    return pins;
}

const create = async (pin) => {
    const pinCreated = await PinModel.create(pin);
    return pinCreated;
};

const getById = async (id) =>{
    const pinById = await PinModel.findById(id);
    return pinById;
 }

 const deleteById = async (id) => {
     const deletePinById = await PinModel.findByIdAndDelete(id);
     return deletePinById;
 }

 const updateById = async (id,body) => {
     const updatePinById = await PinModel.findByIdAndUpdate(id,body);
     return updatePinById;
 }

module.exports = ({
    create,
    searchWord,
    getAll,
    getById,
    deleteById,
    updateById,
})