package com.vvh.vnua_test.repository.jdbc;

import com.vvh.vnua_test.dto.response.BatchInsertResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class JdbcBatchInserter<T> {

    private final JdbcTemplate jdbcTemplate;

    public BatchInsertResult bathInsert(List<T> entities, String sqlQuery) {
        BatchInsertResult result = new BatchInsertResult();

        return result;
    }

    // Phuong thuc duoc trien khai
    protected void setStatementParameters(PreparedStatement ps, T entities) throws SQLException {
        throw new UnsupportedOperationException("Must implement setStatementParameters");
    }
}
