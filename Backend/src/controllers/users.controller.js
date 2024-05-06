const router = require('express').Router();
const userService = require('../services/users.service');


// Creates a new User
router.post('/users', (req, res) => {

    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let username = req.body.username
    let password = req.body.password

    let users = userService.create(firstName, lastName, username, password);

    res.json(users);

})

// Retrieves a Specific User using ID
router.get('/user', async (req, res) => {

    let id = req.query.id;

    let user = await userService.getByID(id);
    res.json(user);
});

// Retrieves All Users
router.get('/users', async (req, res) => {

    let users = await userService.getAll();

    res.json(users);
});

// Updates a Specific User
router.put('/user/', async (req, res) => {

    let id = req.query.id

    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let username = req.body.username

    user = userService.update(id, firstName, lastName, username)
    res.json(user)
})

// Removes a Specific User using ID
router.delete('/user/', async (req, res) => {

    let id = req.query.id;

    let user = await userService.delete(id)
    if (user == undefined) {
        res.json(null)
    } else {
        res.json(user)
    }
})

router.post("/user/login", async (req, res) => {

    let user = await userService.loginUser(req.body.username,req.body.password);
    if(user == undefined){
        res.json(null);
    }else{
        res.json(user);

    }
})

router.put('/user/toggleActive', async (req, res) => {
    let id = req.query.id;
    let isActive = req.body.isActive;

    let updatedUser = await userService.toggleActiveStatus(id, isActive);

    if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(updatedUser);
    }
});
module.exports.controller = router;