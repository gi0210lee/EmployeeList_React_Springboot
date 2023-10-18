package Board.BackendSpringBoot.repository;

import Board.BackendSpringBoot.model.EmployeeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeModel, Long> {


}
