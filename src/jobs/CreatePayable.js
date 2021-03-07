
const PayableJob = {
    key: 'CreatePayable',
    async handle({data}) {
        console.log(data);
    }
}

module.exports = {PayableJob}