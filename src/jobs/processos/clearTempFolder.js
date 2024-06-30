const cron = require('node-cron');
const { clearTempFolder } = require('../../controllers/files-controller');

// Limpa a pasta temp todos os dias às 00:01
cron.schedule('1 0 * * *', ()=>{
    clearTempFolder()
})