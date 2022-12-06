package com.marketplace.backend.dao;

public interface GeneralDao<T> {

    void save(T obj);

    void delete(String alias);
}
