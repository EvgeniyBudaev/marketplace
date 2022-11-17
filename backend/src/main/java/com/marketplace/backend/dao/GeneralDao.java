package com.marketplace.backend.dao;

import java.util.List;

public interface GeneralDao<T> {
    List<T> getAll();

    void save(T obj);

    T getById(long id);

    void delete(long id);
}
