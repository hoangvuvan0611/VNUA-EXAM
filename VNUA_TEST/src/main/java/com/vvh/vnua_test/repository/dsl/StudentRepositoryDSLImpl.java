package com.vvh.vnua_test.repository.dsl;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vvh.vnua_test.entity.QStudent;
import com.vvh.vnua_test.entity.Student;
import com.vvh.vnua_test.exception.LogicException;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class StudentRepositoryDSLImpl implements StudentRepositoryDSL {

    private static final Logger log = LoggerFactory.getLogger(StudentRepositoryDSLImpl.class);
    private final EntityManager entityManager;
    private JPAQueryFactory jpaQueryFactory;

    @PostConstruct
    public void init() {this.jpaQueryFactory = new JPAQueryFactory(entityManager);}

    QStudent qstudent = QStudent.student;

    @Override
    public Page<Student> findAll(Pageable pageable) {
        List<Student> studentList;
        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();

        OrderSpecifier<?> orderSpecifier;
        for (Sort.Order order : pageable.getSort()) {
            PathBuilder<Student> entityPath = new PathBuilder<>(Student.class, qstudent.getMetadata());
            orderSpecifier = order.isAscending()
                    ? entityPath.getString(order.getProperty()).asc()
                    : entityPath.getString(order.getProperty()).desc();
            orderSpecifiers.add(orderSpecifier);
        }
        try {
            studentList = jpaQueryFactory.selectFrom(qstudent)
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .orderBy(orderSpecifiers.toArray(new OrderSpecifier[0]))
                    .fetch();
        } catch (Exception e) {
            log.error("Find all student error: {}", e.getMessage(), e);
            throw new LogicException("FA0001", "db.find.all.student");
        }
        return new PageImpl<>(studentList);
    }
}
