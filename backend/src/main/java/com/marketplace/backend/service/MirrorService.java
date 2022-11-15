package com.marketplace.backend.service;

import com.marketplace.backend.entity.Mirror;

import java.util.List;

public interface MirrorService {
    List<Mirror> getAllMirrors();

    void saveMirror(Mirror mirror);

    Mirror getMirror(long id);

    void deleteMirror(long id);
}
