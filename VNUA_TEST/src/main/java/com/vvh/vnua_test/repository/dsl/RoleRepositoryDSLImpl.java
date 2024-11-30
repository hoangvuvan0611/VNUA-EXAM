package com.vvh.vnua_test.repository.dsl;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vvh.vnua_test.dto.model.RoleDTO;
import com.vvh.vnua_test.entity.QRole;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RoleRepositoryDSLImpl implements RoleRepositoryDSL {

    private final EntityManager entityManager;

    private JPAQueryFactory queryFactory;
    private final ModelMapper modelMapper = new ModelMapper();

    @PostConstruct
    public void init() {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    QRole qRole = QRole.role1;

    @Override
    public Page<RoleDTO> findAllRoles(Pageable pageable) {
        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();
        pageable.getSort().forEach(order -> {
            if ("role".equals(order.getProperty())) {
                if(order.getDirection().isAscending()) {
                    orderSpecifiers.add(qRole.role.asc());
                } else {
                    orderSpecifiers.add(qRole.role.desc());
                }
            }

            if("createAt".equals(order.getProperty())) {
                if(order.getDirection().isAscending()) {
                    orderSpecifiers.add(qRole.role.asc());
                } else {
                    orderSpecifiers.add(qRole.role.desc());
                }
            }

            if("updateAt".equals(order.getProperty())) {
                if(order.getDirection().isAscending()) {
                    orderSpecifiers.add(qRole.role.asc());
                } else {
                    orderSpecifiers.add(qRole.role.desc());
                }
            }
        });

        long total = queryFactory.selectFrom(qRole).fetchCount();
        List<RoleDTO> roleDTOList = queryFactory
                .selectFrom(qRole)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .orderBy(orderSpecifiers.toArray(new OrderSpecifier[0]))
                .fetch().stream().map(role -> modelMapper.map(role, RoleDTO.class)).toList();
        return new PageImpl<>(roleDTOList, pageable, total);
    }
}
