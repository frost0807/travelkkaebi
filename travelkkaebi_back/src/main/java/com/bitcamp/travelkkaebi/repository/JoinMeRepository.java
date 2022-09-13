package com.bitcamp.travelkkaebi.repository;

import com.bitcamp.travelkkaebi.entity.JoinMeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface JoinMeRepository extends JpaRepository<JoinMeEntity, Integer> {
    List<JoinMeEntity> findAllByUserEntityIdAndDateInfoStartDateLessThan(int userEntity_id, Timestamp dateInfo_startDate);
}
