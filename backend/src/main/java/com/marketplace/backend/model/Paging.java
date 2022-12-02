package com.marketplace.backend.model;

import lombok.Data;

import java.util.List;
@Data
public class Paging <T>{
    private Integer pageSize;
    private Integer currentPage;
    private List<T> content;
}
