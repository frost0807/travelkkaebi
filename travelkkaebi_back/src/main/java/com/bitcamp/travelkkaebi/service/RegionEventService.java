package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.RegionEventDTO;
import com.bitcamp.travelkkaebi.entity.RegionalEventEntity;
import com.bitcamp.travelkkaebi.repository.RegionEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RegionEventService {

    private final RegionEventRepository regionEventRepository;


    public Page<RegionEventDTO> findEventList(Pageable pageable) {
        List<RegionalEventEntity> likeCount = regionEventRepository.findAll(Sort.by(Sort.Direction.DESC, "likeCount"));
    }
}
