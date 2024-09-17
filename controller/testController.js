const testController = (req, res) => {
    try {
        res.status(200).send(
            // {

            // success: true,
            // message: "test user Data API"
            // }
            `<h1>Hi This is Soudip</h1>`
        ) 
    } catch (err) {
        console.log("Error in Test API",err)
    }
 }
module.exports={testController}