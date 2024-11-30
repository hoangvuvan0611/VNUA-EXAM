package com.vvh.vnua_test.repository.dsl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vvh.vnua_test.entity.QUser;
import com.vvh.vnua_test.entity.User;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Class ho tro viec viet cau lenh truy van native
 */
@Repository
@RequiredArgsConstructor
public class UserRepositoryDSLImpl implements UserRepositoryDSL {

    private final EntityManager entityManager;
    private JPAQueryFactory queryFactory;

    @PostConstruct
    public void init() {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    QUser user = QUser.user;

    @Override
    public Page<User> getAllUser(Pageable pageable) {
        List<User> users = new ArrayList<>();
        try {
            users = queryFactory.selectFrom(user)
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .fetch();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new PageImpl<>(users);
    }

}
