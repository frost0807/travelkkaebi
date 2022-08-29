package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.RegionEventDTO;
import com.bitcamp.travelkkaebi.service.RegionEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("travelkkaebi/region/event/")
@RequiredArgsConstructor
public class RegionEventController {

    private final RegionEventService regionEventService;

    @GetMapping("main")
    public ResponseEntity<List<RegionEventDTO>> regionEventShowList(@PageableDefault(size = 6) Pageable pageable) {
        return ResponseEntity.ok().body(regionEventService.findEventList(pageable).getContent());
    }
}
