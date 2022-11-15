package com.marketplace.backend.service;

import com.marketplace.backend.entity.Mirror;
import com.marketplace.backend.repository.MirrorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MirrorServiceImpl implements MirrorService {
    @Autowired
    private MirrorRepository mirrorRepository;

    @Override
    public List<Mirror> getAllMirrors() {
        return mirrorRepository.findAll();
    }

    @Override
    public void saveMirror(Mirror mirror) {
        mirrorRepository.save(mirror);
    }

    @Override
    public Mirror getMirror(long id) {
        Mirror mirror = null;
        Optional<Mirror> optional = mirrorRepository.findById(id);
        if (optional.isPresent()) {
            mirror = optional.get();
        }
        return mirror;
    }

    @Override
    public void deleteMirror(long id) {
        mirrorRepository.deleteById(id);
    }
}
