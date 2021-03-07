const Queue = require('bull')
const redisConfig = require('../../config/redis');

const { PayableJob } = require('../jobs/CreatePayable');

const payableQueue = new Queue('payableQueue', redisConfig);

const add = function(data) {
    return payableQueue.add(data);
}

const process = function() {
    return payableQueue.process(PayableJob.handle)
}

module.exports = {
    payableQueue,
    add,
    process
}