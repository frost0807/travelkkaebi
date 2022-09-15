package com.bitcamp.travelkkaebi.repository;

import com.bitcamp.travelkkaebi.entity.PickMeApplyEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PickMeApplyRepository extends JpaRepository<PickMeApplyEntity, Integer> {
    Boolean existsByUserEntityIdAndPickMeEntityId(int userId, int boardId);

    Page<PickMeApplyEntity> findByUserEntityIdOrderByIdDesc(int userId, Pageable pageable);

    @Query("select pm, pmp, u from PickMeApplyEntity pm " +
            "join pm.pickMeEntity pmp " +
            "join pm.userEntity u " +
            "where pmp.userEntity.id = :userId " +
            "and pmp.id = :boardId " +
            "order by pm.id " +
            "desc")
    List<PickMeApplyEntity> takeMeList(@Param("userId") int userId, int boardId, Pageable pageable);

    @Query(value = "select count(pm) from PickMeApplyEntity pm " +
            "join pm.pickMeEntity pmp " +
            "join pm.userEntity u " +
            "where pmp.userEntity.id = :userId")
    int countByApply(int userId);
}