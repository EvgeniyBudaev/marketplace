package com.marketplace.order.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class GetAllOrderByPageRequestDto {
    private Integer currentPage;
    private Integer pageSize;
    private List<String> orderStatuses;
}
