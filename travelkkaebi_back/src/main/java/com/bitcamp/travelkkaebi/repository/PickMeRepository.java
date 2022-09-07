package com.bitcamp.travelkkaebi.repository;

import com.bitcamp.travelkkaebi.entity.PickMeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PickMeRepository extends JpaRepository<PickMeEntity, Integer> {

    @Query("select p from PickMeEntity p order by p.id desc ")
    Page<PickMeEntity> pickMeList(Pageable pageable);

    @Query("select p from PickMeEntity p join p.userEntity where p.userEntity.nickname like %:nickname% order by p.id desc")
    Page<PickMeEntity> searchByNickname(String nickname, Pageable pageable);

    @Query("select p from PickMeEntity p where p.writeInfo.title like %:title% order by p.id desc")
    Page<PickMeEntity> searchByTitle(String title, Pageable pageable);

    @Query("select p from PickMeEntity p where p.region like %:keyword% order by p.id desc")
    Page<PickMeEntity> searchByKeyword(String keyword, Pageable pageable);

    @Query("select count (p) from PickMeEntity p")
    int countPickMe();
}
