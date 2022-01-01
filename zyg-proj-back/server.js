/* TODO (missing)
    - cors
    - bad request - validation to fields
    - improvement: remove duplicate try catch with async wrapper
*/

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');

const EmployeeRepo = require('./employeeRepo')
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// get list of employees
router.get('/employee', async function(req, res, next) {
    let employeeRepo = new EmployeeRepo();
    try {
        const employees = await employeeRepo.getEmployees()
        return res.json({ employees });
    } catch (e) {
        next(e)
    }
});
// get one employee by id
router.get('/employee/:employeeId', async function(req, res, next) {
   let employeeRepo = new EmployeeRepo()
   try {
    const employee = await employeeRepo.getOneEmployee(req.params.employeeId)
    if(!employee) {
        res.status(404).json({ message: `Employee with id ${req.params.employeeId} does not exist` });
    }
    res.json({ employee })
   } catch (e) {
     next(e)
   }
})
// create employee
router.post('/employee', async function(req, res, next) {
    let employeeRepo = new EmployeeRepo()
    try {
        await employeeRepo.createNewEmployee(req.body)
        res.status(201).json({ newEmployee: req.body })
    } catch (e) {
        next(e)
    }
})
// update employee data
router.put('/employee/:employeeId', async function(req, res, next) {
    let employeeRepo = new EmployeeRepo()
    try {
        const rowsAffected = await employeeRepo.updateEmployee(req.params.employeeId, req.body)
        if(rowsAffected === 0) {
            res.status(404).json({ message: `Employee with id ${req.params.employeeId} does not exist` });
        }
        res.status(200).json({message: 'Employee updated successfully'})
    } catch (e) {
        next(e)
    }
})
// delete employee
router.delete('/employee/:employeeId', async function(req, res, next) {
    let employeeRepo = new EmployeeRepo()
    try {
        const rowsAffected = await employeeRepo.deleteEmployee(req.params.employeeId)
        if(rowsAffected === 0) {
            res.status(404).json({ message: `Employee with id ${req.params.employeeId} does not exist` });
        }
        res.status(200).json({message: 'Employee deleted successfully'})
    } catch (e) {
        next(e)
    }
})

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);