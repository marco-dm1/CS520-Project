const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`CS520 Survey App listening on port ${port}`)
})

app.get('/api/survey/:request', (req, res) => {
    switch(req.params.request){
        case 'create':
            // Performs create action of survey
            break;
        case 'delete':
            // Performs delete action of survey

            break;
        case 'edit':
            // Performs edit action of surevy
            break;
        case 'share':
            // Sends share link back.
            break;
        default:
            res.json({ status: 'Error', message: 'Unknown route!' });
    }
    res.send('Unknown')
})