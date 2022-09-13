package com.bitcamp.travelkkaebi.repository;

import com.bitcamp.travelkkaebi.entity.PickMeApplyEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PickMeApplyRepository extends JpaRepository<PickMeApplyEntity, Integer> {
    Boolean existsByUserEntityIdAndPickMeEntityId(int userId, int boardId);

    Page<PickMeApplyEntity> findByUserEntityIdOrderByIdDesc(int userId, Pageable pageable);

    int countByUserEntityId(int userId);

    Page<PickMeApplyEntity> findByUserEntityId(int userId, Pageable pageable);
}
