package com.marketplace.backend.dao;

import java.util.List;

public interface GeneralDao<T> {
    List<T> getAll();

    void save(T obj);

    T findById(Long id);

    void delete(Long id);
}
