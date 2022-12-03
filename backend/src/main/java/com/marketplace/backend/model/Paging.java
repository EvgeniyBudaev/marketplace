package com.marketplace.backend.model;

import lombok.Data;

import java.util.List;

@Data
public class Paging <T>{
    private Integer pageSize;
    private Long currentPage;
    private List<T> content;
    private Boolean hasNext=true;
    private Boolean hasPrevious=true;
    private Long countOfResult;
    private Long countOfPage;

    public Paging(Long countOfResult,Integer pageSize, Long currentPage){
        this.pageSize = pageSize;
        this.countOfResult = countOfResult;
        this.countOfPage = countOfResult/pageSize;
        this.currentPage= currentPage;
        /*Если существует остаток то страниц на одну больше*/
        if (countOfResult%pageSize>0){
            this.countOfPage= countOfPage+1;
        }
        if(this.currentPage.equals(countOfPage)){
            hasNext = false;
        }
        if(this.currentPage==1L){
            hasPrevious=false;
        }
        if(countOfPage==0L){
            hasPrevious=false;
            hasNext=false;
        }
    }
}
