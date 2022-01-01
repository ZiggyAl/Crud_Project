const dbPool = require('./database_connection');

class EmployeeRepo {

    async getEmployees() {
        // date was parsed wrong by javascript as a datetime.
        // https://stackoverflow.com/questions/37191084/postgresql-returns-incorrect-date-format
        const result = await dbPool.query('SELECT *, date_of_birth::varchar FROM employee')
        return result.rows
    }

    async getOneEmployee(employee_id) {
        const result = await dbPool.query('SELECT *, date_of_birth::varchar FROM employee WHERE id=$1', [employee_id])

        if(result.rows.length !== 0) {
            return result.rows[0]
        }
        return null
    }

    async createNewEmployee(employeeData) {
        const result = await dbPool.query(`INSERT INTO employee(first_name, last_name, is_active, date_of_birth)
                                           VALUES ($1, $2, $3, $4)`, 
                                     [employeeData.firstName, employeeData.lastName, employeeData.isActive, employeeData.dateOfBirth])
    }

    async updateEmployee(employeeId, employeeData) {
        const result = await dbPool.query(`UPDATE employee
                                           SET first_name = $1, last_name = $2, is_active = $3, date_of_birth = $4
                                           WHERE id=$5`,
                                           [employeeData.firstName, employeeData.lastName, employeeData.isActive, 
                                           employeeData.dateOfBirth, employeeId])
        return result.rowCount
    }

    async deleteEmployee(employeeId) {
        const result = await dbPool.query(`DELETE FROM employee WHERE id=$1;`,
                                           [ employeeId ])
        return result.rowCount
    }


    


}

module.exports = EmployeeRepo;