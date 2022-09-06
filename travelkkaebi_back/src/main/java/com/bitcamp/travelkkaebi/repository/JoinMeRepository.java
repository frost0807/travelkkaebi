package com.bitcamp.travelkkaebi.repository;

import com.bitcamp.travelkkaebi.entity.JoinMeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface JoinMeRepository extends JpaRepository<JoinMeEntity, Integer> {
//    List<JoinMeEntity> findAllByUserEntityId(int userId);
    List<JoinMeEntity> findAllByUserEntityIdAndStartDateLessThan(int userUd, LocalDateTime localDateTime);
}
