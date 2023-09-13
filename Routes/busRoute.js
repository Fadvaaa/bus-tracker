const express = require('express')
const router = express.Router()
const CRUD = require('../shared/Crud')
const Model = require('../Models/Bus');
const moment = require('moment');
const cron = require('node-cron');
const { getIndividual, searchBus } = require('../controller/busController');
const SendJson = require('../shared/SendJson');


router.all("/:id?", CRUD(Model, { isDelete: true }));

router.get("/:id", async (req, res) => {
    const result = await getIndividual(req)
    SendJson(res, result)
})

router.get('/search/:place', async (req, res) => {
    const result = await searchBus(req)
    SendJson(res, result)
})

cron.schedule('*/5 * * * * *', async () => {


    try {
        const buses = await Model.find({});
        for (const bus of buses) {
            const currentTime = moment();

            console.log("-------------")
            for (const route of bus.busRoutes) {
                const busTime = moment(route.busTime)
                var str1 = `${busTime.format("HH:mm")}`;
                var str2 = `${currentTime.format("HH:mm")}`;

                if (str1 > str2)
                    route.status = 'idle';
                else
                    route.status = 'running';

                console.log(busTime.format("HH:mm") + " " + currentTime.format("HH:mm") + " " + route.status)
            }

            await bus.save();
        }
    } catch (error) {
        console.error('Cron Job Error:', error);
    }
});

module.exports = router