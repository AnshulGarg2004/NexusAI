const getCurrentUser = async (req, res) => {
    try {
        console.log("user in backend : ", req.user);
        
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in get current user: ", error.message);
        return res.status(500).json({message : `error in get current user: ${error.message}`})
        
    }
}

export default getCurrentUser;