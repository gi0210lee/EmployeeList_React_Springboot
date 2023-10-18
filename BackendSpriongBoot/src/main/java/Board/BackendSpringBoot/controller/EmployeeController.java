package Board.BackendSpringBoot.controller;

import Board.BackendSpringBoot.exception.ResourceNotFoundException;
import Board.BackendSpringBoot.model.EmployeeModel;
import Board.BackendSpringBoot.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // get all employees
    @GetMapping("/employees")
    public List<EmployeeModel> getAllEmployees() {
        return employeeRepository.findAll(Sort.by(Sort.Direction.DESC, "FirstName"));
    }


    // create employee rest api
    @PostMapping("/employees")
    public EmployeeModel createEmployee(@RequestBody EmployeeModel employeeModel) {

        return employeeRepository.save(employeeModel);
    }


    // get employee by id rest api
    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeModel>  getEmployeeById(@PathVariable Long id){
        EmployeeModel employeeModel = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        return ResponseEntity.ok(employeeModel);
    }

    // update employee rest api
    @PutMapping("/employees/{id}")
    public ResponseEntity<EmployeeModel> updateEmployee(@PathVariable Long id, @RequestBody EmployeeModel newEmployeeModel) {
        EmployeeModel employeeModel = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        employeeModel.setFirstName(newEmployeeModel.getFirstName());
        employeeModel.setLastName(newEmployeeModel.getLastName());
        employeeModel.setEmailId(newEmployeeModel.getEmailId());

        EmployeeModel updatedEmployeeModel = employeeRepository.save(employeeModel);
        return ResponseEntity.ok(updatedEmployeeModel);
    }

    // delete employee rest api
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
        EmployeeModel employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id : " + id));
        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("delete", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
