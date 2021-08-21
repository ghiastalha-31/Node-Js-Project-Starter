/*
*
*  Server bootstrap
*
*/
module.exports = (app) => {

    /*
    *
    *  Listen server on port
    *
    */
    app.listen(process.env.PORT || 3050, () => { console.log(`server is running on port ${process.env.PORT || 3050}`) })

    /*
    *
    * Health route
    *
    */
    app.get('/health',(req,res)=>{
        res.send(`Server is healthy and running on port ${process.env.PORT || 3050}`)
    })

}