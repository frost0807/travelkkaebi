package com.bitcamp.travelkkaebi.repository;

import com.bitcamp.travelkkaebi.entity.PickMeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PickMeRepository extends JpaRepository<PickMeEntity, Integer> {

    Page<PickMeEntity> findByOrderByIdDesc(Pageable pageable);

    Page<PickMeEntity> findAllByUserEntityNicknameContainingOrderByIdDesc(String nickname, Pageable pageable);

    Page<PickMeEntity> findAllByWriteInfoTitleContainingOrderByIdDesc(String title, Pageable pageable);

    Page<PickMeEntity> findAllByRegion(String region, Pageable pageable);

    @Query("select count (p) from PickMeEntity p")
    int countPickMe();
}
