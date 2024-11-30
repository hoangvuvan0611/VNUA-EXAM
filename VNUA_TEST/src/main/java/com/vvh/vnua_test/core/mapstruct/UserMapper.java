package com.vvh.vnua_test.core.mapstruct;

import com.vvh.vnua_test.dto.model.UserDTO;
import com.vvh.vnua_test.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    UserDTO userToUserDTO(User user);
    User userDTOToUser(UserDTO userDTO);
}
