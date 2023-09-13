const mongoose = require("mongoose");
const handleError = require("../shared/HandleError");
const fetchData = require("../shared/FetchData");

module.exports =
    (Model, { condition, sort, populate, isDelete, select } = {}) =>
        async (req, res, next) => {
            try {
                if (req == undefined || Model == undefined) {
                    throw { message: "Requset or Model Paramter Missing", code: 500 };
                }

                var data;
                var { id } = req.params;
                var payload = req.body;
                var message = "";
                if (id) id = new mongoose.Types.ObjectId(id);
                condition = condition || req.condition || {};
                select = select || req.params.select || {};
                const getQuery = { ...req.query };
                delete getQuery.page;
                delete getQuery.limit;
                delete getQuery.query;

                switch (req.method) {
                    case "GET":
                        data =
                            await fetchData(req, res, Model, {
                                condition: getQuery ?? {},
                                sort: sort,
                                populate: populate,
                                selectOptions: select,
                            });

                        break;
                    case "POST":
                        data = await new Model(payload).save();
                        data = data._id;
                        message = "Successfully Saved";
                        break;

                    case "PUT":
                        console.log("UPDATE VALUES", payload);
                        data = await Model.findByIdAndUpdate(id, payload);
                        data = data._id;
                        message = "Successfully Updated";
                        break;

                    case "DELETE":
                        if (!isDelete) {
                            await Model.findByIdAndDelete(id);
                        } else {
                            await Model.findByIdAndUpdate(id, { isDeleted: true });
                        }

                        message = "Delete Successful";
                        break;
                }

                res.result = { data, message };
                next();
            } catch (error) {
                if (error.code === 11000) {
                    const key = Object.keys(error.keyValue)[0];
                    error.code = 400;
                    error.message = `${key} already exists.`;
                }

                res.result = handleError(error);
                next();
            }
        };
