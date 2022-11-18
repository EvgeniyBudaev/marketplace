package com.marketplace.backend.service;

import com.marketplace.backend.dao.MirrorAttributeDao;
import com.marketplace.backend.model.MirrorAttribute;
import com.marketplace.backend.repository.MirrorAttributeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MirrorAttributeService implements MirrorAttributeDao {
    @Autowired
    private MirrorAttributeRepository mirrorAttributeRepository;
    @Override
    public List<MirrorAttribute> getAll() {
        return mirrorAttributeRepository.findAll();
    }

    @Override
    public void save(MirrorAttribute obj) {
        mirrorAttributeRepository.save(obj);
    }

    @Override
    public MirrorAttribute getById(long id) {
        MirrorAttribute mirrorAttribute = null;
        Optional<MirrorAttribute> optional = mirrorAttributeRepository.findById(id);
        if (optional.isPresent()) {
            mirrorAttribute = optional.get();
        }
        return mirrorAttribute;
    }

    @Override
    public void delete(long id) {
        mirrorAttributeRepository.deleteById(id);
    }
}
