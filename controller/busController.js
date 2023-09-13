const Bus = require("../Models/Bus")
const HandleError = require("../shared/HandleError")
const moment = require("moment")

module.exports.getIndividual = async (req) => {
    try {
        const bus = await Bus.findById(req.params.id)
        if (bus) {
            return { data: bus }
        }
        return { messsage: 'Bus not found', code: 404 }
    } catch (error) {
        return HandleError(error)
    }
}


module.exports.searchBus = async (req) => {
    try {
        const { place } = req.params;
        const buses = await Bus.find({ 'busRoutes.place': place })
            .sort('-busStartTime')
            .populate('busRoutes');

        return { data: buses }
    } catch (error) {
        return HandleError(error);
    }
};

