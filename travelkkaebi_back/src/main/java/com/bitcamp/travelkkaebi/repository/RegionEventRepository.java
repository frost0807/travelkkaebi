package com.bitcamp.travelkkaebi.repository;

import com.bitcamp.travelkkaebi.entity.RegionalEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegionEventRepository extends JpaRepository<RegionalEventEntity, Integer> {

    List<RegionalEventEntity> findTop6ByOrderByLikeCountDesc();

    List<RegionalEventEntity> findByOrderByIdDesc();
}
